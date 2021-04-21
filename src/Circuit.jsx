import React, { Component } from "react";
import Qubit from "./Qubit";
import "./style.css";
import { v4 as uuid } from "uuid";

class Circuit extends Component {
  constructor(props) {
    super(props);
    this.state = { qubits: [0, 1, 2] };
  }

  render() {
    return (
      <div className="circuit">
        {this.state.qubits.map((index) => (
          <Qubit number={index} options={this.props.options} key={uuid()} />
        ))}
      </div>
    );
  }
}

export default Circuit;
