# CO & MP: Unit I — Computer Evolution and Performance (Q&A)

---

## Q1. Difference between Von Neumann and Harvard Architecture (7 Marks)

*   **Von Neumann Architecture**:
    *   Proposed by John Von Neumann in 1945.
    *   Based on the stored-program computer concept.
    *   Program instructions and data share the same memory.
    *   Uses a single system bus to fetch both.
*   **Harvard Architecture**:
    *   Developed for the Harvard Mark I relay computer.
    *   Keeps instructions and data in separate memory units.
    *   Uses independent, dedicated buses to access them.

---

### Key Differences & Detailed Theory (Write in Exam):

*   **Memory Structure**:
    *   *Von Neumann*: Uses a single memory space for code and data.
    *   *Von Neumann*: CPU cannot tell them apart by location.
    *   *Harvard*: Uses separate Program Memory and Data Memory.
    *   *Harvard*: They have distinct physical address spaces.
*   **Bus System**:
    *   *Von Neumann*: Uses one shared bus for address and data.
    *   *Von Neumann*: Only one memory access can happen at a time.
    *   *Harvard*: Uses separate buses for instructions and data.
    *   *Harvard*: CPU can access code and data at the same time.
*   **The Von Neumann Bottleneck**:
    *   *Definition*: CPU cannot read/write data while fetching instructions.
    *   *Cause*: Shared bus limits concurrent memory access.
    *   *Consequence*: CPU must wait for memory operations.
    *   *Consequence*: This slows down overall processing speed.
*   **Harvard Fix**:
    *   *Concept*: Harvard architecture solves the bottleneck.
    *   *Action*: CPU fetches code and reads data in the same cycle.
*   **Pipelining Support**:
    *   *Von Neumann*: Hard to implement pipelining.
    *   *Von Neumann*: Code and data fetch stages conflict on the bus.
    *   *Harvard*: Highly compatible with pipelining.
    *   *Harvard*: Next instruction is fetched while current runs.
*   **Design Complexity & Cost**:
    *   *Von Neumann*: Simple hardware design.
    *   *Von Neumann*: Fewer CPU pins are required.
    *   *Von Neumann*: Cheaper to manufacture.
    *   *Harvard*: Complex hardware design.
    *   *Harvard*: Requires double the bus pins on the CPU.
    *   *Harvard*: More expensive to build.
*   **Typical Applications**:
    *   *Von Neumann*: General-purpose computers like laptops and PCs.
    *   *Harvard*: Microcontrollers (like 8051 and AVR).
    *   *Harvard*: High-speed Digital Signal Processors (DSPs).

---

### Block Diagrams (Draw in Exam):

```
  VON NEUMANN (Shared Bus)              HARVARD (Dual Bus)
  ┌──────────┐   ┌───────────┐          ┌─────────┐   ┌─────────┐
  │          │   │  SINGLE   │          │ PROG    │   │ DATA    │
  │   CPU    ├─►│  MEMORY   │          │ MEMORY  │   │ MEMORY  │
  │          │   │(Data+Code)│          └────┬────┘   └────┬────┘
  └──────────┘   └───────────┘               │Code Bus     │Data Bus
                                             ▼             ▼
                                        ┌───────────────────────┐
                                        │         CPU           │
                                        └───────────────────────┘
```

---

### Comparison Table:

| Feature | Von Neumann | Harvard |
| :--- | :--- | :--- |
| **Memory space** | Shared for data & code | Separate for data & code |
| **Bus system** | Single shared bus | Dual independent buses |
| **Pipelining** | Hard to implement | Easy and efficient |
| **CPU Pin Count** | Lower | Higher |
| **Execution Speed**| Slower | Faster |
| **Applications** | Laptops, Desktops | Microcontrollers, DSPs |

---
---

## Q2. Draw and Explain the Hardware Implementation of Booth's Algorithm (6 Marks)

