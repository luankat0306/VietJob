import {
  faBriefcase,
  faChartLine,
  faLandmark,
  faUser,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import JobService from "../../../services/JobService";
import ApplicantService from "../../../services/ApplicantService";
import EnterpriseService from "../../../services/EnterpriseService";
import CandidateService from "../../../services/CandidateService";
import ChartLine from "./ChartLine";
import ChartPie from "./ChartPie";
import Table from "../Table";
import LeftSidebar from "../LeftSidebar";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countApplicant: 0,
      countEnterprise: 0,
      countJob: 0,
      countRecruitment: 0,
      bodyJobs: [],
      bodyEnterprises: [],
    };
  }
  componentDidMount() {
    //  Number Dashboard
    this.getCounts();

    EnterpriseService.topFiveEnterprises().then((res) => {
      this.setState({ bodyEnterprises: res.data });
    });

    JobService.topFiveJobs().then((res) => {
      this.setState({ bodyJobs: res.data });
    });
  }

  render() {
    const headEnterprises = ["id Công Ty", "Tên Công Ty", "Bài đăng tuyển"];
    const headJobs = [
      "id Bài Đăng",
      "Tiêu đề bài đăng",
      "Nhà Tuyển Dụng",
      "Số lượng ứng viên",
    ];

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
              <FontAwesomeIcon icon={faChartLine} />
            </i>{" "}
            THỐNG KÊ{" "}
          </h5>
          <br />
          <div className="box">
            <div className="grid-item" id="dashboard-ung-vien">
              <i>
                <FontAwesomeIcon icon={faUser} />
              </i>
              <label>Ứng viên</label>
              <p>{this.state.countApplicant}</p>
            </div>

            <div className="grid-item" id="dashboard-doanh-nghiep">
              <i>
                <FontAwesomeIcon icon={faLandmark} />
              </i>
              <label>Doanh nghiệp</label>
              <p>{this.state.countEnterprise}</p>
            </div>

            <div className="grid-item" id="dashboard-viec-lam">
              <i>
                <FontAwesomeIcon icon={faBriefcase} />
              </i>
              <label>Việc làm</label>
              <p>{this.state.countJob}</p>
            </div>

            <div className="grid-item" id="dashboard-ung-tuyen">
              <i>
                <FontAwesomeIcon icon={faUserCheck} />
              </i>
              <label>Ứng tuyển</label>
              <p>{this.state.countRecruitment}</p>
            </div>
          </div>
          <br />
          <hr className="hr" />

          <div className="thong-ke">
            <ChartLine />
            <div className="table1">
              <Table
                head={headEnterprises}
                body={this.state.bodyEnterprises}
                headBackground={"#89a8bc"}
                headColor={"white"}
                page={false}
              />
            </div>
            <div className="table2">
              <Table
                head={headJobs}
                body={this.state.bodyJobs}
                headBackground={"#7a80b4"}
                headColor={"white"}
                page={false}
              />
            </div>
            <ChartPie />
          </div>
          <footer
            style={{
              display: "block",
              marginTop: "30px",
              width: "100%",
              color: "gray",
              textAlign: "center",
            }}
          >
            <h5>Copyright © VietJobs, Vietnam</h5>
          </footer>
        </div>
      </div>
    );
  }
  getCounts() {
    ApplicantService.countApplicant().then((res) => {
      this.setState({ countApplicant: res.data });
    });

    EnterpriseService.countEnterprise().then((res) => {
      this.setState({ countEnterprise: res.data });
    });

    JobService.countJob().then((res) => {
      this.setState({ countJob: res.data });
    });

    CandidateService.countChapThuan().then((res) => {
      this.setState({ countRecruitment: res.data });
    });
  }
}
