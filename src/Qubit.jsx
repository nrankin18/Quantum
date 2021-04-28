import React, { Component } from "react";
import "./style.css";
import { Droppable } from "react-beautiful-dnd";
import Gate from "./Gate";
import { v4 as uuid } from "uuid";

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
          if (gate === "h") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="h"
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
                />
              </span>
            );
          } else if (gate === "cnot") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="cnot"
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
                />
              </span>
            );
          } else if (gate === "cnotUp") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="cnotUp"
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
                />
              </span>
            );
          } else if (gate === "cnotDown") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="cnotDown"
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
                />
              </span>
            );
          } else if (gate === "t") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="t"
                  qubit={this.props.number}
                  index={index}
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
                />
              </span>
            );
          } else if (gate === "trig") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="trig"
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
                />
              </span>
            );
          } else if (gate === "connect") {
            return (
              <span className="gate-wrapper" key={uuid()}>
                <Gate
                  type="connect"
                  options={this.props.options}
                  onDelete={this.props.onDeleteGate}
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
