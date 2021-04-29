import React, { Component } from "react";
import Qubit from "./Qubit";
import "./style.css";

// This componenet manages the variable qubit lines
class Circuit extends Component {
  render() {
    return (
      <>
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
        </div>
        <button className="button" onClick={() => this.props.onAddQubit()}>
          Add qubit
        </button>
        <button className="button" onClick={() => this.props.onRemoveQubit()}>
          Remove qubit
        </button>
        <button className="button" onClick={() => this.props.onResetCircuit()}>
          Reset circuit
        </button>{" "}
      </>
    );
  }
}

export default Circuit;
