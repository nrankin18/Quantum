import React, { Component } from "react";
import Qubit from "./Qubit";
import "./style.css";

class Circuit extends Component {
  constructor(props) {
    super(props);
    this.state = { qubits: [0, 1, 2] };
  }

  render() {
    return (
      <div className="circuit">
        {this.state.qubits.map((index) => (
          <Qubit number={index} />
        ))}
      </div>
    );
  }
}

export default Circuit;
