import React, { Component } from "react";
import EmployerIndex from "../EmployerIndex";
import { Button, Alert } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import CandidateService from "../../../services/CandidateService";
import FileService from "../../../services/FileService";

export default class CVDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accept: "",
            reject: "",
            candidate: {
                job: { id: "" },
                resume: {
                    id: "",
                    education: "",
                    experience: "",
                    jobType: "",
                    foreignLanguage: "",
                    wage: "",
                    applicant: {
                        id: "",
                        birthday: "",
                        gender: "",
                        address: "",
                        province: " ",
                        fb: "",
                        ig: "",
                        user: {
                            id: "",
                            fullname: "",
                            username: "",
                            phone: "",
                            email: "",
                            image: "",
                            roles: [],
                        },
                    },
                },
            },
        };
        this.linkFb = this.linkFb.bind(this);
        this.linkIg = this.linkIg.bind(this);
        this.reject = this.reject.bind(this);
        this.accept = this.accept.bind(this);
    }
    componentDidMount() {
        const {
            match: { params },
        } = this.props;

        CandidateService.getCandidate(params.id).then((res) =>
            this.setState({ candidate: res.data })
        );
    }

    linkFb() {
        window.open(this.state.candidate.resume.applicant.fb);
    }

    linkIg() {
        window.open(this.state.candidate.resume.applicant.ig);
    }

    accept() {
        CandidateService.accept(this.state.candidate.id).then(() =>
            this.setState({ accept: "Ch???p Thu???n Th??nh C??ng" })
        );
    }
    reject() {
        CandidateService.reject(this.state.candidate.id).then(() =>
            this.setState({ reject: "T??? Ch???i Th??nh C??ng" })
        );
    }
    render() {
        const { candidate } = this.state;
        return (
            <div>
                <EmployerIndex />
                <div className="page-content">
                    <div className="wrapper">
                        <div className="left">
                            <div className="edit-avatar">
                                <img
                                    className="avatar"
                                    src={FileService.downloadFile(
                                        candidate.resume.applicant.user.image
                                    )}
                                    alt=""></img>
                            </div>
                            <h4>{candidate.resume.applicant.user.fullname}</h4>

                            <hr />
                            <div className="social-network">
                                <Button
                                    variant="primary"
                                    onClick={this.linkFb}
                                    target="_blank">
                                    <FaFacebook />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={this.linkIg}
                                    target="_blank">
                                    <FaInstagram />
                                </Button>
                            </div>
                        </div>

                        <div className="right">
                            <div className="cv">
                                <h3>{candidate.job.title}</h3>
                                <div className="cv_data">
                                    <div className="data">
                                        <h4>Tr??nh ?????</h4>
                                        <p>{candidate.resume.education}</p>
                                    </div>
                                    <div className="data">
                                        <h4>Kinh Nghi???m</h4>
                                        <p>{candidate.resume.experience}</p>
                                    </div>
                                    <div className="data">
                                        <h4>H??nh Th???c</h4>
                                        <p>{candidate.resume.jobType}</p>
                                    </div>
                                    <div className="data">
                                        <h4>Ngo???i Ng???</h4>
                                        <p>
                                            {candidate.resume.foreignLanguage}
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>M???c L????ng</h4>
                                        <p>{candidate.resume.wage}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="personalinfo">
                                <h3>TH??NG TIN ???NG VI??N</h3>

                                <div className="personalinfo_data">
                                    <div className="data">
                                        <h4>Email</h4>
                                        <p>
                                            {
                                                candidate.resume.applicant.user
                                                    .email
                                            }
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>S??T</h4>
                                        <p>
                                            {
                                                candidate.resume.applicant.user
                                                    .phone
                                            }
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>Gi???i T??nh</h4>
                                        <p>
                                            {candidate.resume.applicant.gender}
                                        </p>
                                    </div>

                                    <div className="data">
                                        <h4>Ng??y Sinh</h4>
                                        <p>
                                            {new Date(
                                                candidate.resume.applicant.birthday
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>T???nh Th??nh</h4>
                                        <p>
                                            {
                                                candidate.resume.applicant
                                                    .province
                                            }
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>?????a Ch???</h4>
                                        <p>
                                            {candidate.resume.applicant.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {candidate.status !== "???? Ch???p Thu???n" && (
                                    <Button
                                        id="approve-btn"
                                        variant="success"
                                        onClick={this.accept}>
                                        Ti???p Nh???n
                                    </Button>
                                )}

                                <Button
                                    id="decline-btn"
                                    variant="danger"
                                    onClick={this.reject}>
                                    T??? Ch???i
                                </Button>
                            </div>
                        </div>
                    </div>
                    {this.state.accept !== "" && (
                        <Alert style={{ margin: "0px 20px" }} variant="success">
                            {this.state.accept}
                        </Alert>
                    )}

                    {this.state.reject !== "" && (
                        <Alert style={{ margin: "0px 20px" }} variant="danger">
                            {this.state.reject}
                        </Alert>
                    )}
                </div>
            </div>
        );
    }
}
