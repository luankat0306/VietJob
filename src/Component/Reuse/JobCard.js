import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { FcHome, FcMoneyTransfer } from "react-icons/fc";
import { Link } from "react-router-dom";
import FileService from "../../services/FileService";
export default class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
      resume: {},
    };
    // this.sendCV = this.sendCV.bind(this);
    // this.saveCV = this.saveCV.bind(this);
  }

  // sendCV(jobId) {
  //   const cv = {
  //     resume: { id: this.state.resume.id },
  //     job: { id: jobId },
  //   };
  //   CandidateService.sendCV(cv)
  //     .then(
  //       () => this.setState({ success: "Nộp hồ sơ thành công" }),
  //       (error) => {
  //         this.setState({
  //           error:
  //             (error.response && error.response.data && error.response.data.message) ||
  //             error.message ||
  //             error.toString(),
  //         });
  //       }
  //     )
  //     .catch(() => this.setState({ error: "Vui lòng tạo hồ sơ trước" }));
  // }

  // saveCV(jobId) {
  //   const applicantId = localStorage.getItem("id");
  //   const cv = {
  //     applicant: { id: applicantId },
  //     job: { id: jobId },
  //   };
  //   JobSavedService.createJobSaved(cv).then(() => this.setState({ success: "Lưu thành công" }));
  // }

  render() {
    const { job } = this.props;
    return (
      <Card className="content">
        <CardMedia
          style={{
            padding: 20,
            backgroundSize: "contain",
            backgroundOrigin: "content-box",
            width: 150,
          }}
          image={FileService.downloadFile(job.enterprise.user.image)}
        />
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardContent style={{ flex: "1 0 auto", alignItems: "stretch" }}>
            <Typography style={{ minHeight: 50 }}>
              <Link
                className="job-title"
                to={`/nguoi-tim-viec/chi-tiet-cong-viec/${job.id}`}
              >
                {job.title}
              </Link>
            </Typography>
            <Typography>
              <Link
                className="job-enterpriceName"
                to={`/nguoi-tim-viec/chi-tiet-cong-ty/${job.enterprise.id}`}
              >
                {job.enterprise.name}
              </Link>
            </Typography>
            <Row style={{ textAlign: "justify" }}>
              <Col>
                <p style={{ margin: 0 }}>
                  <span style={{ paddingRight: 5 }}>
                    <FcMoneyTransfer />
                  </span>
                  {job.wage}
                </p>
              </Col>
              <Col>
                <p style={{ margin: 0 }}>
                  <span style={{ paddingRight: 5 }}>
                    <FcHome />
                  </span>
                  {job.province}
                </p>
              </Col>
            </Row>
          </CardContent>
        </div>

        {/* {this.state.auth && (
          <CardActions style={{ justifyContent: "center" }}>
            <Button variant="outline-success" size="sm" onClick={() => this.sendCV(job.id)}>
              Nộp Hồ Sơ
            </Button>

            <Button variant="outline-primary" size="sm" onClick={() => this.saveCV(job.id)}>
              Lưu Công Việc
            </Button>
          </CardActions>
        )} */}
      </Card>
    );
  }
}
