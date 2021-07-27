import React, { Component } from "react";
import { Alert, Form } from "react-bootstrap";
import "../../css/LoginPage.css";
import history from "../history";
import AuthService from "../../services/AuthService";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    };
    this.login = this.login.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  login(e) {
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password).then(
      (res) => {
        if (res.data.accessToken)
          localStorage.setItem("user", JSON.stringify(res.data));
        history.push("/admin/thong-ke");
        window.location.reload();
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

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const error = this.state.error;
    return (
      <div className="login-page">
        <div className="formLogin">
          <Form onSubmit={this.login}>
            <h2>Admin Login</h2>

            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                onChange={this.handleUsername}
                required
              />
              <label for="username">Username</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                onChange={this.handlePassword}
                required
              />
              <label for="password">Password</label>
            </div>
            {error !== "" && <Alert variant="danger">{error}</Alert>}
            <button name="submit">Login</button>
          </Form>
        </div>
      </div>
    );
  }
}
