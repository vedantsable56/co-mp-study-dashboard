# CO & MP: Unit I — Computer Evolution and Performance (Q&A)

---

## Q1. Difference between Von Neumann and Harvard Architecture (7 Marks)

### Introduction:
*   Von Neumann architecture uses a single shared memory block for instructions and data.
*   Harvard architecture uses separate, independent memory units for instructions and data.

### Comparison Table:

| Comparison Point | Von Neumann | Harvard |
| :--- | :--- | :--- |
| **1. Memory Space** | Shared | Separate |
| **2. Bus System** | Single | Dual |
| **3. Pipelining** | Difficult | Simple |
| **4. CPU Pin Count** | Lower | Higher |
| **5. Execution Speed** | Slower | Faster |
| **6. System Cost** | Lower | Higher |
| **7. Memory Conflict** | Possible | None |
| **8. Target Device** | General computers | Small microcontrollers |

---
---

## Q2. Draw and Explain the Hardware Implementation of Booth's Algorithm (6 Marks)

### Introduction / Definition:
*   Booth's algorithm is used to multiply signed binary numbers.
*   It handles negative numbers directly in two's complement format.
*   This logic avoids the need for separate sign checks.

### Diagram:
```
   ┌─────────┐    ┌─────────┐
   │ Reg M   │    │ Reg A   │◄─── ASHR (Shift)
   └────┬────┘    └────┬────┘
        │   ┌─────┐    │
        └──►│ ALU │◄───┘
            └─────┘
```

### Key Points / Core Theory:
*   **Register M** stores the multiplicand value in signed binary.
*   **Register Q** stores the multiplier value to be processed.
*   **Register A** holds partial product bits during execution steps.
*   **Flip-flop Q-1** helps detect bit transitions in multiplier values.
*   **Control logic** checks Q0 and Q-1 to decide actions.
*   **Arithmetic shifts** preserve the sign bit during right shifts.
*   **Sequence counter** counts down remaining step iterations to zero.

### Simple Real-World Example:
*   A chef multiplies a recipe size using quick scaling steps.
*   Instead of adding repeatedly, they use fast shifting logic.

### Advantages / Applications:
*   Faster than standard shift-and-add multiplication methods.
*   Simplifies arithmetic unit design in computer processors.
*   Operates on positive and negative numbers uniformly.

### Conclusion:
*   Booth's algorithm provides a fast hardware method for signed binary multiplication.
*   It decreases processor delay and hardware overhead.

---
---

## Q3. Discuss the Limitation of a Ripple Carry Adder and Explain How a Carry Look-Ahead (CLA) Adder Improves Speed (7 Marks)

### Introduction:
*   Ripple Carry Adders propagate carries sequentially through each full adder stage.
*   Carry Look-Ahead Adders compute carries in parallel using logic equations.

### Comparison Table:

| Comparison Point | Ripple Carry Adder | Carry Look-Ahead |
| :--- | :--- | :--- |
| **1. Carry Generation** | Sequential | Parallel |
| **2. Operating Speed** | Slower | Faster |
| **3. Hardware Complexity** | Low | High |
| **4. Delay Type** | Linear delay | Constant delay |
| **5. Gate Count** | Fewer gates | More gates |
| **6. System Cost** | Lower | Higher |
| **7. Ideal Use** | Slow devices | Fast processors |
| **8. Bit Scaling** | Low scaling | Hard scaling |

---
---

## Q4. Multiply Using Booth's Algorithm: Multiplicand = +3, Multiplier = -4 (8 Marks)

### Introduction / Definition:
*   Signed multiplication of plus three and minus four using binary logic.
*   The algorithm runs through four iterations to produce the result.

### Diagram:
```
  A = 0000, Q = 1100, Q-1 = 0, M = 0011
```

### Key Points / Core Theory:
*   **Multiplicand value** is plus three represented as zero zero one one.
*   **Two's complement** of multiplicand is one one zero one.
*   **Multiplier value** is minus four represented as one one zero zero.
*   **Initial state** sets accumulator and flip-flop to zero.
*   **Shift operation** moves all bits right by one position.

### Simple Real-World Example:
```
Trace table for +3 times -4:
Cycle | Reg A | Reg Q | Q-1 | Action
Init  | 0000  | 1100  | 0   | Initialize
C1    | 0000  | 0110  | 0   | Shift
C2    | 0000  | 0011  | 0   | Shift
C3    | 1101  | 0011  | 0   | Sub M
      | 1110  | 1001  | 1   | Shift
C4    | 1111  | 0100  | 1   | Shift
Result: 11110100 in binary, which is -12 in decimal.
```

### Advantages / Applications:
*   Verifies hardware multiplication step accuracy for signed values.
*   Eliminates separate binary addition and subtraction overflow logic.
*   Simplifies compiler math checks for basic operations.

### Conclusion:
*   The trace confirms that the final result equals decimal minus twelve.
*   It shows the efficiency of hardware shift operations.

---
---

## Q5. Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus (7 Marks)

### Introduction / Definition:
*   A system bus connects the processor, memory, and input devices.
*   It serves as a shared pathway for digital signal transfers.
*   The bus organizes communication to prevent signal conflicts.

### Diagram:
```
  ┌────────┐     ┌────────┐
  │  CPU   │◄═══►│ Memory │
  └──────┬─┘     └─┬──────┘
         ▼         ▼
  ═══════╧═════════╧══════ System Bus
```

### Key Points / Core Theory:
*   **Address bus** carries memory location addresses from CPU to RAM.
*   **Data bus** transfers actual instruction bytes and data values.
*   **Control bus** carries read and write commands to memory.
*   **Bus width** determines the maximum memory capacity of processors.
*   **Data width** determines how many bits transfer in parallel.

### Simple Real-World Example:
*   A highway system connects different cities in a country.
*   Cars represent data travelling along the designated lanes.

### Advantages / Applications:
*   Decreases system complexity by sharing physical wiring pathways.
*   Standardizes connection layouts for external device compatibility.
*   Simplifies motherboard design for modern computer architectures.

### Conclusion:
*   The system bus provides the primary physical link between computer parts.
*   It coordinates data transfers through dedicated control lines.
