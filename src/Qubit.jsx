import React, { Component } from "react";
import "./style.css";
import { Droppable } from "react-beautiful-dnd";
import Gate from "./Gate";
import { v4 as uuid } from "uuid";

class Qubit extends Component {
  render() {
    return (
      <div className="qubit">
        <span>
          <strong>
            q<sub>{this.props.number}</sub>
          </strong>
        </span>
        <span style={{ marginLeft: "10px", marginRight: "20px" }}>|0⟩</span>
        {this.props.gates.map((gate, index) => {
          if (gate === "h") {
            return (
              <span className="gate-wrapper">
                <Gate type="h" options={this.props.options} key={uuid()} />
              </span>
            );
          } else if (gate === "cnot") {
            return (
              <span className="gate-wrapper">
                <Gate type="cnot" options={this.props.options} key={uuid()} />{" "}
              </span>
            );
          } else if (gate === "t") {
            return (
              <span className="gate-wrapper">
                <Gate type="t" options={this.props.options} key={uuid()} />{" "}
              </span>
            );
          } else {
            return (
              <span className="gate-wrapper">
                <Droppable
                  droppableId={"q" + this.props.number + "," + index}
                  key={uuid()}
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
