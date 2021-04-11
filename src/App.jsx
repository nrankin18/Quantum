import React, { Component } from "react";
import Circuit from "./Circuit";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { options: { showGateDrop: false } };
  }

  onSetOption(options) {
    this.setState({ options });
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
          <div>
            <h2>New Program</h2>
            <hr />
            <h3>Gates:</h3>
            <hr />
            <h3>Circuit:</h3>
            <Circuit options={this.state.options} />
            <hr />
            <h3>Measurement:</h3>
          </div>
        </div>
      </>
    );
  }
}

export default App;
