import React, { Component } from "react";
import "./style.css";
import Gate from "./Gate";

class GateMenu extends Component {
  render() {
    return (
      <div className="gate-menu">
        <Gate type="cnot" options={this.props.options} />
        <Gate type="h" options={this.props.options} />
        <Gate type="t" options={this.props.options} />
      </div>
    );
  }
}

export default GateMenu;
