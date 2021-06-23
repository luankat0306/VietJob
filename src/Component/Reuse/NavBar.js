import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({ auth: true });
        }
    }
    render() {
        const auth = this.state.auth;
        return (
            <div className="Nav" style={{ background: this.props.background }}>
                <NavLink to="/">
                    <img
                        style={{ height: "36px", margin: "10px" }}
                        src="../../../img/logo.svg"
                        alt=""></img>
                </NavLink>
                <div className="NavMenu">
                    <NavLink to="/nha-tuyen-dung/quan-ly-tai-khoan">
                        Nhà Tuyển Dụng{" "}
                    </NavLink>
                    <NavLink to="/nguoi-tim-viec/tim-kiem-cong-viec">
                        Người Tìm Việc
                    </NavLink>
                </div>
                <div className="NavBtnLink">
                    {!auth && (
                        <div className="NavBtn">
                            <NavLink to="/dang-nhap">Đăng Nhập</NavLink>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