*   **Core Purpose**:
    *   Multiplies signed binary numbers.
    *   Works directly in 2's complement form.
    *   No separate sign-handling logic is needed.
    *   Speeds up operations by grouping bits.

---

### Hardware Components & Detailed Roles (Write in Exam):

*   **Register M (Multiplicand)**:
    *   Holds the multiplicand value.
    *   Stores n bits of data.
    *   Remains constant during the run.
*   **Register Q (Multiplier)**:
    *   Holds the multiplier value.
    *   Stores n bits of data.
    *   LSB is denoted as Q0.
    *   Bits are checked to decide steps.
*   **Register A (Accumulator)**:
    *   Initialized to all zeros.
    *   Holds partial products during steps.
    *   Combined with Q for final 2n-bit result.
*   **Flip-Flop Q-1**:
    *   Stores a single bit.
    *   Initialized to 0.
    *   Placed next to Q0 LSB.
    *   Helps detect 0-to-1 or 1-to-0 transitions.
*   **ALU (Arithmetic Logic Unit)**:
    *   n-bit parallel adder-subtracter.
    *   Performs addition (A + M).
    *   Performs subtraction (A - M).
    *   Uses 2's complement addition for subtraction.
*   **Sequence Counter (SC)**:
    *   Initialized to bit size n.
    *   Decrements after each shift step.
    *   Stops the run when it reaches 0.
*   **Control Logic**:
    *   Reads bits Q0 and Q-1.
    *   Decides whether to add, subtract, or shift.
    *   Controls shift operations.

---

### Step-by-Step Operation Flow:

1.  **Check Bits**: Control logic reads Q0 and Q-1:
    *   *00* or *11*: Do not add or subtract. Just shift.
    *   *01*: Add multiplicand to A (A <- A + M).
    *   *10*: Subtract multiplicand from A (A <- A - M).
2.  **Shift**: Perform Arithmetic Shift Right (ASHR) on [A, Q, Q-1].
    *   *Rule*: Shift right by 1 bit.
    *   *Rule*: Keep the MSB of A in place to preserve the sign.
3.  **Count Down**: Decrement the counter (SC = SC - 1).
    *   *Loop*: If SC > 0, repeat from Step 1.
    *   *Stop*: If SC = 0, product is in [A][Q].

---

### Hardware Diagram (Draw in Exam):

```
               ┌──────────────────────────────────┐
               │          CONTROL LOGIC            │
               │      (Checks Q0 and Q-1 bits)    │
               └──────┬──────────────┬─────────────┘
                      │              │
      ┌─────────┐  ┌──▼──────────────▼┐
      │Register │  │      A L U       │
      │    M    │─►│  (Add / Sub)     │
      └─────────┘  └────────┬─────────┘
                            │
                            ▼
                  ┌─────────────────┐   ┌─────────┐   ┌─────┐
                  │   Register A    │──►│Register │──►│Q-1  │
                  │  (Accumulator)  │   │    Q    │   │(FF) │
                  └─────────────────┘   └─────────┘   └─────┘
                      ▲                                   │
                      │◄──── ASHR (Shift Right) ──────────┘
```

---
---

## Q3. Discuss the Limitation of a Ripple Carry Adder and Explain How a Carry Look-Ahead (CLA) Adder Improves Speed (7 Marks)

*   **RCA**:
    *   Basic binary adder.
    *   Full Adders are linked in a chain.
    *   Carry-out of one stage goes to carry-in of the next.
*   **CLA**:
    *   Advanced parallel binary adder.
    *   Calculates carry bits instantly using logic gates.
    *   Removes sequential propagation delays.

---

### Limitations of Ripple Carry Adder (RCA):

*   **Carry Propagation Delay**:
    *   Each Full Adder must wait for the previous carry-out.
    *   Sum cannot be calculated without the incoming carry.
*   **Linear Delay O(n)**:
    *   Delay increases linearly with bit size.
    *   Total delay is n x delta_t.
*   **Performance Bottleneck**:
    *   Slows down execution in large ALUs (32 or 64 bits).
    *   Limits maximum CPU clock frequency.

