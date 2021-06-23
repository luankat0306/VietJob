import React, { Component } from "react";
import NavBar from "../Reuse/NavBar";
import SideNav2 from "./SideNav2";

export default class EmployerIndex extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SideNav2 />
      </div>
    );
  }
}
