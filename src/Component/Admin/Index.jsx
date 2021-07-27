import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Applicant from "./Applicant/Applicant";
import Dashboard from "./Dashboard/Dashboard";
import LeftSidebar from "./LeftSidebar";
import Profile from "./Profile/Profile";

export default class Index extends Component {
    render() {
        return (
            <div className="admin-wrapper">
                <LeftSidebar />
                <div className="content">
                    <Switch></Switch>
                    <footer
                        style={{
                            display: "block",
                            marginTop: "30px",
                            width: "100%",
                            color: "gray",
                            textAlign: "center",
                        }}>
                        <h5>Copyright © VietJobs, Vietnam</h5>
                    </footer>
                </div>
            </div>
        );
    }
}
