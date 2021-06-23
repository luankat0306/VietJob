import React, { Component } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import JobService from "../../../services/JobService";
import EmployerIndex from "../EmployerIndex";
import { JobPosting } from "./Modals";

export default class JobPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  componentDidMount() {
    const idEnterprise = localStorage.getItem("id");
    JobService.getJobsByEnterprise(idEnterprise).then((res) => this.setState({ jobs: res.data }));
  }
  delete(id) {
    JobService.deleteJob(id).then(() => {
      window.location.reload();
    });
  }
  render() {
    const jobs = this.state.jobs;
    return (
      <div>
        <EmployerIndex />
        <div className="page-content">
          <div className="box">
            <Container>
              <Row>
                <Col id="left">
                  <h4>Công Việc Đã Đăng</h4>
                </Col>
                <Col id="right">
                  <JobPosting />
                </Col>
              </Row>
              <hr />
              <ListGroup className="job-post">
                {jobs.map((job) => (
                  <ListGroup.Item variant="info" className="list-item">
                    <Row>
                      <Col id="left">
                        <h5>{job.title}</h5>
                      </Col>
                      <Col id="right">
                        <Button variant="outline-danger" onClick={() => this.delete(job.id)}>
                          Hủy Bỏ
                        </Button>
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col>
                        <h6>Vị Trí Tuyển Dụng</h6>
                        <p>{job.vacancy}</p>
                      </Col>
                      <Col>
                        <h6>Tỉnh Thành</h6>
                        <p>{job.province}</p>
                      </Col>
                      <Col>
                        <h6>Số Lượng</h6>
                        <p>{job.amount}</p>
                      </Col>
                      <Col>
                        <h6>Mức Lương</h6>
                        <p>{job.wage}</p>
                      </Col>
                      <Col>
                        <h6>Hạn Nộp</h6>
                        <p>{new Date(job.endDate).toLocaleDateString()}</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <h6>Mô Tả Công Việc</h6>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: job.description,
                          }}
                        ></p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
