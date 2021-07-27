import React, { Component } from "react";
import JobSeekerIndex from "../JobSeekerIndex";
import { NavLink } from "react-router-dom";
import { Row, Col, Card, Button, CardColumns, Alert } from "react-bootstrap";
import JobSavedService from "../../../services/JobSavedService";
import FileService from "../../../services/FileService";
import JobCard from "../../Reuse/JobCard";

export default class SavedJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSaveds: [],
      error: "",
      success: "",
    };
    this.deleteJobSaved = this.deleteJobSaved.bind(this);
  }
  componentDidMount() {
    const applicantId = localStorage.getItem("id");
    JobSavedService.getJobSavedByApplicant(applicantId).then((res) =>
      this.setState({ jobSaveds: res.data })
    );
  }

  deleteJobSaved(idJob) {
    JobSavedService.deleteJobSaved(idJob).then(() => {
      this.setState({ success: "Xóa thành công" });

      window.location.reload();
    });
  }
  render() {
    const success = this.state.success;
    const jobSaveds = this.state.jobSaveds;
    return (
      <div>
        <JobSeekerIndex />
        <div className="page-content">
          <div className="box">
            <CardColumns style={{ columnCount: "2" }}>
              {jobSaveds.map((jobSaved) => (
                <Card className="content">
                  <JobCard job={jobSaved.job} />
                  <Card.Footer>
                    <Row>
                      <Col
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => this.deleteJobSaved(jobSaved.id)}
                        >
                          Xóa Công Việc
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              ))}
            </CardColumns>
          </div>
          {success !== "" && <Alert variant="success">{success}</Alert>}
        </div>
      </div>
    );
  }
}
