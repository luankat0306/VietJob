import React, { Component } from "react";

import { ChangeEmail, ChangePassword, ChangePersonalInfo, ChangeAvatar, ChangeDescription } from "./Modals";
import EmployerIndex from "../EmployerIndex";
import EnterpriseService from "../../../services/EnterpriseService";
import AuthService from "../../../services/AuthService";
import FileService from "../../../services/FileService";

export default class AccountManage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enterprise: {
        id: "",
        contact: "",
        address: "",
        website: "",
        description: "",
        name: "",
        user: {
          id: "",
          fullname: "",
          username: "",
          phone: "",
          email: "",
          image: "",
          roles: [
            {
              id: 2,
              name: "ROLE_ENTERPRISE",
            },
          ],
        },
      },
    };
  }

  componentDidMount() {
    const idUser = AuthService.getCurrentUser().id;
    EnterpriseService.getByUser(idUser).then((res) => this.setState({ enterprise: res.data }));
  }
  render() {
    const enterprise = this.state.enterprise;
    return (
      <div>
        <EmployerIndex />
        <div className="page-content">
          <div className="wrapper">
            <div className="left">
              <img className="avatar" src={FileService.downloadFile(enterprise.user.image)} alt=""></img>
              <h4>{enterprise.name}</h4>
              <hr />
              <ChangeAvatar id={enterprise.user.id} />
              {/* <ChangeCover /> */}
            </div>

            <div className="right">
              <div className="info">
                {/* <div className="cover">
                                    <img
                                        src="../../../img/employer_avt/samsung-cover.png"
                                        alt=""></img>
                                </div> */}
              </div>

              <div className="info">
                <h3>THÔNG TIN TÀI KHOẢN</h3>

                <div className="info_data">
                  <div className="data">
                    <h4>
                      Email <ChangeEmail idUser={enterprise.user.id} email={enterprise.user.email || "Chưa có"} />
                    </h4>
                    <p>{enterprise.user.email || "Chưa có"}</p>
                  </div>
                  <div className="data">
                    <h4>
                      Mật Khẩu <ChangePassword idUser={enterprise.user.id} />
                    </h4>
                  </div>
                </div>
              </div>

              <div className="personalinfo">
                <h3>
                  THÔNG TIN CÔNG TY <ChangePersonalInfo idEnterprise={enterprise.id} />
                </h3>

                <div className="personalinfo_data">
                  <div className="data">
                    <h4>Địa Chỉ</h4>
                    <p>{enterprise.address || "Chưa có"}</p>
                  </div>
                  <div className="data">
                    <h4>Số điện thoại</h4>
                    <p>{enterprise.user.phone || "Chưa có"}</p>
                  </div>
                  <div className="data">
                    <h4>Website</h4>
                    <p>{enterprise.website || "Chưa có"}</p>
                  </div>
                  <div className="data">
                    <h4>Liên Hệ</h4>
                    <p>{enterprise.contact || "Chưa có"}</p>
                  </div>
                </div>
              </div>

              <div className="personalinfo">
                <h3>
                  GIỚI THIỆU CÔNG TY <ChangeDescription idEnterprise={enterprise.id} />
                </h3>

                <div className="data">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: enterprise.description || "Chưa có",
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
