import React, { Component } from "react";
import Qubit from "./Qubit";
import "./style.css";

class Circuit extends Component {
  render() {
    return (
      <div className="circuit">
        {this.props.circuit.map((qubit, index) => (
          <Qubit
            number={index}
            options={this.props.options}
            key={index}
            gates={qubit}
            onSelectTrigger={this.props.onSelectTrigger}
          />
        ))}
      </div>
    );
  }
}

export default Circuit;
