# CO & MP: Unit I — Computer Evolution and Performance (Q&A)

---

## Q1. Difference between Von Neumann and Harvard Architecture (7 Marks)

| Comparison Parameter | Von Neumann Architecture | Harvard Architecture |
| :--- | :--- | :--- |
| **1. Memory Space** | Unified memory for data and instructions. | Separate memory blocks for data and instructions. |
| **2. Bus Configuration** | Shared system bus for data and code access. | Independent buses for data and code. |
| **3. Execution Speed** | Slower due to bus bottlenecks (serializing access). | Faster due to parallel code and data fetches. |
| **4. Pipelining** | Difficult to implement due to bus conflicts. | Simple and highly efficient pipelining support. |
| **5. Hardware Complexity**| Simple CPU design with lower pin count. | Complex CPU design with double the bus pins. |
| **6. System Cost** | Lower cost due to single memory block. | Higher cost due to dual memory and buses. |
| **7. Security** | Lower as data can overwrite code. | Higher as code space is write-protected. |
| **8. Memory Use** | Efficient as unused space is shared. | Rigid as program space cannot hold data. |
| **9. Typical Device** | General-purpose desktops and laptops. | High-speed DSPs and microcontrollers. |

---
---

## Q2. Draw and Explain the Hardware Implementation of Booth's Algorithm (6 Marks)

### Definition
 Booth's hardware performs signed binary multiplication directly on two's complement numbers using registers, shift control logic, and an adder-subtractor unit.

### Diagram
```
            ┌─────────┐  ┌──────────────┐
            │Register │  │  n-Bit ALU   │
            │   M     │─►│ (Add / Sub)  │
            └─────────┘  └──────┬───────┘
                                ▼
                   ┌──────────────────┐   ┌─────────┐   ┌───────┐
                   │   Register A     │──►│Register │──►│Flip-  │
                   │  (Accumulator)   │   │  Q      │   │Flop   │
                   └──────────────────┘   └─────────┘   └───────┘
```

### Components
*   **Register M** : Stores the n-bit multiplicand value throughout the multiplication.
*   **Register Q** : Stores the multiplier and performs right shifts during execution.
*   **Register A** : Holds partial product bits and serves as the accumulator.
*   **Flip-Flop Q_-1** : Stores the single bit shifted out from Q_0 to check transitions.
*   **n-Bit ALU** : Performs addition or subtraction on Registers A and M.
*   **Sequence Counter (SC)** : Tracks the number of arithmetic cycles remaining.

### Working
*   Initialize A = 0000, Q_-1 = 0, and load multiplicand into M and multiplier into Q.
*   Inspect the least significant multiplier bit Q_0 and Flip-Flop Q_-1.
*   Subtract M from A (A ← A - M) for bit state 10, or add M (A ← A + M) for 01.
*   Do no arithmetic operation for states 00 or 11.
*   Perform an Arithmetic Shift Right (ASHR) on combined [A, Q, Q_-1] and decrement SC.
*   Stop the execution cycle when the counter (SC) reaches zero.

---
---

## Q3. Discuss the Limitation of a Ripple Carry Adder and Explain How a Carry Look-Ahead (CLA) Adder Improves Speed (7 Marks)

### Definition
A Ripple Carry Adder adds binary numbers using serial full adders, whereas a Carry Look-Ahead Adder computes all carry bits in parallel to eliminate sequential delay.

### Diagram
```
  FA0 ──C1──► FA1 ──C2──► FA2 ──C3──► FA3 ──C4 (Ripple Carry Adder)
  
  [ Parallel Carry Logic Block ] ── C1, C2, C3, C4 (Carry Look-Ahead)
```

### Ripple Carry Adder Limitations
*   **Propagation Delay**: The carry bit must propagate sequentially through every stage from LSB to MSB.
*   **Linear Delay complexity**: The total delay increases linearly (O(n)) with the number of adder bits.
*   **Speed Bottleneck**: Restricts the maximum clock frequency in large processing units.