```
  RCA Chain: C0 ──► [FA0] ──C1──► [FA1] ──C2──► [FA2] ──► C3 (Slow!)
```

---

### How Carry Look-Ahead (CLA) Improves Speed:

Calculates carries in parallel using two helper signals:
1.  **Generate (Gi)**: Generates a carry when both inputs are 1.
    *   Equation: Gi = Ai · Bi
2.  **Propagate (Pi)**: Passes carry when at least one input is 1.
    *   Equation: Pi = Ai ⊕ Bi

**The Parallel Carry Logic:**
Carries are calculated directly from C0 and inputs:
*   C1 = G0 + P0 · C0
*   C2 = G1 + P1 · G0 + P1 · P0 · C0
*   C3 = G2 + P2 · G1 + P2 · P1 · G0 + P2 · P1 · P0 · C0
*   C4 = G3 + P3 · G2 + P3 · P2 · G1 + P3 · P2 · P1 · G0 + P3 · P2 · P1 · P0 · C0

**Why it is faster:**
*   All Gi and Pi are generated in 1 gate delay.
*   All carries (C1 - C4) are calculated in 2 gate delays.
*   Total delay is constant at O(1) regardless of bit width.
*   *Practical Limit*: Gates require too many inputs as bits grow.
*   *Design Note*: CLA blocks are usually 4-bit and connected one after another in a chain.

---

### Comparison:

| Feature | Ripple Carry Adder (RCA) | Carry Look-Ahead (CLA) |
| :--- | :--- | :--- |
| **Carry generation** | Sequential in a chain | Parallel at the same time |
| **Worst-case delay** | Linear O(n) | Constant O(1) |
| **Hardware complexity**| Low (few simple gates) | High (many complex gates) |
| **Speed** | Slower | Extremely Fast |
| **Ideal Use** | Low-speed devices | High-speed ALUs in CPUs |

---
---

## Q4. Multiply Using Booth's Algorithm: Multiplicand = +3, Multiplier = -4 (8 Marks)

**Data Setup:**
*   Multiplicand (M) = +3 -> **0011**
*   -M = -3 -> **1101**
*   Multiplier (Q) = -4 -> **1100**
*   Initialize: A = 0000, Q-1 = 0, SC = 4

---

### Trace Table (Write in Exam):

| Cycle | Accumulator (A) | Multiplier (Q) | Q-1 | Q0 Q-1 | Action | SC |
| :---: | :---: | :---: | :---: | :---: | :--- | :---: |
| **Init** | 0000 | 1100 | 0 | — | Initialize registers | 4 |
| **1** | 0000 | 1100 | 0 | **00** | No operation. Just shift. | — |
| | 0000 | 0110 | 0 | — | **ASHR** (Shift right, keep sign) | 3 |
| **2** | 0000 | 0110 | 0 | **00** | No operation. Just shift. | — |
| | 0000 | 0011 | 0 | — | **ASHR** (Shift right, keep sign) | 2 |
| **3** | 0000 | 0011 | 0 | **10** | Subtract M: A <- A + (-M) | — |
| | 1101 | 0011 | 0 | — | A = 0000 + 1101 = 1101 | — |
| | 1110 | 1001 | 1 | — | **ASHR** (Shift right, keep sign) | 1 |
| **4** | 1110 | 1001 | 1 | **11** | No operation. Just shift. | — |
| | 1111 | 0100 | 1 | — | **ASHR** (Shift right, keep sign) | 0 |

