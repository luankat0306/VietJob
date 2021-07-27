import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import CandidateService from "../../../services/CandidateService";

class ChartPie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangThai: [],
    };
  }
  componentDidMount() {
    var statusCurrents = [];

    CandidateService.countDangCho().then((res) => {
      statusCurrents[0] = res.data;
    });

    CandidateService.countChapThuan().then((res) => {
      statusCurrents[1] = res.data;
    });

    CandidateService.countTuChoi().then((res) => {
      statusCurrents[2] = res.data;
    });

    this.setState({ trangThai: statusCurrents });
  }
  render() {
    return (
      <div className="chart-pie">
        <Pie
          options={{
            title: {
              display: true,
              text: "Biểu Đồ Trạng Thái Hồ Sơ Ứng Viên",
              fontSize: 20,
            },
            legend: {
              fontSize: 25,
              display: true,
              position: "bottom",
            },
            scales: 500,
          }}
          data={{
            labels: ["Đang chờ", "Tiếp nhận", "Từ Chối"],
            datasets: [
              {
                data: this.state.trangThai,
                backgroundColor: ["#2a9df4", "#ADFF2F", "#E8615D"],
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default ChartPie;
