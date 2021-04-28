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

  evalHGate(j, stateVector) {
    const N = this.props.circuit.length;
    for (var k = 0; k < Math.pow(2, j); k++) {
      for (var l = 0; l < Math.pow(2, N - j - 1); l++) {
        const index0 = l + k * Math.pow(2, N - j);
        const index1 = l + k * Math.pow(2, N - j) + Math.pow(2, N - j - 1);
        const change = this.redistribute(
          stateVector[index0],
          stateVector[index1]
        );
        stateVector[index0] = change.a;
        stateVector[index1] = change.b;
        return stateVector;
      }
    }
  }

  evalTGate(j, tmpStateVector) {
    const N = this.props.circuit.length;
    for (var k = 0; k < Math.pow(2, j); k++) {
      for (var l = 0; l < Math.pow(2, N - j - 1); l++) {
        const index = l + k * Math.pow(2, N - j) + Math.pow(2, N - j - 1);
        const change = this.phaseTransition(tmpStateVector[index]);
        tmpStateVector[index] = change;
        return tmpStateVector;
      }
    }
  }

  // m = trigger, n = not
  evalCNOTGate(m, n, tmpStateVector) {
    const N = this.props.circuit.length;
    const u = Math.min(m, n);
    const v = Math.max(m, n);
    for (var x = 0; x < Math.pow(2, u); x++) {
      for (var y = 0; y < Math.pow(2, v - u - 1); y++) {
        for (var z = 0; z < Math.pow(2, N - v - 1); z++) {
          const index0 =
            x * Math.pow(2, N - u) +
            y * Math.pow(2, N - v) +
            z +
            Math.pow(2, N - m - 1);
          const index1 =
            x * Math.pow(2, N - u) +
            y * Math.pow(2, N - v) +
            z +
            Math.pow(2, N - m - 1) +
            Math.pow(2, N - n - 1);
          const change = this.swap(
            tmpStateVector[index0],
            tmpStateVector[index1]
          );
          tmpStateVector[index0] = change.a;
          tmpStateVector[index1] = change.b;
        }
      }
    }
    return tmpStateVector;
  }

  evaluateCircuit() {
    console.log(this.props.circuit);
    // Initialize state vector
    const N = this.props.circuit.length;
    var tmpStateVector = [];
    tmpStateVector.push(1);
    for (var i = 1; i < Math.pow(2, N); i++) {
      tmpStateVector.push(0);
    }

    // Column-major traversal
    // i = gate number, j = qubit number
    for (i = 0; i < this.props.circuit[0].length; i++) {
      let foundCNOT = false;
      var k;
      for (var j = 0; j < this.props.circuit.length; j++) {
        switch (this.props.circuit[j][i]) {
          case "h":
            tmpStateVector = this.evalHGate(j, tmpStateVector);
            break;
          case "t":
            tmpStateVector = this.evalTGate(j, tmpStateVector);
            break;
          case "trig":
            if (foundCNOT) break;
            foundCNOT = true;
            for (k = j + 1; k < this.props.circuit.length; k++) {
              if (
                this.props.circuit[k][i] === "cnotUp" ||
                this.props.circuit[k][i] === "cnotDown"
              ) {
                tmpStateVector = this.evalCNOTGate(j, k, tmpStateVector);
                break;
              }
            }
            break;
          case "cnotUp":
            if (foundCNOT) break;
            foundCNOT = true;
            for (k = j + 1; k < this.props.circuit.length; k++) {
              if (this.props.circuit[k][i] === "trig") {
                tmpStateVector = this.evalCNOTGate(k, j, tmpStateVector);
                break;
              }
            }
            break;
          case "cnotDown":
            if (foundCNOT) break;
            foundCNOT = true;
            for (k = j + 1; k < this.props.circuit.length; k++) {
              if (this.props.circuit[k][i] === "trig") {
                tmpStateVector = this.evalCNOTGate(k, j, tmpStateVector);
                break;
              }
            }
            break;
          default:
            break;
        }
      }
    }
    console.log(tmpStateVector);
    this.setState({
      stateVector: tmpStateVector,
    });
  }

  componentDidMount() {
    this.evaluateCircuit();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.circuit !== this.props.circuit) {
      this.evaluateCircuit();
    }
  }

  render() {
    const qubits = [];
    for (var i = 0; i < this.props.circuit.length; i++) {
      qubits.push(
        <strong key={i}>
          q<sub>{i}</sub>
        </strong>
      );
    }
    const states = [];
    for (i = 0; i < Math.pow(2, this.props.circuit.length); i++) {
      states.push(
        <div key={i}>
          {(i >>> 0).toString(2).padStart(3, "0").split("").join(" ") +
            ": " +
            (this.state.stateVector[i] !== undefined
              ? math.round(this.state.stateVector[i], 3)
              : "???")}
        </div>
      );
    }
    return (
      <div className="measure">
        <h4>Statevector:</h4>
        <div>{qubits}</div>
        {states}
      </div>
    );
  }
}

export default Measure;