**Result Extraction:**
*   Combined Register [A][Q] -> **1111 0100**
*   Convert to decimal (2's complement of 1111 0100):
    *   Invert: 0000 1011
    *   Add 1: 0000 1100 (12 in decimal)
*   **Result = -12** (Correct since +3 x -4 = -12).

---

### Extra Practice: +5 x -3 (5-bit Booth's)
*   M = +5 -> **00101**
*   -M = -5 -> **11011**
*   Q = -3 -> **11101**

| Cycle | Accumulator (A) | Multiplier (Q) | Q-1 | Q0 Q-1 | Action | SC |
| :---: | :---: | :---: | :---: | :---: | :--- | :---: |
| **Init** | 00000 | 11101 | 0 | — | Initialize registers | 5 |
| **1** | 00000 | 11101 | 0 | **10** | Subtract M: A <- A - M | — |
| | 11011 | 11101 | 0 | — | A = 00000 + 11011 = 11011 | — |
| | 11101 | 11110 | 1 | — | **ASHR** | 4 |
| **2** | 11101 | 11110 | 1 | **01** | Add M: A <- A + M | — |
| | 00010 | 11110 | 1 | — | A = 11101 + 00101 = 00010 | — |
| | 00001 | 01111 | 0 | — | **ASHR** | 3 |
| **3** | 00001 | 01111 | 0 | **10** | Subtract M: A <- A - M | — |
| | 11100 | 01111 | 0 | — | A = 00001 + 11011 = 11100 | — |
| | 11110 | 00111 | 1 | — | **ASHR** | 2 |
| **4** | 11110 | 00111 | 1 | **11** | No operation. Just shift. | — |
| | 11111 | 00011 | 1 | — | **ASHR** | 1 |
| **5** | 11111 | 00011 | 1 | **11** | No operation. Just shift. | — |
| | 11111 | 10001 | 1 | — | **ASHR** | 0 |

*   Result: [A][Q] -> **11111 10001** -> **-15** (Verified).

---
---

## Q5. Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus (7 Marks)

*   **System Bus**:
    *   Conductive pathway made of physical wires.
    *   Connects the CPU, memory, and I/O devices.
    *   Coordinates addressing, data transfer, and timing.

---

### The Three Main Buses & Detailed Signals (Write in Exam):

*   **Address Bus**:
    *   *Direction*: One-way only (from CPU to memory/IO).
    *   *Function*: Carries the physical address to access.
    *   *Size*: Number of lines sets max memory capacity.
    *   *Formula*: Max memory locations = 2^n.
    *   *Example*: 8086 has 20 lines to address 1 MB.
*   **Data Bus**:
    *   *Direction*: Two-way (data flows to/from CPU).
    *   *Function*: Carries data values and instructions.
    *   *Size*: Width sets how many bits transfer at once.
    *   *Example*: 8086 has a 16-bit wide data bus.
*   **Control Bus**:
    *   *Direction*: Two-way.
    *   *Function*: Carries command and timing signals.
    *   *Purpose*: Prevents bus conflicts.
    *   *Key Signals*:
        *   **MEMR / MEMW**: Commands memory read or write.
        *   **IOR / IOW**: Commands I/O port read or write.
        *   **INTR / INTA**: Handles interrupts.
        *   **READY**: Tells CPU to insert wait states.
        *   **CLK / RESET**: Provides clock and system reset.

---

### Block Diagram (Draw in Exam):

```
  ┌──────────────────────────────────────────────────────────────┐
  │                         SYSTEM BUS                           │
  │   ┌────────────────────────────────────────────────────────┐ │
  │   │  ADDRESS BUS (One-Way: CPU ──► Memory / IO)            │ │
  │   ├────────────────────────────────────────────────────────┤ │
  │   │  DATA BUS    (Two-Way: CPU ◄══► Memory / IO)           │ │
  │   ├────────────────────────────────────────────────────────┤ │
  │   │  CONTROL BUS (Two-Way: CPU ◄══► Memory / IO)           │ │
  │   └────────────────────────────────────────────────────────┘ │
  └─────────┬───────────────────┬───────────────────┬────────────┘
            ▼                   ▼                   ▼
      ┌───────────┐       ┌───────────┐       ┌───────────┐
      │    CPU    │       │  MEMORY   │       │I/O Devices│
      └───────────┘       └───────────┘       └───────────┘
```
