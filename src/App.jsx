import React, { Component } from "react";
import Circuit from "./Circuit";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import GateMenu from "./GateMenu";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: { showGateDrop: false, showGateMatrix: false },

      circuit: [
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      ],
    };
  }

  onDragEnd(result) {
    console.log(result.destination);
    if (
      result.destination &&
      result.destination.droppableId.charAt(0) === "q"
    ) {
      let tmpCircuit = this.state.circuit;
      tmpCircuit[parseInt(result.destination.droppableId.charAt(1))][
        parseInt(result.destination.droppableId.substring(3))
      ] = result.draggableId;
      this.setState({ circuit: tmpCircuit });
    }
  }

  onSetOption(option, state) {
    switch (option) {
      case "showGateDrop":
        this.setState((prevState) => ({
          options: {
            ...prevState.options,
            showGateDrop: state,
          },
        }));
        break;
      case "showGateMatrix":
        this.setState((prevState) => ({
          options: {
            ...prevState.options,
            showGateMatrix: state,
          },
        }));
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <>
        <Toolbar />
        <Sidebar
          options={this.state.options}
          onSetOption={this.onSetOption.bind(this)}
        />
        <div className="container">
          <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
            <div>
              <h2>New Program &gt;</h2>
              <hr />
              <h3>Gates:</h3>
              <GateMenu options={this.state.options} />
              <hr />
              <h3>Circuit:</h3>
              <Circuit
                options={this.state.options}
                circuit={this.state.circuit}
              />
              <hr />
              <h3>Measurement:</h3>
            </div>
          </DragDropContext>
        </div>
      </>
    );
  }
}

export default App;
