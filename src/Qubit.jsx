import React, { Component } from "react";
import "./style.css";

class Qubit extends Component {
  constructor(props) {
    super(props);
    this.state = { gates: [] };
  }

  render() {
    return (
      <div className="qubit">
        <span>
          <strong>
            q<sub>{this.props.number}</sub>
          </strong>
        </span>
        <span style={{ marginLeft: "10px", marginRight: "20px" }}>|0⟩</span>
        {this.state.gates.map(() => (
          <span />
        ))}
        <span
          className={
            this.props.options.showGateDrop ? "gate-drop show" : "gate-drop"
          }
        />
      </div>
    );
  }
}

export default Qubit;
