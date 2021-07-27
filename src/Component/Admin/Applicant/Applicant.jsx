import { faSearch, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import ApplicantService from "../../../services/ApplicantService";
import Table from "../Table";
import ButtonAdd from "./ButtonAdd";
import ButtonEdit from "./ButtonEdit";
import ButtonDelete from "./ButtonDelete";
import { ToastContainer } from "react-toastify";
import LeftSidebar from "../LeftSidebar";

class Applicant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      thead: ["STT", "Họ và tên", "Số điện thoại", "Email", "Chỉnh Sửa"],
      tbody: [],
    };
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.getApplicants();
  }

  search(e) {
    let data = [];
    var applicants = [];
    var applicant = {};
    const keyword = e.target.value;
    if (keyword === "") {
      this.getApplicants();
    } else {
      console.log(keyword);
      ApplicantService.searchApplicant(keyword).then((res) => {
        data = res.data;
        data.forEach((e, index) => {
          applicant = {
            stt: index + 1,
            fullname: e.user.fullname,
            phone: e.user.phone,
            email: e.user.email,
            edit: <ButtonEdit id={e.id} />,

            delete: <ButtonDelete id={e.id} />,
          };
          applicants.push(applicant);
        });

        this.setState({ tbody: applicants });
      });
    }
  }

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
            <FontAwesomeIcon icon={faUserTie} />
            ỨNG VIÊN
          </h5>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="search">
              <form className="form-search">
                <input
                  className="search-txt"
                  onChange={this.search}
                  type="text"
                  placeholder="Tìm Kiếm..."
                />
                <button className="search-btn" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
            <ButtonAdd />
          </div>
          <hr />
          <Table
            head={this.state.thead}
            body={this.state.tbody}
            isEdit={true}
            headBackground={"#242849"}
            headColor={"#ffd98d"}
            page={true}
          />
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
          <ToastContainer />
        </div>
      </div>
    );
  }

  getApplicants() {
    let data = [];
    var applicants = [];
    var applicant = {};
    ApplicantService.getApplicants().then((res) => {
      data = res.data;
      data.forEach((e, index) => {
        applicant = {
          stt: index + 1,
          fullname: e.user.fullname,
          phone: e.user.phone,
          email: e.user.email,
          edit: <ButtonEdit id={e.id} />,

          delete: <ButtonDelete id={e.id} />,
        };
        applicants.push(applicant);
      });

      this.setState({ tbody: applicants });
    });
  }
}

export default Applicant;
