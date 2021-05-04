import React, { Component } from "react";
import "./style.css";
import Clock from "react-live-clock";

// Top toolbar
class Toolbar extends Component {
  render() {
    return (
      <div style={{ display: "fixed", height: "50px" }}>
        <div className="toolbar">
          <div
            style={{
              position: "absolute",
              left: "25px",
              top: "0",
              fontSize: "0.8em",
            }}
          >
            Version 1.4.7
          </div>
          Spring 2021 IQC Quantum Computer Simulator
          <div style={{ position: "absolute", right: "40px", top: "0" }}>
            <Clock ticking format={"HH:mm:ss"} timezone={"Etc/UTC"} />
          </div>
          <div style={{ position: "absolute", right: "25px", top: "0" }}>Z</div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
