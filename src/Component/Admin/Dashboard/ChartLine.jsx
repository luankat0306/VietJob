import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import JobService from "../../../services/JobService";

class ChartLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      years: [],
    };
  }

  choiseYear(event) {
    JobService.countMonthlys(event.target.value).then((res) =>
      this.setState({ jobs: res.data })
    );
  }
  componentDidMount() {
    var dateNow = Date.now();

    JobService.countMonthlys(new Date(dateNow).getFullYear()).then((res) =>
      this.setState({ jobs: res.data })
    );
    this.getYears();
  }
  render() {
    var months = [];
    for (let index = 1; index <= 12; index++) {
      months.push("Tháng" + index);
    }

    // remove duplicate year
    var uniq = [
      ...new Set(this.state.years.map((year) => new Date(year).getFullYear())),
    ];

    return (
      <div className="chart-line">
        <Form style={{ width: "30%", float: "left", margin: "10px" }} inline>
          <Form.Label
            className="my-1 mr-2"
            htmlFor="inlineFormCustomSelectPref"
          >
            Năm
          </Form.Label>
          <Form.Control
            as="select"
            className="mr-sm-2"
            custom
            id="year"
            onChange={this.choiseYear.bind(this)}
          >
            {uniq.map((year, index) => (
              <option value={year.toString()} key={index}>
                {year}
              </option>
            ))}
          </Form.Control>
        </Form>

        <Line
          options={{
            title: {
              display: true,
              text: "Biểu Đồ Số Lượng Việc làm",
              fontSize: 20,
            },
            legend: {
              fontSize: 20,
              display: false,
            },
            responsive: true,
          }}
          data={{
            labels: months,
            datasets: [
              {
                data: this.state.jobs.map((d) => d),
                fill: false,
                borderColor: "#2a9df4",
              },
            ],
          }}
        />
      </div>
    );
  }

  getYears() {
    JobService.getYears().then((res) => this.setState({ years: res.data }));
  }
}

export default ChartLine;
