import React, { Component } from "react";
import "./style.css";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

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
        <Droppable droppableId={uuid()} key={uuid()} direction="horizontal">
          {(provided) => {
            return (
              <span
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={
                  this.props.options.showGateDrop
                    ? "gate-drop show"
                    : "gate-drop"
                }
              />
            );
          }}
        </Droppable>
      </div>
    );
  }
}

export default Qubit;
