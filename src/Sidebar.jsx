import React, { Component } from "react";
import "./style.css";
import Switch from "react-switch";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h1>Debug:</h1>
        <hr />
        <label>
          <span>Display Gate Drop Locations:</span>
          <Switch
            onChange={(e) => this.props.onSetOption({ showGateDrop: e })}
            checked={this.props.options.showGateDrop}
            offColor="#b02e2e"
            className="react-switch"
          />
        </label>
      </div>
    );
  }
}

export default Sidebar;
