# Quantum Computer Simulator

This React.js quantum computer simulator was created for my Spring 2021 Intro to Quantum Computing (PHYS8760) final project at Boston College. It was developed in less than two weeks, yet is fully functional and implements Hadamard, X, CNOT, SWAP, Y Z, T, and S gates. Up to 25 Gates can be combined per qubit line, with a maximum of 10 qubit lines supported in the simulator. Output is displayed based on a specified randomization seed, or viewed as a probability breakdown or state vector.

## Adding and Removing Gates

To add a gate to the circuit, drag and drop one of the eight available gates from the palette onto a qubit line. Gates with trigger lines (CNOT and SWAP) will begin displaying flashing click points to attach the trigger line to a second qubit. To facilitate easier aligning of gates, toggle on the "Display Gate Drop Locations" option from the right side bar. This will display all available drop locations on qubit lines.

Double clicking a gate will remove it from the qubit.

## Adding and Removing Qubits

Up to 10 qubit lines can be added by clicking the "Add qubit" button below the circuit.

To remove the last qubit, click the "Remove qubit" button below the circuit.

The entire circuit (qubits and gates) can be reset by clicking the "Reset circuit" button.

## Output

The computer's output will automatically be calculated once a gate is added or removed from the circuit. A sample output measurment for each qubit (taken at the end of the line at the permament measurement gate) is displayed under "Measurement:". Note that because of the nature of some quantum circuits, not every measurement of the same circuit will be the same. To control this random factor, a randomization seed may be entered on the right-hand options panel. This seed defaults to the value "2021". 

Output can also be viewed as a probability breakdown. A single Hadamard gate on one quibit, for example, will display a probability of |0⟩ equal to 0.5, and a probability of |1⟩ also equal to 0.5.

Toggling the "Display Statevector" option will change the probability breakdown to display a quantum state vector. This will show the quantum amplitudes for each computational basis state. More information on quantum statevectors can be found [here](https://en.wikipedia.org/wiki/Quantum_state).

## Additional Options

To view the matrix definition of each gate, toggle on the "Display Gate Matrices" option from the options panel. Now, hovering over a gate will display its associated matrix in a tooltip above.
