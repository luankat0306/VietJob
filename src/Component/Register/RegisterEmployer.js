import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import NavBar from "../Reuse/NavBar";
import EnterpriseService from "../../services/EnterpriseService";
export default class RegisterJobSeeker extends Component {
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
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value });
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    handleSubmit(event) {
        this.setState({
            validated: "",
            success: "",
        });
        const form = event.currentTarget;
        event.preventDefault();
        if (
            form.checkValidity() === false ||
            this.state.password !== this.state.confirmPassword
        ) {
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            let enterprise = {
                user: {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                },
            };

            EnterpriseService.createEnterprise(enterprise).then(
                () => {
                    this.setState({
                        validated: false,
                        success: "Đăng kí thành công",
                    });
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

        this.setState({ validated: true });
    }

    render() {
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        const error = this.state.error;
        const success = this.state.success;
        return (
            <div className="bg-register">
                <NavBar background="rgba(0, 0, 0, 0.225)" />
                <div className="login">
                    <div className="login__content">
                        <Row>
                            <Col
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className="Header__search">
                                <div className="register__form">
                                    <span className="register__title">
                                        Đăng Ký Tài Khoản
                                    </span>

                                    <div className="jobseeker-employer-link">
                                        <NavLink
                                            to="/dang-ky/nguoi-tim-viec"
                                            activeStyle>
                                            Tôi Là Người Tìm Việc
                                        </NavLink>
                                        <NavLink
                                            to="/dang-ky/nha-tuyen-dung"
                                            activeStyle>
                                            Tôi Là Nhà Tuyển Dụng
                                        </NavLink>
                                    </div>
                                    <Form
                                        noValidate
                                        validated={this.state.validated}
                                        onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Username</Form.Label>
                                            <i
                                                class="fas fa-exclamation-triangle msg_fullname"
                                                id="msg_fullname">
                                                &ensp;
                                                <span
                                                    id="msg_name"
                                                    className="msg_name"></span>
                                            </i>
                                            <Form.Control
                                                id="username"
                                                name="username"
                                                onChange={this.onChangeUsername}
                                                type="text"
                                                placeholder="Nhập username"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Email</Form.Label>
                                            <i
                                                class="fas fa-exclamation-triangle msg_fullname"
                                                id="msg_username">
                                                &ensp;
                                                <span
                                                    id="msg_user"
                                                    className="msg_name"></span>
                                            </i>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                onChange={this.onChangeEmail}
                                                type="email"
                                                placeholder="Nhập email (name@example.com)"
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="password"
                                            controlId="formBasicPassword">
                                            <Form.Label>Mật Khẩu</Form.Label>
                                            <i
                                                class="fas fa-exclamation-triangle msg_password"
                                                id="msg_password">
                                                &ensp;
                                                <span
                                                    id="msg_pass"
                                                    className="msg_pass"></span>
                                            </i>

                                            <Form.Control
                                                id="password"
                                                name="password"
                                                onChange={this.onChangePassword}
                                                type="password"
                                                placeholder="Nhập mật khẩu"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="confirm"
                                            controlId="formBasicPassword">
                                            <Form.Label>
                                                Xác Nhận Mật Khẩu
                                            </Form.Label>
                                            <Form.Control
                                                id="confirmpassword"
                                                type="password"
                                                onChange={
                                                    this.onChangeConfirmPassword
                                                }
                                                placeholder="Nhập lại mật khẩu"
                                                required
                                                isValid={
                                                    password === null &&
                                                    password === confirmPassword
                                                }
                                                isInvalid={
                                                    password !== confirmPassword
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Mật khẩu không trùng khớp
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {error !== "" && (
                                            <Alert variant="danger">
                                                {error}
                                            </Alert>
                                        )}

                                        {success !== "" && (
                                            <Alert variant="success">
                                                {success}
                                            </Alert>
                                        )}
                                        <Button variant="info" type="submit">
                                            Đăng Ký
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
