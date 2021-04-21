import React, { Component } from "react";
import Circuit from "./Circuit";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import GateMenu from "./GateMenu";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { options: { showGateDrop: false, showGateMatrix: false } };
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
          <DragDropContext>
            <div>
              <h2>New Program &gt;</h2>
              <hr />
              <h3>Gates:</h3>
              <GateMenu options={this.state.options} />
              <hr />
              <h3>Circuit:</h3>
              <Circuit options={this.state.options} />
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
