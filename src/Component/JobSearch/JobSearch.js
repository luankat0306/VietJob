import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import AuthService from "../../services/AuthService";
import JobService from "../../services/JobService";
import JobCard from "../Reuse/JobCard";
import SearchBar from "../Reuse/SearchBar";

export default class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      page: 1,
      count: 0,
      notFound: false,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
  }
  componentDidMount() {
    this.fetchData(this.state.page);

    try {
      const token = AuthService.getCurrentUser();
      if (token.roles.includes("ROLE_USER")) {
        this.setState({ auth: true });
      }
    } catch (error) {}
  }

  fetchData(page) {
    const search = new URLSearchParams(window.location.search);
    // this.setState();
    // if (search.get("tu-khoa") && search.get("nganh-nghe") && search.get("tinh-thanh")) {
    //   JobService.getJobs(page, 8).then((res) => {
    //     this.setState({ jobs: res.data.jobs, count: res.data.count });
    //   });
    // } else {
    const keyword = search.get("tu-khoa") || "";
    const career = search.get("nganh-nghe") || "";
    const province = search.get("tinh-thanh") || "";

    const values = {
      keyword: keyword.split("_").join(" "),
      career: career.split("_").join(" "),
      province: province.split("_").join(" "),
      page: page,
      rowPerPage: 8,
    };

    JobService.searchJobs(values).then(
      (res) => {
        this.setState({ jobs: res.data.jobs, count: res.data.count });
      },
      (error) => {
        if (this.state.jobs.length === 0) {
          this.setState({ notFound: true });
        }
      }
    );
    // }
  }
  handleChangePage(e, newPage) {
    this.fetchData(newPage);
    this.setState({ page: newPage });
  }

  render() {
    const { jobs, page, count } = this.state;
    return (
      <div>
        <SearchBar top="2vh" onClickSearch={() => this.setState({ page: 0 })} />
        <div className="box">
          {this.state.notFound === true ? (
            <Alert className="not-found" variant="danger">
              Không Tìm Thấy Kêt Quả
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {jobs.map((job) => (
                <Grid item xs={6}>
                  <JobCard job={job} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>

        <br />
        <hr style={{ marginLeft: "20%", marginRight: "20%" }} />
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          count={count}
          page={page}
          onChange={this.handleChangePage}
          variant="outlined"
          color="primary"
          size="small"
        />
        <br />
      </div>
    );
  }
}
