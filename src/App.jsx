import React, { Component } from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import GateMenu from "./GateMenu";
import Circuit from "./Circuit";
import Measure from "./Measure";
import { DragDropContext } from "react-beautiful-dnd";

const defaultCircuit = [
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
    null,
    null,
    null,
    null,
    null,
    "measure",
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
    null,
    null,
    null,
    null,
    null,
    "measure",
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
    null,
    null,
    null,
    null,
    null,
    "measure",
  ],
];

const MAX_QUBITS = 10;

// This is the simulator's main component responsible for housing the other components and maintaining the general state of the system including options and circuit design
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        showGateDrop: false,
        showGateMatrix: false,
        showStatevector: false,
        randomSeed: "2021",
      },

      circuit: JSON.parse(JSON.stringify(defaultCircuit)),
    };
  }

  // Handles the release of a gate onto a qubit line
  onDragEnd(result) {
    // Dropped onto a valid gate drop location
    if (
      result.destination &&
      result.destination.droppableId.charAt(0) === "q"
    ) {
      let tmpCircuit = this.state.circuit;
      const qubit = parseInt(result.destination.droppableId.charAt(1));
      const col = parseInt(result.destination.droppableId.substring(3));

      tmpCircuit[qubit][col] = result.draggableId;

      // Display trigger option spots above and below CNOT
      if (result.draggableId === "cnot") {
        for (var i = qubit + 1; i < tmpCircuit.length; i++) {
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

  // Callback to handle updating options
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
      case "setSeed":
        console.log(state.target.value);
        this.setState((prevState) => ({
          options: {
            ...prevState.options,
            randomSeed: state.target.value,
          },
        }));
        break;
      default:
        return;
    }
  }

  // Callback when selecting trigger point
  onSelectTrigger(qubit, index) {
    let tmpCircuit = this.state.circuit;
    let gateIndex;
    // Search up for gate
    for (var i = qubit; i < tmpCircuit.length; i++) {
      if (tmpCircuit[i][index] === "cnot") {
        gateIndex = i;
        break;
      }
    }
    // Search down for gate
    if (!gateIndex) {
      for (i = qubit; i >= 0; i--) {
        if (tmpCircuit[i][index] === "cnot") {
          gateIndex = i;
          tmpCircuit[gateIndex][index] = "cnot-down";
          break;
        } else {
          tmpCircuit[i][index] = "connect";
        }
      }
    } else {
      // Found gate above
      tmpCircuit[gateIndex][index] = "cnot-up";
      for (i = qubit; i < gateIndex; i++) {
        tmpCircuit[i][index] = "connect";
      }
      i++;
      while ()// TODO: remove flashing trigopts
      i = qubit;
    }
    tmpCircuit[qubit][index] = "trig";
    i = qubit + 1;
    while (tmpCircuit[i][index] )
    this.setState({ circuit: tmpCircuit });
  }

  // Callback for deleting a gate
  onDeleteGate(qubit, index, isMultiGate) {
    let tmpCircuit = this.state.circuit;
    tmpCircuit[qubit][index] = null;
    // Remove triggers, connections, and trigger option points if CNOT deleted
    if (isMultiGate) {
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

  // Callback for resetting circuit
  onResetCircuit() {
    this.setState({
      circuit: JSON.parse(JSON.stringify(defaultCircuit)),
    });
  }

  // Callback for adding qubit line
  onAddQubit() {
    var tmpCircuit = this.state.circuit;
    if (tmpCircuit.length < MAX_QUBITS) {
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
        null,
        null,
        null,
        null,
        null,
        "measure",
      ]);
    }
    this.setState({ circuit: tmpCircuit });
  }

  // Callback for removing last qubit line
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
                onResetCircuit={this.onResetCircuit.bind(this)}
                onAddQubit={this.onAddQubit.bind(this)}
                onRemoveQubit={this.onRemoveQubit.bind(this)}
              />
              <hr />
              <Measure
                circuit={JSON.parse(JSON.stringify(this.state.circuit))}
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
