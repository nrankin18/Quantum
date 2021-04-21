import React, { Component } from "react";
import "./style.css";
import { InlineMath } from "react-katex";

class Gate extends Component {
  render() {
    switch (this.props.type) {
      case "cnot":
        return (
          <div
            className="gate cnot noselect"
            {...this.props}
            ref={this.props.innerRef}
          >
            CNOT
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <InlineMath math="\begin{bmatrix}1&0&0&0\\ 0&1&0&0\\ 0&0&0&1\\ 0&0&1&0\end{bmatrix}" />
            </span>
          </div>
        );
      case "h":
        return (
          <div
            className="gate h noselect"
            {...this.props}
            ref={this.props.innerRef}
          >
            H
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <InlineMath math="\frac1{\sqrt2}\begin{bmatrix}1&1\\ 1&-1\end{bmatrix}" />
            </span>
          </div>
        );
      case "t":
        return (
          <div
            className="gate t noselect"
            {...this.props}
            ref={this.props.innerRef}
          >
            T
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <InlineMath math="\begin{bmatrix}1&0\\ 0&e^{i\pi /4}\end{bmatrix}" />
            </span>
          </div>
        );
      default:
        return null;
    }
  }
}

export default Gate;
