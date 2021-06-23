import React, { Component } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { FcAbout, FcInfo } from "react-icons/fc";
import AuthService from "../../../services/AuthService";
import CandidateService from "../../../services/CandidateService";
import FileService from "../../../services/FileService";
import JobSavedService from "../../../services/JobSavedService";
import JobService from "../../../services/JobService";
import ResumeService from "../../../services/ResumeService";
import JobSeekerIndex from "../JobSeekerIndex";
import { Card, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {
        id: "",
        title: "",
        vacancy: "",
        amount: "",
        description: "",
        province: "",
        endDate: "",
        wage: "",
        startDate: "",
        career: {
          id: "",
          name: "",
        },
        enterprise: {
          id: "",
          contact: "",
          address: "",
          website: "",
          description: "",
          name: "",
          user: {
            id: "",
            fullname: "",
            username: "",
            phone: "",
            email: "",
            image: "avatar.png",
            roles: [
              {
                id: "",
                name: "",
              },
            ],
          },
        },
      },

      auth: false,
      error: "",
      success: "",
      resume: {},
      jobs: [],
    };
    this.sendCV = this.sendCV.bind(this);
    this.saveCV = this.saveCV.bind(this);
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const applicantId = localStorage.getItem("id");

    JobService.getJob(params.id)
      .then((res) => {
        this.setState({ job: res.data });
        JobService.getJobsByCareer(res.data.career.id).then((res) => this.setState({ jobs: res.data }));
      })
      .then(() => {
        try {
          const token = AuthService.getCurrentUser();
          if (token.roles.includes("ROLE_USER")) {
            this.setState({ auth: true });
          }
        } catch (error) {}
      });

    ResumeService.getResumeByApplicant(applicantId).then((res) => {
      this.setState({ resume: res.data });
    });
  }

  sendCV(jobId) {
    const cv = {
      resume: { id: this.state.resume.id },
      job: { id: jobId },
    };
    CandidateService.sendCV(cv)
      .then(
        () => this.setState({ success: "Nộp hồ sơ thành công" }),
        (error) => {
          this.setState({
            error:
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString(),
          });
        }
      )
      .catch((error) => this.setState({ error: "Vui lòng tạo hồ sơ trước" }));
  }

  saveCV(jobId) {
    const applicantId = localStorage.getItem("id");
    const cv = {
      applicant: { id: applicantId },
      job: { id: jobId },
    };
    JobSavedService.createJobSaved(cv).then(() => this.setState({ success: "Lưu thành công" }));
  }

  render() {
    const { job, error, success, jobs } = this.state;
    return (
      <div>
        <JobSeekerIndex />
        <div className="page-content">
          {success !== "" && (
            <Alert style={{ margin: "5px 70px" }} variant="success">
              {success}
            </Alert>
          )}
          {error !== "" && (
            <Alert style={{ margin: "5px 70px" }} variant="danger">
              {error}
            </Alert>
          )}
          <div className="box">
            <Container className="content-jobdetail">
              {this.state.auth && (
                <Row>
                  <Col style={{ textAlign: "right" }}>
                    <Button variant="success" onClick={() => this.sendCV(job.id)}>
                      Nộp Hồ Sơ
                    </Button>
                    <Button variant="primary" onClick={() => this.saveCV(job.id)}>
                      Lưu Công Việc
                    </Button>
                  </Col>
                </Row>
              )}
              <Row>
                <Col className="jobdetail-col">
                  <div className="jobdetail-img">
                    <img src={FileService.downloadFile(job.enterprise.user.image)} alt=""></img>
                  </div>

                  <div className="jobdetail-header">
                    <h1>{job.title}</h1>
                    <hr />
                    <h2>{job.enterprise.name}</h2>
                  </div>
                </Col>
              </Row>

              <Row className="jobdetail-info">
                <Col>
                  <h5>Ngành Nghề</h5>
                  <p>{job.career.name}</p>
                </Col>
                <Col>
                  <h5>Tỉnh Thành</h5>
                  <p>{job.province}</p>
                </Col>
                <Col>
                  <h5>Vị Trí Tuyển Dụng</h5>
                  <p>{job.vacancy}</p>
                </Col>
                <Col>
                  <h5>Số Lượng</h5>
                  <p>{job.amount}</p>
                </Col>
                <Col>
                  <h5>Mức Lương</h5>
                  <p>{job.wage}</p>
                </Col>
                <Col>
                  <h5>Hạn Nộp</h5>
                  <p>{new Date(job.endDate).toLocaleDateString()}</p>
                </Col>
              </Row>
              <Row className="jobdetail-info">
                <Col>
                  <h4>
                    <span>
                      <FcInfo />
                    </span>
                    Mô Tả Công Việc
                  </h4>
                  <div className="job-describe">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: job.description,
                      }}
                    ></p>
                  </div>
                </Col>
              </Row>

              <Row className="jobdetail-info">
                <Col>
                  <h4>
                    <span>
                      <FcAbout />
                    </span>
                    Địa Điểm Làm Việc
                  </h4>
                  <div className="job-describe">
                    <Col>
                      <p>{job.address}</p>
                    </Col>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <br />
          <h2 style={{ fontWeight: 300, color: "#484848", textAlign: "center" }}>Việc Làm Liên Quan</h2>
          <Container disableGutters maxWidth="lg">
            <div className="company-box">
              <Grid container spacing={5}>
                {jobs &&
                  jobs.map((job) => (
                    <Grid item xs={6}>
                      <div style={{ borderBottom: "1px solid #E5E5E5" }}>
                        <Grid container justify="center" alignItems="center">
                          <Grid item xs={3}>
                            <img
                              style={{ height: 100, width: 100 }}
                              src={FileService.downloadFile(job.enterprise.user.image)}
                              alt=""
                            />
                          </Grid>
                          <Grid item xs={8} style={{ textAlign: "start" }}>
                            <Link
                              to={`/nguoi-tim-viec/chi-tiet-cong-viec/${job.id}`}
                              style={{ fontSize: 17, fontWeight: 700, marginBottom: 0 }}
                            >
                              {job.title}
                            </Link>
                            <p style={{ fontSize: 14 }}>{job.enterprise.name}</p>
                          </Grid>
                          <Grid item xs={1}>
                            <div
                              style={{
                                width: "fit-content",
                                padding: 3,
                                backgroundColor: "#FF5661",
                                color: "white",
                                borderRadius: 3,
                              }}
                            >
                              HOT
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            </div>
          </Container>

          <br />
        </div>
      </div>
    );
  }
}
