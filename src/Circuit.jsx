import React, { Component } from "react";
import Qubit from "./Qubit";
import "./style.css";

class Circuit extends Component {
  render() {
    return (
      <div className="circuit-wrapper">
        <div className="circuit">
          {this.props.circuit.map((qubit, index) => (
            <Qubit
              number={index}
              options={this.props.options}
              key={index}
              gates={qubit}
              onSelectTrigger={this.props.onSelectTrigger}
              onDeleteGate={this.props.onDeleteGate}
            />
          ))}
        </div>
        <button className="button" onClick={() => this.props.onAddQubit()}>
          Add qubit
        </button>
        <button className="button" onClick={() => this.props.onRemoveQubit()}>
          Remove qubit
        </button>
        <button className="button" onClick={() => this.props.onClearCircuit()}>
          Reset circuit
        </button>
      </div>
    );
  }
}

export default Circuit;
