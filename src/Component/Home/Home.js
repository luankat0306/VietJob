import React, { Component } from "react";
import { Card, Container, Grid } from "@material-ui/core";
import { Col, NavLink, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CandidateService from "../../services/CandidateService";
import JobService from "../../services/JobService";
import FileService from "../../services/FileService";
import NavBar from "../Reuse/NavBar";
import SearchBar from "../Reuse/SearchBar";
import { Pagination } from "@material-ui/lab";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enterprises: [],
      jobs: [],
      page: 1,
      count: 0,
      image: "",
    };
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    CandidateService.top5().then((res) => this.setState({ enterprises: res.data }));
    this.fetchJobsPopular(this.state.page);
  }

  fetchJobsPopular(page) {
    JobService.getJobsPopular(page - 1, 4).then((res) => this.setState({ jobs: res.data.jobs, count: res.data.count }));
  }

  handleChangePage(e, newPage) {
    this.setState({ page: newPage });
    this.fetchJobsPopular(newPage);
  }

  render() {
    const { enterprises, jobs, page, count } = this.state;
    console.log(enterprises);
    return (
      <>
        <NavBar background="rgba(0, 0, 0, 0.225)" />
        <div className="home-banner">
          <img src="../../../img/home-banner.jpg" alt="" />
          <h1>Tìm Kiếm Công Việc Mơ Ước</h1>
          <SearchBar top="-50vh" />
        </div>

        <div className="body">
          <br />
          <h2 style={{ fontWeight: 300, color: "#484848", textAlign: "center" }}>Các Công Ty Hàng Đầu</h2>
          <Container>
            <Grid container justify="center" className="company-box">
              {enterprises.map((enterprise) => (
                <Card style={{ marginLeft: 10, marginRight: 10, boxShadow: "0 1px 4px 0px rgb(0 0 0 / 35%)" }}>
                  <img src={FileService.downloadFile(enterprise.user.image)} alt="" />
                </Card>
              ))}
            </Grid>
          </Container>
          <br />
          <h2 style={{ fontWeight: 300, color: "#484848", textAlign: "center" }}>Việc Làm Tốt Nhất</h2>
          <Container disableGutters maxWidth="lg">
            <div className="company-box">
              <Grid container spacing={5}>
                {jobs.map((job) => (
                  <Grid item xs={6}>
                    <div style={{ borderBottom: "1px solid #E5E5E5" }}>
                      <Grid container justify="center" alignItems="center">
                        <Grid item xs={3}>
                          <img
                            style={{ height: 100, width: 100 }}
                            src={FileService.downloadFile(job.enterprise.user.image)}
                            alt=""
                          />
                        </Grid>
                        <Grid item xs={8} style={{ textAlign: "start" }}>
                          <Link
                            to={`/nguoi-tim-viec/chi-tiet-cong-viec/${job.id}`}
                            style={{ fontSize: 17, fontWeight: 700, marginBottom: 0 }}
                          >
                            {job.title}
                          </Link>
                          <p style={{ fontSize: 14 }}>{job.enterprise.name}</p>
                        </Grid>
                        <Grid item xs={1}>
                          <div
                            style={{
                              width: "fit-content",
                              padding: 3,
                              backgroundColor: "#FF5661",
                              color: "white",
                              borderRadius: 3,
                            }}
                          >
                            HOT
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
            <Pagination
              style={{ display: "flex", justifyContent: "center" }}
              count={count}
              page={page}
              onChange={this.handleChangePage}
              variant="outlined"
              color="primary"
              size="small"
            />
          </Container>

          <br />
        </div>

        <div className="footer">
          <Row>
            <Col>
              <h6>VietJobs</h6>
              <NavLink>Liên Hệ</NavLink>
              <NavLink>Hỏi Đáp</NavLink>
              <NavLink>Thỏa Thuận Sử Dụng</NavLink>
              <NavLink>Quy Định Bảo Mật</NavLink>
            </Col>
            <Col>
              <h6>Việc Làm Theo Tỉnh Thành</h6>
              <NavLink>Hồ Chí Minh</NavLink>
              <NavLink>Hà Nội</NavLink>
              <NavLink>Đà Nẵng</NavLink>
            </Col>
            <Col>
              <h6>Việc Làm Theo Ngành Nghề</h6>
              <NavLink>Kế Toán</NavLink>
              <NavLink>IT-Phần Mềm</NavLink>
              <NavLink>Giáo Dục-Đào Tạo</NavLink>
              <NavLink>Ngân Hàng</NavLink>
            </Col>
            <Col>
              <h6>Hỗ Trợ</h6>
              <p>Võ Trí Luân</p>
              <p>Trần Vũ Luân</p>
              <p>Trần Phúc Hậu</p>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
