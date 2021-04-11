import React, { Component } from "react";
import Circuit from "./Circuit";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";

class App extends Component {
  render() {
    return (
      <>
        <Toolbar />
        <Sidebar />
        <div className="container">
          <div>
            <h2>New Program</h2>
            <hr />
            <h3>Gates:</h3>
            <hr />
            <h3>Circuit:</h3>
            <Circuit />
            <hr />
            <h3>Measurement:</h3>
          </div>
        </div>
      </>
    );
  }
}

export default App;
