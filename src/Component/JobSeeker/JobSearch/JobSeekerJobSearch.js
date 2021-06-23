import React, { Component } from "react";
import JobSearch from "../../JobSearch/JobSearch";
import JobSeekerIndex from "../JobSeekerIndex";

export default class JobSeekerJobSearch extends Component {
    render() {
        return (
            <div>
                <JobSeekerIndex />
                <div className="page-content">
                    <JobSearch />
                </div>
            </div>
        );
    }
}
