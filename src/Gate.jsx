import React, { Component } from "react";
import "./style.css";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

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
      case "cnotUp":
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
            <span className="cnotUp" />
          </div>
        );
      case "cnotDown":
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
            <span className="cnotDown" />
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
      case "trigopt":
        return (
          <div
            className="gate trigopt noselect"
            {...this.props}
            ref={this.props.innerRef}
          >
            <div
              onClick={(e) =>
                this.props.onSelectTrigger(this.props.qubit, this.props.index)
              }
            />
          </div>
        );
      case "trig":
        return (
          <div
            className="gate trig noselect"
            {...this.props}
            ref={this.props.innerRef}
          >
            <div />
          </div>
        );
      case "connect":
        return (
          <div
            className="gate connect noselect"
            {...this.props}
            ref={this.props.innerRef}
          >
            <div />
          </div>
        );
      default:
        return null;
    }
  }
}

export default Gate;
