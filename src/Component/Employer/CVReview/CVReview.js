import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CandidateService from "../../../services/CandidateService";
import EmployerIndex from "../EmployerIndex";

export default class CVReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("id");
    CandidateService.getCandidateByJobs(id).then((res) => this.setState({ candidates: res.data }));
  }
  render() {
    const candidates = this.state.candidates;
    return (
      <div>
        <EmployerIndex />
        <div className="page-content">
          <div className="box">
            <Table bordered hover>
              <thead className="table-header">
                <tr>
                  <th>ID</th>
                  <th>Tiêu Đề Bài Đăng</th>
                  <th>Họ Tên</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th>Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {candidates.map((candidate, index) => (
                  <tr key={candidate.id}>
                    <td>{index + 1}</td>
                    <td>{candidate.job.title}</td>
                    <td>{candidate.resume.applicant.user.fullname}</td>
                    <td>{candidate.resume.applicant.user.phone}</td>
                    <td>{candidate.resume.applicant.user.email}</td>
                    <td>
                      <NavLink to={`/nha-tuyen-dung/chi-tiet-ho-so/${candidate.id}`}>Chi Tiết</NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
