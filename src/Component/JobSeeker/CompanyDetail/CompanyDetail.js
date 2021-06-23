import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FcConferenceCall, FcGlobe, FcPhone } from "react-icons/fc";
import EnterpriseService from "../../../services/EnterpriseService";
import FileService from "../../../services/FileService";
import JobSeekerIndex from "../JobSeekerIndex";
export default class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enterprise: {
        name: "",
        address: "",
        phone: "",
        description: "",
        website: "",
        contact: "",
        user: {
          image: "",
        },
      },
    };
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    EnterpriseService.getEnterprise(params.id).then((res) => this.setState({ enterprise: res.data }));
  }
  render() {
    const enterprise = this.state.enterprise;
    return (
      <div>
        <JobSeekerIndex />
        <div className="page-content">
          <div className="box">
            <Container className="content-jobdetail">
              <Row>
                <Col className="jobdetail-col">
                  {/* <div className="jobdetail-cover">
                                        <img
                                            src="../../../img/employer_avt/samsung-cover.png"
                                            alt=""
                                            fluid></img>
                                    </div> */}

                  <div className="jobdetail-img">
                    <img src={FileService.downloadFile(enterprise.user.image)} alt=""></img>
                  </div>
                  <div className="jobdetail-header">
                    <hr />
                    <h1>{enterprise.name}</h1>
                    <hr />
                  </div>
                </Col>
              </Row>
              <Row className="jobdetail-info">
                <Col>
                  <h5>
                    <span>
                      <FcConferenceCall />
                    </span>
                    Số điện thoại
                  </h5>
                  <p>{enterprise.user.phone}</p>
                </Col>
                <Col>
                  <h5>
                    <span>
                      <FcGlobe />
                    </span>
                    Website
                  </h5>
                  <a href={"https://" + enterprise.website} rel="noreferrer" target="_blank">
                    {enterprise.website}
                  </a>
                </Col>
                <Col>
                  <h5>
                    <span>
                      <FcPhone />
                    </span>
                    Liên Hệ
                  </h5>
                  <p>{enterprise.contact}</p>
                </Col>
              </Row>
              <Row className="jobdetail-info">
                <Col>
                  <h4>Giới Thiệu Công Ty</h4>
                  <div className="job-describe">
                    <Col>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: enterprise.description,
                        }}
                      ></p>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Row className="jobdetail-info">
                <Col>
                  <h4>Địa chỉ</h4>
                  <div className="job-describe">
                    <Col>
                      <p>{enterprise.address}</p>
                    </Col>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
