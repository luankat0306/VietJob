import { Card, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { Alert, Button, Col, NavLink, Row } from "react-bootstrap";
import { FcAbout, FcInfo } from "react-icons/fc";
import AuthService from "../../../services/AuthService";
import CandidateService from "../../../services/CandidateService";
import FileService from "../../../services/FileService";
import JobSavedService from "../../../services/JobSavedService";
import JobService from "../../../services/JobService";
import ResumeService from "../../../services/ResumeService";
import JobSeekerIndex from "../JobSeekerIndex";

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
    const applicantId = localStorage.getItem("id");
    this.fetchData();
    ResumeService.getResumeByApplicant(applicantId).then((res) => {
      this.setState({ resume: res.data });
    });
  }

  fetchData() {
    const {
      match: { params },
    } = this.props;

    JobService.getJob(params.id)
      .then((res) => {
        this.setState({ job: res.data });
        JobService.getJobsByCareer(params.id, res.data.career.id).then((res) =>
          this.setState({ jobs: res.data })
        );
      })
      .then(() => {
        try {
          const token = AuthService.getCurrentUser();
          if (token.roles.includes("ROLE_USER")) {
            this.setState({ auth: true });
          }
        } catch (error) {}
      });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();
    }
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
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
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
    JobSavedService.createJobSaved(cv).then(() =>
      this.setState({ success: "Lưu thành công" })
    );
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
            <Card
              style={{
                padding: 20,
                borderRadius: 8,
              }}
              className="content-jobdetail"
            >
              {this.state.auth && (
                <Row>
                  <Col style={{ textAlign: "right" }}>
                    <Button
                      variant="success"
                      onClick={() => this.sendCV(job.id)}
                    >
                      Nộp Hồ Sơ
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => this.saveCV(job.id)}
                    >
                      Lưu Công Việc
                    </Button>
                  </Col>
                </Row>
              )}
              <Row>
                <Col className="jobdetail-col">
                  <div className="jobdetail-img">
                    <img
                      src={FileService.downloadFile(job.enterprise.user.image)}
                      alt=""
                    />
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
                    <Col>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: job.description,
                        }}
                      />
                    </Col>
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
            </Card>

            <br />
            {jobs.length > 0 && (
              <React.Fragment>
                <h2
                  style={{
                    fontWeight: 700,
                    color: "#484848",
                    textAlign: "center",
                  }}
                >
                  Việc Làm Liên Quan
                </h2>
                <Card
                  style={{
                    padding: 20,
                    borderRadius: 8,
                  }}
                  className="content-jobdetail"
                >
                  <div className="company-box">
                    <Grid container spacing={5}>
                      {jobs.map((job) => (
                        <Grid item xs={6}>
                          <div style={{ borderBottom: "1px solid #E5E5E5" }}>
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                            >
                              <Grid item xs={3}>
                                <img
                                  style={{
                                    height: 100,
                                    width: 100,
                                    objectFit: "contain",
                                  }}
                                  src={FileService.downloadFile(
                                    job.enterprise.user.image
                                  )}
                                  alt=""
                                />
                              </Grid>
                              <Grid item xs={8} style={{ textAlign: "start" }}>
                                <p
                                  className="job-title"
                                  style={{
                                    fontSize: 17,
                                    fontWeight: 700,
                                    marginBottom: 0,
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    this.props.history.push(
                                      `/nguoi-tim-viec/chi-tiet-cong-viec/${job.id}`
                                    )
                                  }
                                >
                                  {job.title}
                                </p>
                                <p style={{ fontSize: 14 }}>
                                  {job.enterprise.name}
                                </p>
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
                </Card>
              </React.Fragment>
            )}
          </div>
          <br />
          <div className="footer">
            <Row>
              <Col>
                <h6>VietJobs</h6>
                <NavLink>Liên Hệ</NavLink>
                <NavLink>Hỏi Đáp</NavLink>
                <NavLink>Thỏa Thuận Sử Dụng</NavLink>
                <NavLink>Quy Định Bảo Mật</NavLink>
              </Col>
              <Col>
                <h6>Việc Làm Theo Tỉnh Thành</h6>
                <NavLink>Hồ Chí Minh</NavLink>
                <NavLink>Hà Nội</NavLink>
                <NavLink>Đà Nẵng</NavLink>
              </Col>
              <Col>
                <h6>Việc Làm Theo Ngành Nghề</h6>
                <NavLink>Kế Toán</NavLink>
                <NavLink>IT-Phần Mềm</NavLink>
                <NavLink>Giáo Dục-Đào Tạo</NavLink>
                <NavLink>Ngân Hàng</NavLink>
              </Col>
              <Col>
                <h6>Hỗ Trợ</h6>
                <p>Võ Trí Luân</p>
                <p>Trần Vũ Luân</p>
                <p>Trần Phúc Hậu</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
