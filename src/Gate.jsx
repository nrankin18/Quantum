import React, { Component } from "react";
import "./style.css";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

// This is the gate component that is rendered on a qubit line
class Gate extends Component {
  render() {
    switch (this.props.type) {
      case "measure":
        return (
          <div
            className={"gate measure"}
            {...this.props}
            ref={this.props.innerRef}
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
          </div>
        );
      case "cnot":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate cnot noselect deletable"
                : "gate cnot noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, true);
            }}
          >
            CNOT
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\begin{bmatrix}1&0&0&0\\ 0&1&0&0\\ 0&0&0&1\\ 0&0&1&0\end{bmatrix}" />
            </span>
          </div>
        );
      case "cnot-up":
      case "cnot-down":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate cnot x noselect deletable"
                : "gate cnot x noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, true);
            }}
          >
            X
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\begin{bmatrix}0&1\\ 1&0\end{bmatrix}" />
            </span>
            <span className={this.props.type} />
          </div>
        );
      case "h":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate h noselect deletable"
                : "gate h noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, false);
            }}
          >
            H
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\frac1{\sqrt2}\begin{bmatrix}1&1\\ 1&-1\end{bmatrix}" />
            </span>
          </div>
        );
      case "t":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate t noselect deletable"
                : "gate t noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, false);
            }}
          >
            T
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\begin{bmatrix}1&0\\ 0&e^{i\pi /4}\end{bmatrix}" />
            </span>
          </div>
        );
      case "s":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate s noselect deletable"
                : "gate s noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, false);
            }}
          >
            S
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\begin{bmatrix}1&0\\ 0&i\end{bmatrix}" />
            </span>
          </div>
        );
      case "z":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate z noselect deletable"
                : "gate z noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, false);
            }}
          >
            Z
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\begin{bmatrix}1&0\\ 0&-1\end{bmatrix}" />
            </span>
          </div>
        );
      case "x":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate x noselect deletable"
                : "gate x noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, false);
            }}
          >
            X
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\begin{bmatrix}0&1\\ 1&0\end{bmatrix}" />
            </span>
          </div>
        );
      case "y":
        return (
          <div
            className={
              this.props.onDelete
                ? "gate y noselect deletable"
                : "gate y noselect"
            }
            {...this.props}
            ref={this.props.innerRef}
            onDoubleClick={(e) => {
              if (this.props.onDelete)
                this.props.onDelete(this.props.qubit, this.props.index, false);
            }}
          >
            Y
            <span
              className={
                this.props.options.showGateMatrix ? "gate-tooltip" : "hidden"
              }
            >
              <BlockMath math="\begin{bmatrix}0&-i\\ i&0\end{bmatrix}" />
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
