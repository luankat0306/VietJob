import { faBriefcase, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import SearchBar from "../SearchBar";
import Table from "../Table";
import ButtonAdd from "./ButtonAdd";
import ButtonEdit from "./ButtonEdit";
import ButtonDelete from "./ButtonDelete";
import { ToastContainer } from "react-toastify";
import LeftSidebar from "../LeftSidebar";
import CareerService from "../../../services/CareerService";

class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      thead: ["STT", "Ngành Nghề", "Chỉnh Sửa"],
      tbody: [],
    };
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.getCareers();
  }
  search(e) {
    let data = [];
    var applicants = [];
    var applicant = {};

    if (e.target.value === "") {
      this.getCareers();
    } else {
      CareerService.search(e.target.value).then((res) => {
        data = res.data;
        data.forEach((e, index) => {
          applicant = {
            stt: index + 1,
            career: e.name,
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
            <FontAwesomeIcon icon={faBriefcase} />
            Ngành Nghề
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

  getCareers() {
    let data = [];
    var applicants = [];
    var applicant = {};
    CareerService.getCareers().then((res) => {
      data = res.data;
      data.forEach((e, index) => {
        applicant = {
          stt: index + 1,
          career: e.name,
          edit: <ButtonEdit id={e.id} />,

          delete: <ButtonDelete id={e.id} />,
        };
        applicants.push(applicant);
      });

      this.setState({ tbody: applicants });
    });
  }
}

export default Career;
