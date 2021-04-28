import React, { Component } from "react";
import Circuit from "./Circuit";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import GateMenu from "./GateMenu";
import { DragDropContext } from "react-beautiful-dnd";
import Measure from "./Measure";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        showGateDrop: false,
        showGateMatrix: false,
        showStatevector: false,
      },

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
      ],
    };
  }

  onDragEnd(result) {
    if (
      result.destination &&
      result.destination.droppableId.charAt(0) === "q"
    ) {
      let tmpCircuit = this.state.circuit;
      const qubit = parseInt(result.destination.droppableId.charAt(1));
      const col = parseInt(result.destination.droppableId.substring(3));
      if (result.draggableId === "cnot") {
        for (var i = 0; i < tmpCircuit.length; i++) {
          if (
            i !== qubit &&
            (tmpCircuit[i][col] === "cnot" ||
              tmpCircuit[i][col] === "cnotUp" ||
              tmpCircuit[i][col] === "cnotDown")
          ) {
            alert("Error: Only one CNOT allowed per column");
            return;
          }
        }
      }
      tmpCircuit[qubit][col] = result.draggableId;

      if (result.draggableId === "cnot") {
        for (i = qubit + 1; i < tmpCircuit.length; i++) {
          if (tmpCircuit[i][col] !== null) {
            break;
          } else {
            tmpCircuit[i][col] = "trigopt";
          }
        }
        for (i = qubit - 1; i >= 0; i--) {
          if (tmpCircuit[i][col] !== null) {
            break;
          } else {
            tmpCircuit[i][col] = "trigopt";
          }
        }
      }
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
      case "showStatevector":
        this.setState((prevState) => ({
          options: {
            ...prevState.options,
            showStatevector: state,
          },
        }));
        break;
      default:
        return;
    }
  }

  onSelectTrigger(qubit, index) {
    let tmpCircuit = this.state.circuit;
    let connecting = false;
    for (var i = 0; i < tmpCircuit.length; i++) {
      if (i === qubit) {
        connecting = !connecting;
      }
      if (tmpCircuit[i][index] === "cnot") {
        tmpCircuit[i][index] = connecting ? "cnotUp" : "cnotDown";
        connecting = !connecting;
        continue;
      } else if (tmpCircuit[i][index] === "trigopt") {
        tmpCircuit[i][index] = connecting ? "connect" : null;
      }
    }
    tmpCircuit[qubit][index] = "trig";
    this.setState({ circuit: tmpCircuit });
  }

  onDeleteGate(qubit, index, isCNOT) {
    let tmpCircuit = this.state.circuit;
    tmpCircuit[qubit][index] = null;
    if (isCNOT) {
      for (var i = 0; i < tmpCircuit.length; i++) {
        if (
          tmpCircuit[i][index] === "trig" ||
          tmpCircuit[i][index] === "connect" ||
          tmpCircuit[i][index] === "trigopt"
        )
          tmpCircuit[i][index] = null;
      }
    }

    this.setState({ circuit: tmpCircuit });
  }

  onClearCircuit() {
    this.setState({
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
      ],
    });
  }

  onAddQubit() {
    var tmpCircuit = this.state.circuit;
    if (tmpCircuit.length < 10) {
      tmpCircuit.push([
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
      ]);
    }
    this.setState({ circuit: tmpCircuit });
  }

  onRemoveQubit() {
    var tmpCircuit = this.state.circuit;
    if (tmpCircuit.length > 1) {
      tmpCircuit.pop();
    }
    this.setState({ circuit: tmpCircuit });
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
                onSelectTrigger={this.onSelectTrigger.bind(this)}
                onDeleteGate={this.onDeleteGate.bind(this)}
                onClearCircuit={this.onClearCircuit.bind(this)}
                onAddQubit={this.onAddQubit.bind(this)}
                onRemoveQubit={this.onRemoveQubit.bind(this)}
              />
              <hr />
              <h3>Measurement:</h3>
              <Measure
                circuit={[].concat(this.state.circuit)}
                options={this.state.options}
              />
            </div>
          </DragDropContext>
        </div>
      </>
    );
  }
}

export default App;
