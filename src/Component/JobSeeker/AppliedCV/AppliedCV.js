import React, { Component } from "react";
import { Button, Card, CardColumns, Col, Row } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import CandidateService from "../../../services/CandidateService";
import ResumeService from "../../../services/ResumeService";
import JobCard from "../../Reuse/JobCard";
import JobSeekerIndex from "../JobSeekerIndex";

export default class AppliedCV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobApplieds: [],
      resume: {},
      error: "",
      success: "",
    };
    this.deleteCandidate = this.deleteCandidate.bind(this);
  }
  componentDidMount() {
    const applicantId = localStorage.getItem("id");
    ResumeService.getResumeByApplicant(applicantId).then((res) => {
      this.setState({ resume: res.data });

      CandidateService.getCandidateByResume(res.data.id).then((res) =>
        this.setState({ jobApplieds: res.data })
      );
    });
  }

  deleteCandidate(id) {
    CandidateService.deleteCandidate(id).then(() => {
      this.setState({ success: "Xóa thành công" });

      window.location.reload();
    });
  }

  render() {
    const jobApplieds = this.state.jobApplieds;
    return (
      <div>
        <JobSeekerIndex />
        <div className="page-content">
          <div className="box">
            <CardColumns style={{ columnCount: "2" }}>
              {jobApplieds.map((jobApplied) => (
                <Card className="content">
                  <JobCard job={jobApplied.job} />
                  <Card.Footer>
                    <Row>
                      <Col>
                        <p
                          style={{
                            color: "green",
                            marginBottom: "0px",
                          }}
                        >
                          {jobApplied.status === "Đã Chấp Thuận" && (
                            <FcCheckmark />
                          )}{" "}
                          {jobApplied.status}
                        </p>
                      </Col>

                      <Col
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => this.deleteCandidate(jobApplied.id)}
                        >
                          Hủy Nộp Hồ Sơ
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              ))}
            </CardColumns>
          </div>
        </div>
      </div>
    );
  }
}
