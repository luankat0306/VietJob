import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import CareerService from "../../services/CareerService";
import ProvinceServic from "../../services/ProvinceService";
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careers: [],
      provinces: [],
      keyword: "",
      career: "",
      province: "",
    };
    this.search = this.search.bind(this);
    this.handleCareer = this.handleCareer.bind(this);
    this.handleKeyword = this.handleKeyword.bind(this);
    this.handleProvince = this.handleProvince.bind(this);
  }

  componentDidMount() {
    const search = new URLSearchParams(window.location.search);
    if (search.get("tu-khoa") != null || search.get("nganh-nghe") != null || search.get("tinh-thanh") != null) {
      this.setState({
        keyword: search.get("tu-khoa").split("_").join(" "),
        career: search.get("nganh-nghe").split("_").join(" "),
        province: search.get("tinh-thanh").split("_").join(" "),
      });
    }

    ProvinceServic.listProvince().then((res) => this.setState({ provinces: res.data }));

    CareerService.getCareers().then((res) => this.setState({ careers: res.data }));
  }

  handleKeyword(e) {
    this.setState({ keyword: e.target.value });
  }

  handleCareer(e) {
    this.setState({ career: e.target.value });
  }

  handleProvince(e) {
    this.setState({ province: e.target.value });
  }

  search() {
    // this.props.onClickSearch();
    const { keyword, province, career } = this.state;
    const newKeyword = keyword.split(" ").join("_");
    const newProvince = province.split(" ").join("_");
    const newCareer = career.split(" ").join("_");

    window.location.replace(
      `/nguoi-tim-viec/tim-kiem-cong-viec` +
        ((newKeyword || newProvince || newCareer) &&
          `?tu-khoa=${newKeyword}&nganh-nghe=${newCareer}&tinh-thanh=${newProvince}`)
    );
  }

  render() {
    const { careers, provinces, keyword, province, career } = this.state;
    return (
      <div className="search-bar" style={{ top: this.props.top, position: this.props.position }}>
        <Form style={{ width: "100%" }}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control value={keyword} defaultValue="" onChange={this.handleKeyword}></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select" onChange={this.handleCareer} defaultValue="" value={career}>
                <option value="">Chọn Ngành Nghề...</option>
                {careers.map((career) => (
                  <option value={career.name}>{career.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select" onChange={this.handleProvince} defaultValue="" value={province}>
                <option value="">Chọn Tỉnh Thành...</option>
                {provinces.map((province) => (
                  <option value={province.province}>{province.province}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <div style={{ height: "calc(1.5em + .75rem + 2px);" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Button variant="success" type="submit" onClick={this.search}>
                  {" "}
                  Tìm Kiếm
                </Button>
              </Link>
            </div>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
