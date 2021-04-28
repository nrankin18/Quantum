import React, { Component } from "react";
import * as math from "mathjs";
import "./style.css";

class Measure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateVector: [],
    };
  }

  // a = 1/sqrt(2)*(a+b)
  // b = 1/sqrt(2)*(a-b)
  redistribute(a, b) {
    return {
      a: math.evaluate("1/sqrt(2)*(" + a + "+" + b + ")"),
      b: math.evaluate("1/sqrt(2)*(" + a + "-" + b + ")"),
    };
  }

  // a = e^(i pi/4)*a
  phaseTransition(a) {
    return math.evaluate("e^(i*pi/4)*" + a);
  }

  swap(a, b) {
    return { a: b, b: a };
  }

  evalHGate(j) {
    const N = this.props.circuit.length;
    for (var k = 0; k < Math.pow(2, j); k++) {
      for (var l = 0; l < Math.pow(2, N - j - 1); l++) {
        const index0 = l + k * Math.pow(2, N - j);
        const index1 = l + k * Math.pow(2, N - j) + Math.pow(2, N - j - 1);
        const change = this.redistribute(
          this.state.stateVector[index0],
          this.state.stateVector[index1]
        );
        var tmpStateVector = this.state.stateVector;
        tmpStateVector[index0] = change.a;
        tmpStateVector[index1] = change.b;

        this.setState({ stateVector: tmpStateVector });
      }
    }
  }

  evalTGate(j) {
    const N = this.props.circuit.length;
    for (var k = 0; k < Math.pow(2, j); k++) {
      for (var l = 0; l < Math.pow(2, N - j - 1); l++) {
        const change = this.phaseTransition(
          this.state.stateVector[
            l + k * Math.pow(2, N - j) + Math.pow(2, N - j - 1)
          ]
        );
        var tmpStateVector = this.state.stateVector;
        tmpStateVector[
          l + k * Math.pow(2, N - j) + Math.pow(2, N - j - 1)
        ] = change;
        this.setState({ stateVector: tmpStateVector });
      }
    }
  }

  // m = trigger, n = not
  evalCNOTGate(m, n) {
    const N = this.props.circuit.length;
    const u = Math.min(m, n);
    const v = Math.max(m, n);
    for (var x = 0; x < Math.pow(2, u); x++) {
      for (var y = 0; y < Math.pow(2, v - u - 1); y++) {
        for (var z = 0; z < Math.pow(2, N - v - 1); z++) {
          const change = this.swap(
            this.state.stateVector[
              x * Math.pow(2, N - u) +
                y * Math.pow(2, N - v) +
                z +
                Math.pow(2, N - m - 1)
            ],
            this.state.stateVector[
              x * Math.pow(2, N - u) +
                y * Math.pow(2, N - v) +
                z +
                Math.pow(2, N - m - 1) +
                Math.pow(2, N - n - 1)
            ]
          );

          var tmpStateVector = this.state.stateVector;
          tmpStateVector[
            x * Math.pow(2, N - u) +
              y * Math.pow(2, N - v) +
              z +
              Math.pow(2, N - m - 1)
          ] = change.a;
          tmpStateVector[
            x * Math.pow(2, N - u) +
              y * Math.pow(2, N - v) +
              z +
              Math.pow(2, N - m - 1) +
              Math.pow(2, N - n - 1)
          ] = change.b;
          this.setState({ stateVector: tmpStateVector });
        }
      }
    }
  }

  evaluateCircuit() {
    // Initialize state vector
    const N = this.props.circuit.length;
    var tmpStateVector = [];
    tmpStateVector.push(1);
    for (var i = 1; i < Math.pow(2, N); i++) {
      tmpStateVector.push(0);
    }
    this.setState({ stateVector: tmpStateVector }, () => {
      // Column-major traversal
      // i = gate number, j = qubit number
      for (i = 0; i < this.props.circuit[0].length; i++) {
        for (var j = 0; j < this.props.circuit.length; j++) {
          switch (this.props.circuit[j][i]) {
            case "h":
              this.evalHGate(j);
              break;
            default:
              break;
          }
        }
      }
    });
  }

  render() {
    return (
      <div className="measure">
        <button onClick={() => this.evaluateCircuit()}>MEASURE</button>
      </div>
    );
  }
}

export default Measure;
