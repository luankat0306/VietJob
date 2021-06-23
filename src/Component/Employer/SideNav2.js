import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FcDepartment, FcApproval, FcBriefcase, FcFeedback } from "react-icons/fc";
import AuthService from "../../services/AuthService";
import EnterpriseService from "../../services/EnterpriseService";
import FileService from "../../services/FileService";

export default class SideNav2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

          image: "",
          roles: [
            {
              id: 2,
              name: "ROLE_ENTERPRISE",
            },
          ],
        },
      },
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    try {
      const idUser = AuthService.getCurrentUser().id;

      EnterpriseService.getByUser(idUser).then((res) => {
        this.setState({ enterprise: res.data });

        localStorage.setItem("id", this.state.enterprise.id);
      });
    } catch (error) {}
  }
  logout() {
    AuthService.logout();
  }
  render() {
    const enterprise = this.state.enterprise;
    return (
      <>
        <ul className="sideNav">
          <li>
            <img src={FileService.downloadFile(enterprise.user.image)} alt=""></img>
          </li>
          <hr />
          <div style={{ textAlign: "center" }}>
            <li>
              <NavLink to="/nha-tuyen-dung/quan-ly-tai-khoan">
                <span>
                  <FcDepartment />
                </span>
                Quản lý tài khoản
              </NavLink>
            </li>
            <li>
              <NavLink to="/nha-tuyen-dung/dang-tin">
                <span>
                  <FcBriefcase />
                </span>
                Đăng Tin Việc Làm
              </NavLink>
            </li>
            <li>
              <NavLink to="/nha-tuyen-dung/kiem-duyet-ho-so">
                <span>
                  <FcFeedback />
                </span>
                Kiểm Duyệt Hồ Sơ
              </NavLink>
            </li>
            <li>
              <NavLink to="/nha-tuyen-dung/ho-so-da-nhan">
                <span>
                  <FcApproval />
                </span>
                Hồ Sơ Đã Nhận
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
