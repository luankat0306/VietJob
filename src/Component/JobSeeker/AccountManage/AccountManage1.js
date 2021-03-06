import React, { Component } from "react";
import JobSeekerIndex from "../JobSeekerIndex";
import { Button } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import {
  ChangeEmail,
  ChangePassword,
  ChangePersonalInfo,
  ChangeCV,
  ChangeSocialNetwork,
  ChangeAvatar,
} from "./Modals";
import ApplicantService from "../../../services/ApplicantService";
import AuthService from "../../../services/AuthService";
import ResumeService from "../../../services/ResumeService";
import FileService from "../../../services/FileService";

export default class AccountManage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicant: {
        id: "",
        birthday: "",
        gender: "",
        address: "",
        province: "",
        fb: "",
        ig: "",
        user: {
          id: "",
          fullname: "",
          username: "",
          phone: "",
          email: "",
          password: "",
          image: "",
          roles: [{ id: 3, name: "ROLE_USER" }],
        },
      },
      resume: {
        id: "",
        desiredVacancy: "",
        education: "",
        experience: "",
        jobType: "",
        foreignLanguage: "",
        wage: "",
        career: {
          id: "",
          name: "",
        },
      },
    };

    this.clickFb = this.clickFb.bind(this);
    this.clickIg = this.clickIg.bind(this);
  }
  componentDidMount() {
    const idUser = AuthService.getCurrentUser().id;
    ApplicantService.getApplicantByUserId(idUser).then((res) => {
      this.setState({ applicant: res.data });

      ResumeService.getResumeByApplicant(this.state.applicant.id).then((res) =>
        this.setState({ resume: res.data })
      );
    });
  }
  clickFb() {
    window.open(this.state.applicant.fb);
  }

  clickIg() {
    window.open(this.state.applicant.ig);
  }

  render() {
    const resume = this.state.resume;
    const applicant = this.state.applicant;
    return (
      <>
        <JobSeekerIndex />
        <div className="page-content">
          <div className="wrapper">
            <div className="left">
              <div className="edit-avatar">
                <img
                  className="avatar"
                  src={FileService.downloadFile(applicant.user.image)}
                  alt=""
                ></img>
                <ChangeAvatar id={applicant.user.id} />
              </div>
              <h4>{applicant.user.fullname}</h4>
              <p>{resume.career.name}</p>
              <hr />
              <div className="social-network">
                <Button
                  variant="primary"
                  onClick={this.clickFb}
                  target="_blank"
                >
                  <FaFacebook />
                </Button>
                <Button variant="danger" onClick={this.clickIg} target="_blank">
                  <FaInstagram />
                </Button>
              </div>
              <ChangeSocialNetwork id={applicant.id} />
            </div>

            <div className="right">
              <div className="info">
                <h3>
                  TH??NG TIN T??I KHO???N{" "}
                  <ChangePassword idUser={applicant.user.id} />
                </h3>
                <div className="info_data">
                  <div className="data">
                    <h4>
                      Email{" "}
                      <ChangeEmail
                        idUser={applicant.user.id}
                        email={applicant.user.email || "Ch??a c??"}
                      />
                    </h4>
                    <p>{applicant.user.email || "Ch??a c??"}</p>
                  </div>
                </div>
              </div>

              <div className="personalinfo">
                <h3>
                  TH??NG TIN C?? NH??N <ChangePersonalInfo id={applicant.id} />
                </h3>

                <div className="personalinfo_data">
                  <div className="data">
                    <h4>H??? V?? T??n</h4>
                    <p>{applicant.user.fullname || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>Ng??y Sinh</h4>
                    <p>
                      {new Date(applicant.birthday).toLocaleDateString() ||
                        "Ch??a c??"}
                    </p>
                  </div>
                  <div className="data">
                    <h4>Gi???i T??nh</h4>
                    <p>{applicant.gender || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>S??T</h4>
                    <p>{applicant.user.phone || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>T???nh Th??nh</h4>
                    <p>{applicant.province || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>?????a Ch???</h4>
                    <p>{applicant.address || "Ch??a c??"}</p>
                  </div>
                </div>
              </div>
              <div className="cv">
                <h3>
                  H??? S?? <ChangeCV id={applicant.id} />
                </h3>
                <div className="cv_data">
                  <div className="data">
                    <h4>V??? Tr??</h4>
                    <p>{resume.desiredVacancy || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>Ng??nh Ngh???</h4>
                    <p>{resume.career.name || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>Tr??nh ?????</h4>
                    <p>{resume.education || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>Kinh Nghi???m</h4>
                    <p>{resume.experience || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>H??nh Th???c</h4>
                    <p>{resume.jobType || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>Ngo???i Ng???</h4>
                    <p>{resume.foreignLanguage || "Ch??a c??"}</p>
                  </div>
                  <div className="data">
                    <h4>M???c L????ng</h4>
                    <p>{resume.wage || "Ch??a c??"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
