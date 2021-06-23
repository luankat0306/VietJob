import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavBar from "../Reuse/NavBar";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            validated: false,
            error: "",
            success: "",
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }
    onChangeUsername(e) {
        this.setState({ username: e.target.value });
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    login(e) {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        AuthService.login(username, password).then(
            (res) => {
                if (res.data.accessToken) {
                    localStorage.removeItem("applicant");
                    localStorage.setItem("user", JSON.stringify(res.data));

                    if (res.data.roles.includes("ROLE_USER")) {
                        this.props.history.push(
                            "/nguoi-tim-viec/quan-ly-tai-khoan"
                        );
                    } else if (res.data.roles.includes("ROLE_ENTERPRISE")) {
                        this.props.history.push(
                            "/nha-tuyen-dung/quan-ly-tai-khoan"
                        );
                    }
                }
                return res.data;
            },
            (error) => {
                this.setState({
                    error:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                });
            }
        );
    }

    render() {
        const error = this.state.error;
        return (
            <div className="bg-login">
                <NavBar background="rgba(0, 0, 0, 0.225)" />
                <div className="login">
                    <div className="login__content">
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className="login__form">
                                    <span className="login__title">
                                        Đăng Nhập
                                    </span>{" "}
                                    <br />
                                    <Form onSubmit={this.login}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>
                                                {" "}
                                                Username :{" "}
                                            </Form.Label>
                                            <Form.Control
                                                id="username"
                                                name="username"
                                                onChange={this.onChangeUsername}
                                                type="text"
                                                placeholder=""
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Mật Khẩu : </Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={this.onChangePassword}
                                                placeholder=""
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicCheckbox">
                                            <NavLink
                                                style={{
                                                    textDecoration: "none",
                                                    display: "block",
                                                    textAlign: "center",
                                                }}
                                                to="/">
                                                Quên Mật Khẩu?
                                            </NavLink>
                                        </Form.Group>
                                        {error !== "" && (
                                            <Alert variant="danger">
                                                {error}
                                            </Alert>
                                        )}
                                        <Button variant="info" type="submit">
                                            Đăng Nhập
                                        </Button>
                                        <Button
                                            style={{ float: "right" }}
                                            variant="success">
                                            <NavLink
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#fff",
                                                }}
                                                to="/dang-ky/nguoi-tim-viec">
                                                Đăng Ký Tài Khoản
                                            </NavLink>
                                        </Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
