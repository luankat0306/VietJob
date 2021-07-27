import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import AdminService from "../../../services/AdminService";
import FileService from "../../../services/FileService";
import LeftSidebar from "../LeftSidebar";
import { ChangeAvatar } from "./ChangeAvatar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      fullname: "",
      phone: "",
      username: "",
      password: "",
      image: "",

      alert: false,
      message: "",
    };
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
  }

  componentDidMount() {
    AdminService.getAdmin(1).then((res) => {
      let admin = res.data;
      this.setState({
        id: admin.id,
        email: admin.email,
        username: admin.username,
        phone: admin.phone,
        fullname: admin.fullname,
        image: admin.image,
        password: admin.password,
      });
    });
  }

  changeEmailHandler(e) {
    this.setState({ email: e.target.value });
  }

  changeUsernameHandler(e) {
    this.setState({ username: e.target.value });
  }

  changePhoneHandler(e) {
    this.setState({ phone: e.target.value });
  }

  changeFullNameHandler(e) {
    this.setState({ fullname: e.target.value });
  }

  updateAdmin(e) {
    e.preventDefault();

    let admin = {
      username: this.state.username,
      email: this.state.email,
      fullname: this.state.fullname,
      phone: this.state.phone,
      password: this.state.password,
      image: this.state.image,
    };

    AdminService.updateAdmin(1, admin).then(() => {
      this.setState({
        alert: true,
        message: "Thay đổi thông tin thành công",
      });
    });
  }
  alertUpdate() {
    if (this.state.alert === true)
      return (
        <Alert variant="success" onClose={this.onClose} dismissible>
          {this.state.message}
        </Alert>
      );
  }
  onClose = () => {
    this.setState({ alert: false });
  };
  render() {
    return (
      <div className="admin-wrapper">
        <LeftSidebar />
        <div className="content">
          <br />
          <h5
            style={{
              borderLeft: "5px solid #242849",
              paddingLeft: "10px",
              color: "#242849",
            }}
          >
            <i>
              <FontAwesomeIcon icon={faEdit} />
            </i>{" "}
            THÔNG TIN CÁ NHÂN
          </h5>
          <br />
          {this.alertUpdate()}
          <div className="thong-tin">
            <div
              className="img-Admin"
              style={{
                textAlign: "center",
              }}
            >
              <img
                className="avatar"
                style={{
                  padding: "10px",
                  width: "200px",
                  height: "200px",
                  background: "white",
                  borderRadius: "10px",
                }}
                src={FileService.downloadFile(this.state.image)}
                alt="avatar"
              />
              <br />
              <ChangeAvatar id={this.state.id} />
            </div>
            <Form style={{ width: "90%" }}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    id="email"
                    name="email"
                    onChange={this.changeEmailHandler}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.changeUsernameHandler}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control
                  placeholder="VD: Nguyễn Văn Thành"
                  value={this.state.fullname}
                  onChange={this.changeFullNameHandler}
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="VD: 09033345859"
                  value={this.state.phone}
                  onChange={this.changePhoneHandler}
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: "#242849",
                  color: "#ffd98d",
                }}
                variant="primary"
                type="submit"
                onClick={this.updateAdmin}
              >
                Lưu
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
