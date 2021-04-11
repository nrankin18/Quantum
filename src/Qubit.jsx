import React, { Component } from "react";
import "./style.css";

class Qubit extends Component {
  render() {
    return (
      <div className="qubit">
        <span>
          <strong>
            q<sub>{this.props.number}</sub>
          </strong>
        </span>
        <span style={{ marginLeft: "10px" }}>|0⟩</span>
        <span className="qubit-line" />
      </div>
    );
  }
}

export default Qubit;
