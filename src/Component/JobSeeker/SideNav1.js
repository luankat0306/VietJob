import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FcSearch, FcBusinessman, FcOk, FcFilingCabinet } from "react-icons/fc";
import AuthService from "../../services/AuthService";
import ApplicantService from "../../services/ApplicantService";
import FileService from "../../services/FileService";

export default class SideNav1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicant: { user: { fullname: "" } },
      error: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    try {
      const user = AuthService.getCurrentUser();
      if (user.roles.includes("ROLE_USER")) {
        ApplicantService.getApplicantByUserId(user.id).then((res) => {
          this.setState({ applicant: res.data });
          localStorage.setItem("id", JSON.stringify(this.state.applicant.id));
        });
      } else {
        this.setState({ error: true });
      }
    } catch (error) {
      this.setState({ error: true });
    }
  }
  logout() {
    AuthService.logout();
  }
  render() {
    const { error, applicant } = this.state;
    return (
      <>
        <ul className="sideNav">
          <li>
            <img
              src={
                error === false
                  ? FileService.downloadFile(applicant.user.image)
                  : "../../../img/jobseeker_avt/default.png"
              }
              alt=""
            ></img>
            <h5>{error === false ? applicant.user.fullname : ""} </h5>
          </li>
          <hr />
          <div style={{ textAlign: "center" }}>
            <li>
              <NavLink to="/nguoi-tim-viec/tim-kiem-cong-viec">
                <span>
                  <FcSearch />
                </span>
                Tìm Kiếm Việc Làm
              </NavLink>
            </li>
            <li>
              <NavLink to="/nguoi-tim-viec/quan-ly-tai-khoan">
                <span>
                  <FcBusinessman />
                </span>
                Quản lý tài khoản
              </NavLink>
            </li>
            <li>
              <NavLink to="/nguoi-tim-viec/ho-so-da-nop">
                <span>
                  <FcOk />
                </span>
                Hồ Sơ Đã Nộp
              </NavLink>
            </li>
            <li>
              <NavLink to="/nguoi-tim-viec/cong-viec-da-luu">
                <span>
                  <FcFilingCabinet />
                </span>
                Công Việc Đã Lưu
              </NavLink>
            </li>
          </div>
          <hr />
          <div className="logout">
            <Button variant="danger" onClick={this.logout}>
              <NavLink to="/dang-nhap">Đăng Xuất</NavLink>
            </Button>
          </div>
        </ul>
      </>
    );
  }
}
