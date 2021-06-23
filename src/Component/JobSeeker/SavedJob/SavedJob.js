import React, { Component } from "react";
import JobSeekerIndex from "../JobSeekerIndex";
import { NavLink } from "react-router-dom";
import { Row, Col, Card, Button, CardColumns, Alert } from "react-bootstrap";
import JobSavedService from "../../../services/JobSavedService";
import FileService from "../../../services/FileService";

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
                                    <Card.Img
                                        variant="top"
                                        src={FileService.downloadFile(
                                            jobSaved.job.enterprise.user.image
                                        )}
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            <NavLink
                                                to={`/nguoi-tim-viec/chi-tiet-cong-viec/${jobSaved.job.id}`}>
                                                <h1>{jobSaved.job.title}</h1>
                                            </NavLink>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <NavLink
                                                to={`/nguoi-tim-viec/chi-tiet-cong-ty/${jobSaved.job.enterprise.id}`}>
                                                <h2>
                                                    {
                                                        jobSaved.job.enterprise
                                                            .name
                                                    }
                                                </h2>
                                            </NavLink>
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <h3>Ngành Nghề</h3>
                                                    <p>
                                                        {
                                                            jobSaved.job.career
                                                                .name
                                                        }
                                                    </p>
                                                </Col>
                                                <Col>
                                                    <h3>Tỉnh Thành</h3>
                                                    <p>
                                                        {jobSaved.job.province}
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h3>Mức Lương</h3>
                                                    <p>{jobSaved.job.wage}</p>
                                                </Col>
                                                <Col>
                                                    <h3>Hạn Nộp</h3>
                                                    <p>
                                                        {new Date(
                                                            jobSaved.job.endDate
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        this.deleteJobSaved(
                                                            jobSaved.id
                                                        )
                                                    }>
                                                    Xóa Công Việc
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            ))}
                        </CardColumns>
                    </div>
                    {success !== "" && (
                        <Alert variant="success">{success}</Alert>
                    )}
                </div>
            </div>
        );
    }
}
