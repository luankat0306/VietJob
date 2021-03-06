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
                        success: "????ng k?? th??nh c??ng",
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
                                        ????ng K?? T??i Kho???n
                                    </span>

                                    <div className="jobseeker-employer-link">
                                        <NavLink
                                            to="/dang-ky/nguoi-tim-viec"
                                            activeStyle>
                                            T??i L?? Ng?????i T??m Vi???c
                                        </NavLink>
                                        <NavLink
                                            to="/dang-ky/nha-tuyen-dung"
                                            activeStyle>
                                            T??i L?? Nh?? Tuy???n D???ng
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
                                                placeholder="Nh???p username"
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
                                                placeholder="Nh???p email (name@example.com)"
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="password"
                                            controlId="formBasicPassword">
                                            <Form.Label>M???t Kh???u</Form.Label>
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
                                                placeholder="Nh???p m???t kh???u"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="confirm"
                                            controlId="formBasicPassword">
                                            <Form.Label>
                                                X??c Nh???n M???t Kh???u
                                            </Form.Label>
                                            <Form.Control
                                                id="confirmpassword"
                                                type="password"
                                                onChange={
                                                    this.onChangeConfirmPassword
                                                }
                                                placeholder="Nh???p l???i m???t kh???u"
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
                                                M???t kh???u kh??ng tr??ng kh???p
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
                                            ????ng K??
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
