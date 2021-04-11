import React, { Component } from "react";
import "./style.css";
import Switch from "react-switch";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { showGateDrop: false };
  }

  render() {
    return (
      <div className="sidebar">
        <h1>Debug:</h1>
        <hr />
        <label>
          <span>Display Gate Drop Locations:</span>
          <Switch
            onChange={(e) => this.setState({ showGateDrop: e })}
            checked={this.state.showGateDrop}
            offColor="#b02e2e"
            className="react-switch"
          />
        </label>
      </div>
    );
  }
}

export default Sidebar;