### Carry Look-Ahead Speed Improvement
*   **Intermediate Signals**: Defines Carry Generate (G_i = A_i · B_i) and Propagate (P_i = A_i ⊕ B_i).
*   **Carry Calculations**: Calculates all carries in parallel using Boolean expressions.
*   *Carry Equations*:
    *   C_1 = G_0 + P_0 · C_0
    *   C_2 = G_1 + P_1 · G_0 + P_1 · P_0 · C_0
    *   C_3 = G_2 + P_2 · G_1 + P_2 · P_1 · G_0 + P_2 · P_1 · P_0 · C_0
*   **Constant Delay**: Reduces carry computation delay to a constant O(1) time.

---
---

## Q4. Multiply Using Booth's Algorithm: Multiplicand = +3, Multiplier = -4 (8 Marks)

### Definition
Signed multiplication algorithm that operates directly on two's complement binary numbers using add, subtract, and shift steps.

### Steps
*   Load multiplicand (+3 = `0011`) into M, multiplier (-4 = `1100`) into Q.
*   Clear A = `0000`, Q_-1 = `0`, and set SC = `4`.
*   Check bits [Q_0, Q_-1] in each step to choose the operation.
*   Perform A ← A - M (A + `1101`) for `10` or A ← A + M for `01`.
*   Apply Arithmetic Shift Right (ASHR) on [A, Q, Q_-1] and decrement SC.
*   Repeat until SC = 0, final output is stored in [A, Q].

### Trace Table
- Multiplicand (M) = `0011`, -M = `1101`, Multiplier (Q) = `1100`.

| Cycle | Accumulator (A) | Multiplier (Q) | Q_-1 | Q_0, Q_-1 | Performed Operation | SC |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **Init** | 0000 | 1100 | 0 | - | Clear A, Q_-1 and load registers | 4 |
| **C1** | 0000 | 1100 | 0 | `00` | No arithmetic; perform ASHR | 4 |
| **Shift** | 0000 | 0110 | 0 | - | ASHR [A, Q, Q_-1] | 3 |
| **C2** | 0000 | 0110 | 0 | `00` | No arithmetic; perform ASHR | 3 |
| **Shift** | 0000 | 0011 | 0 | - | ASHR [A, Q, Q_-1] | 2 |
| **C3** | 1101 | 0011 | 0 | `10` | Subtract M: A ← A + (-M) | 2 |
| **Shift** | 1110 | 1001 | 1 | - | ASHR [A, Q, Q_-1] | 1 |
| **C4** | 1110 | 1001 | 1 | `11` | No arithmetic; perform ASHR | 1 |
| **Shift** | 1111 | 0100 | 1 | - | ASHR [A, Q, Q_-1] | 0 |

Final product in [A, Q] is `11110100` (equal to decimal -12).

---
---

## Q5. Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus (7 Marks)

### Definition
A system bus is a set of parallel physical wires that acts as a shared pathway to connect the CPU, memory, and peripheral devices.

### Diagram
```
   ┌───────────┐         ┌──────────┐
   │    CPU    │◄═══════►│  Memory  │
   └─────┬─────┘         └────┬─────┘
  ═══════╧════════════════════╧══════ System Bus (Address, Data, Control)
```

### Address Bus
*   **Direction**: Unidirectional; carries signals from CPU to memory/IO.
*   **Function**: Carries physical address bits to select target memory locations.
*   **Capacity**: Width of the bus determines the maximum addressable memory space.

### Data Bus
*   **Direction**: Bidirectional; transfers signals between CPU and other units.
*   **Function**: Carries machine instructions, constants, and variables.
*   **Performance**: Width determines the number of bits transferred per bus cycle.

### Control Bus
*   **Direction**: Bidirectional; carries timing and commands.
*   **Function**: Coordinates transfers and prevents data collisions on bus lines.
*   **Signals**: Includes read/write requests, ready signals, and interrupts.
