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
            this.setState({ accept: "Chấp Thuận Thành Công" })
        );
    }
    reject() {
        CandidateService.reject(this.state.candidate.id).then(() =>
            this.setState({ reject: "Từ Chối Thành Công" })
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
                                        <h4>Trình Độ</h4>
                                        <p>{candidate.resume.education}</p>
                                    </div>
                                    <div className="data">
                                        <h4>Kinh Nghiệm</h4>
                                        <p>{candidate.resume.experience}</p>
                                    </div>
                                    <div className="data">
                                        <h4>Hình Thức</h4>
                                        <p>{candidate.resume.jobType}</p>
                                    </div>
                                    <div className="data">
                                        <h4>Ngoại Ngữ</h4>
                                        <p>
                                            {candidate.resume.foreignLanguage}
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>Mức Lương</h4>
                                        <p>{candidate.resume.wage}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="personalinfo">
                                <h3>THÔNG TIN ỨNG VIÊN</h3>

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
                                        <h4>SĐT</h4>
                                        <p>
                                            {
                                                candidate.resume.applicant.user
                                                    .phone
                                            }
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>Giới Tính</h4>
                                        <p>
                                            {candidate.resume.applicant.gender}
                                        </p>
                                    </div>

                                    <div className="data">
                                        <h4>Ngày Sinh</h4>
                                        <p>
                                            {new Date(
                                                candidate.resume.applicant.birthday
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>Tỉnh Thành</h4>
                                        <p>
                                            {
                                                candidate.resume.applicant
                                                    .province
                                            }
                                        </p>
                                    </div>
                                    <div className="data">
                                        <h4>Địa Chỉ</h4>
                                        <p>
                                            {candidate.resume.applicant.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {candidate.status !== "Đã Chấp Thuận" && (
                                    <Button
                                        id="approve-btn"
                                        variant="success"
                                        onClick={this.accept}>
                                        Tiếp Nhận
                                    </Button>
                                )}

                                <Button
                                    id="decline-btn"
                                    variant="danger"
                                    onClick={this.reject}>
                                    Từ Chối
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
