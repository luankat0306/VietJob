import {
  faBriefcase,
  faChartLine,
  faHeadset,
  faLandmark,
  faPenNib,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AdminService from "../../services/AdminService";
import AuthService from "../../services/AuthService";
import FileService from "../../services/FileService";
export default class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
    };
  }
  logout() {
    AuthService.logout();
  }
  componentDidMount() {
    const id = AuthService.getCurrentUser().id;
    AdminService.getAdmin(id).then((res) => this.setState({ admin: res.data }));
  }
  render() {
    return (
      <div className="left-sidebar">
        <div className="admin">
          <div className="img-Admin">
            <img
              className="avatar"
              src={FileService.downloadFile(this.state.admin.image)}
              alt="avatar"
            />
            <a href="/login" onClick={this.logout}>
              Logout
            </a>
          </div>

          <h5 className="logo">
            Admin
            <br />
            VietJobs
          </h5>
        </div>
        <hr
          className="hr"
          style={{
            backgroundImage:
              "-webkit-linear-gradient(left, #7a80b4, #ffd98d, #7a80b4)",
          }}
        />
        <ul>
          <li>
            <NavLink className="nav-link" to="/admin/thong-ke">
              <i>
                <FontAwesomeIcon icon={faChartLine} />
              </i>
              Thống kê{" "}
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/thong-tin">
              <i>
                <FontAwesomeIcon icon={faPenNib} />
              </i>
              Thông tin
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/ung-vien">
              <i>
                <FontAwesomeIcon icon={faUserTie} />
              </i>
              ứng viên
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/doanh-nghiep">
              <i>
                <FontAwesomeIcon icon={faLandmark} />
              </i>
              doanh nghiệp
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/nganh-nghe">
              <i>
                <FontAwesomeIcon icon={faBriefcase} />
              </i>
              Ngành nghề
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
