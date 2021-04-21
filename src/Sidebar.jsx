import React, { Component } from "react";
import "./style.css";
import Switch from "react-switch";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h1>Instructions:</h1>
        <hr />
        Drag and drop gates on qubit register lines to form a circuit.
        <br />
        <br />
        To connect CNOT trigger lines, click on one of the connection points
        that appear after adding a CNOT gate.
        <br />
        <br />
        To delete a gate, double click on it.
        <h1>Debug:</h1>
        <hr />
        <label>
          <span>Display Gate Drop Locations:</span>
          <Switch
            onChange={(e) => this.props.onSetOption("showGateDrop", e)}
            checked={this.props.options.showGateDrop}
            offColor="#b02e2e"
            className="react-switch"
          />
          <span>Display Gate Matrices:</span>
          <Switch
            onChange={(e) => this.props.onSetOption("showGateMatrix", e)}
            checked={this.props.options.showGateMatrix}
            offColor="#b02e2e"
            className="react-switch"
          />
        </label>
      </div>
    );
  }
}

export default Sidebar;
