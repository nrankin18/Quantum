import React, { Component } from "react";
import "./style.css";
import { Droppable } from "react-beautiful-dnd";
import Gate from "./Gate";
import { v4 as uuid } from "uuid";

// This component is an individual qubit register
class Qubit extends Component {
  render() {
    return (
      <div className="qubit">
        <span className="qubit-line"></span>
        <span>
          <strong>
            q<sub>{this.props.number}</sub>
          </strong>
        </span>
        <span style={{ marginLeft: "10px", marginRight: "20px" }}>|0⟩</span>
        {this.props.gates.map((gate, index) => {
          if (
            gate === "h" ||
            gate === "cnot" ||
            gate === "cnot-up" ||
            gate === "cnot-down" ||
            gate === "t" ||
            gate === "s" ||
            gate === "z" ||
            gate === "x" ||
            gate === "y" ||
            gate === "trig" ||
            gate === "connect"
          ) {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type={gate}
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
                />
              </span>
            );
          } else if (gate === "measure") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="measure"
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                />
              </span>
            );
          } else if (gate === "trigopt") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="trigopt"
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                  onSelectTrigger={this.props.onSelectTrigger}
                />
              </span>
            );
          } else {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Droppable
                  droppableId={"q" + this.props.number + "," + index}
                  direction="horizontal"
                >
                  {(provided) => {
                    return (
                      <span
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        key={uuid()}
                        className={
                          this.props.options.showGateDrop
                            ? "gate-drop show"
                            : "gate-drop"
                        }
                      />
                    );
                  }}
                </Droppable>
              </span>
            );
          }
        })}
      </div>
    );
  }
}

export default Qubit;
