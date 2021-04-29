import React, { Component } from "react";
import * as math from "mathjs";
import "./style.css";
import seedrandom from "seedrandom";

// This component calculates and displays the output of the circuit
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
      a: math.evaluate("1/sqrt(2)*((" + a + ")+(" + b + "))"),
      b: math.evaluate("1/sqrt(2)*((" + a + ")-(" + b + "))"),
    };
  }

  // a = e^(i pi/4)*a
  phaseTransition(a) {
    return math.evaluate("e^((i*pi)/4)*(" + a + ")");
  }

  // a = i*a
  phaseTransitionS(a) {
    return math.evaluate("i*(" + a + ")");
  }

  // Swaps a and b
  swap(a, b) {
    return { a: b, b: a };
  }

  // Function called when H gate encountered
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
      }
    }
    return stateVector;
  }

  // Function called when T gate encountered
  evalTGate(j, tmpStateVector) {
    const N = this.props.circuit.length;
    for (var k = 0; k < Math.pow(2, j); k++) {
      for (var l = 0; l < Math.pow(2, N - j - 1); l++) {
        const index = l + k * Math.pow(2, N - j) + Math.pow(2, N - j - 1);
        const change = this.phaseTransition(tmpStateVector[index]);
        tmpStateVector[index] = change;
      }
    }
    return tmpStateVector;
  }

  // Function called when S gate encountered
  evalSGate(j, tmpStateVector) {
    const N = this.props.circuit.length;
    for (var k = 0; k < Math.pow(2, j); k++) {
      for (var l = 0; l < Math.pow(2, N - j - 1); l++) {
        const index = l + k * Math.pow(2, N - j) + Math.pow(2, N - j - 1);
        const change = this.phaseTransitionS(tmpStateVector[index]);
        tmpStateVector[index] = change;
      }
    }
    return tmpStateVector;
  }

  // Function called when CNOT gate or trigger encountered
  // m = trigger, n = NOT
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

  // Called when circuit is updated to calculate new output (ignores unconnected CNOT gates)
  evaluateCircuit() {
    console.log("Calculating result of following circuit:", this.props.circuit);

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
      let foundCNOT = false; // Marks if CNOT has already been evaluated (looks for both trigger and CNOT)
      var k;
      for (var j = 0; j < this.props.circuit.length; j++) {
        switch (this.props.circuit[j][i]) {
          case "h":
            tmpStateVector = this.evalHGate(j, tmpStateVector);
            break;
          case "t":
            tmpStateVector = this.evalTGate(j, tmpStateVector);
            break;
          case "s":
            tmpStateVector = this.evalSGate(j, tmpStateVector);
            break;
          case "trig":
            if (foundCNOT) break;
            foundCNOT = true;
            // Search for NOT connection
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
          case "cnotDown":
          case "cnotUp":
            if (foundCNOT) break;
            foundCNOT = true;
            // Search for trigger
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
    console.log("Resulting calculation:", tmpStateVector);
    this.setState({
      stateVector: tmpStateVector,
    });
  }

  // Evaluate circuit on first load
  componentDidMount() {
    this.evaluateCircuit();
  }

  // Evaluate circuit only when circuit updates
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.circuit !== this.props.circuit) {
      this.evaluateCircuit();
    }
  }

  render() {
    // Generate list of qubit names
    const qubits = [];
    qubits.push(
      <strong key={0}>
        &nbsp;q<sub>0</sub>
      </strong>
    );
    for (var i = 1; i < this.props.circuit.length; i++) {
      qubits.push(
        <strong key={i}>
          q<sub>{i}</sub>
        </strong>
      );
    }

    // Generate statevector
    const states = [];
    for (i = 0; i < Math.pow(2, this.props.circuit.length); i++) {
      states.push(
        <div key={i}>
          |
          {(i >>> 0)
            .toString(2)
            .padStart(this.props.circuit.length, "0")
            .split("")
            .join(" ") +
            "⟩: " +
            (this.state.stateVector[i] !== undefined
              ? math.round(this.state.stateVector[i], 3)
              : "???")}
        </div>
      );
    }

    // Generate probabilities
    const probabilities = [];
    const outcomes = []; // List of 100 states distributed by probability of occuring
    for (i = 0; i < Math.pow(2, this.props.circuit.length); i++) {
      var probability;
      if (this.state.stateVector[i] !== undefined) {
        const re = Math.pow(math.re(this.state.stateVector[i]), 2);
        const im = Math.pow(math.im(this.state.stateVector[i]), 2);
        probability = math.round(re + im, 3);
        // Populate outcome array
        const probabilityCount = probability * 100;
        for (var j = 0; j < probabilityCount; j++) {
          outcomes.push(
            (i >>> 0).toString(2).padStart(this.props.circuit.length, "0")
          );
        }
      } else probability = "???";
      probabilities.push(
        <div key={i}>
          |
          {(i >>> 0)
            .toString(2)
            .padStart(this.props.circuit.length, "0")
            .split("")
            .join(" ") +
            "⟩: " +
            (this.state.stateVector[i] !== undefined ? probability : "???")}
        </div>
      );
    }

    // Determine random outcome
    var seed = seedrandom(this.props.options.randomSeed);
    const output = outcomes[Math.floor(seed() * outcomes.length)];

    const qubitOutput = [];
    for (i = 0; i < this.props.circuit.length; i++) {
      qubitOutput.push(
        <div className="output">
          <strong key={i}>
            q<sub>{i}</sub>:
          </strong>
          <span>{(output + "").charAt(i)}</span>
          <br />
        </div>
      );
    }

    return (
      <div className="measure">
        <div className="outcome">
          <h3>Measurement:</h3>
          {qubitOutput}
        </div>
        <div className={this.props.options.showStatevector ? "" : "hidden"}>
          <h3>Statevector:</h3>
          <div>{qubits}</div>
          {states}
        </div>
        <div className={this.props.options.showStatevector ? "hidden" : ""}>
          <h3>Probability:</h3>
          <div>{qubits}</div>
          {probabilities}
        </div>
      </div>
    );
  }
}

export default Measure;
