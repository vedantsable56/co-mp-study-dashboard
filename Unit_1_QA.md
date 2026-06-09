# CO & MP: Unit I — Computer Evolution and Performance (Q&A)

---

## Q1. Difference between Von Neumann and Harvard Architecture (7 Marks)

*   **Von Neumann Architecture**: A classic computer design proposed by mathematician John Von Neumann in 1945. It is based on the stored-program computer concept where program instructions and data share the **same physical memory** address space and are fetched using the **same shared system bus**.
*   **Harvard Architecture**: A computer design developed for the Harvard Mark I relay computer. It keeps program instructions and data stored in **physically separate memory units** and accesses them via **independent, dedicated buses**.

---

### Key Differences & Detailed Theory (Write in Exam):

*   **Memory Structure**:
    *   *Von Neumann*: Uses a single unified physical memory space to store both code (instructions) and data. The CPU cannot distinguish between instructions and data simply by their location; it depends on the execution phase.
    *   *Harvard*: Uses two separate memory blocks—one for storing instruction codes (Program Memory) and one for storing operand values (Data Memory). They have separate address spaces.
*   **Bus System**:
    *   *Von Neumann*: Uses a single shared system bus (address and data bus) for both instruction fetch and data transfer. Only one memory access can happen at any time.
    *   *Harvard*: Uses two separate sets of buses—a Program Memory bus (address + data) and a Data Memory bus (address + data). This allows the CPU to access code and data in parallel.
*   **The Von Neumann Bottleneck**:
    *   *Detailed Concept*: Because of the shared bus, the CPU cannot read or write data to memory at the same time it is fetching the next instruction. Since CPU execution speeds are orders of magnitude faster than memory access speeds, the CPU is forced to sit idle (wait states) while waiting for memory transfers. This speed mismatch and shared bus conflict is the **Von Neumann Bottleneck**.
    *   *Harvard Mitigation*: Harvard architecture eliminates this bottleneck completely. The CPU can fetch the next instruction from Program Memory and read/write data in Data Memory at the exact same clock cycle.
*   **Pipelining Support**:
    *   *Von Neumann*: Very difficult to implement instruction pipelining because the instruction fetch phase and the data execute write-back phase frequently conflict over the shared bus.
    *   *Harvard*: Highly compatible with **pipelining**, allowing the next instruction to be fetched while the current one is accessing data.
*   **Design Complexity & Cost**:
    *   *Von Neumann*: Simple hardware design. Fewer CPU pins are required, making it cheaper to manufacture.
    *   *Harvard*: Complex hardware design. Requires separate control signals and double the bus pins on the CPU, making it expensive.
*   **Typical Applications**:
    *   *Von Neumann*: Used in general-purpose computers like laptops, PCs, desktops, and mainframes.
    *   *Harvard*: Used in dedicated embedded systems, microcontrollers (like 8051 and AVR), and high-speed Digital Signal Processors (DSPs).

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
| **Memory space** | Unified (Shared for data & code) | Split (Separate for data & code) |
| **Bus system** | Single shared bus | Dual independent buses |
| **Pipelining** | Hard to implement | Easy and efficient |
| **CPU Pin Count** | Lower | Higher (due to separate buses) |
| **Execution Speed** | Slower (due to bus bottleneck) | Faster (due to parallel access) |
| **Applications** | Laptops, Desktops, Servers | Microcontrollers, DSPs |

---
---

## Q2. Draw and Explain the Hardware Implementation of Booth's Algorithm (6 Marks)

*   **Core Purpose**: Booth's algorithm is an efficient method used to multiply signed binary numbers (represented in 2's complement form) without requiring separate sign-handling logic. It speeds up multiplication by grouping consecutive 1s and 0s.

---

### Hardware Components & Detailed Roles (Write in Exam):

*   **Register M (Multiplicand)**: An n-bit register that stores the multiplicand (the number to be multiplied). It remains constant throughout the multiplication.
*   **Register Q (Multiplier)**: An n-bit register that stores the multiplier. Its rightmost bit is denoted as Q0. The multiplier bits are inspected one by one to determine the next arithmetic step.
*   **Register A (Accumulator)**: An n-bit register initialized to all zeros. It holds the partial products during multiplication. At the end of the operation, the combined registers [A][Q] hold the final 2n-bit product.
*   **Flip-Flop Q-1**: A 1-bit register initialized to 0. It sits next to the LSB of Q (Q0) and helps detect transitions between consecutive bits (e.g., 0-to-1 or 1-to-0).
*   **ALU (Arithmetic Logic Unit)**: An n-bit parallel adder-subtracter. It performs the addition (A + M) and subtraction (A - M) operations. Subtraction is performed using 2's complement addition: adding the 2's complement of M to A.
*   **Sequence Counter (SC)**: A down-counter initialized to the bit size n. It decrements after each step and stops the multiplication when it hits 0.
*   **Control Logic**: Monitors the bits Q0 and Q-1 to decide the action (add, subtract, or shift) and coordinates the shifting of registers.

---

### Step-by-Step Operation Flow:

1.  **Check Bits**: The control logic reads the pair Q0 Q-1:
    *   **00** or **11**: No arithmetic operation is performed. Just proceed to shift.
    *   **01**: Add the multiplicand to A (A <- A + M).
    *   **10**: Subtract the multiplicand from A (A <- A - M).
2.  **Shift**: Perform **ASHR (Arithmetic Shift Right)** on the combined registers [A, Q, Q-1] by 1 bit.
    *   *ASHR Rule*: The sign bit (MSB of A) is shifted right but its value is also kept in the MSB position to preserve the sign (+ or -) of the product.
3.  **Count Down**: Decrement the Sequence Counter (SC). If SC > 0, repeat from Step 1. If SC = 0, the final product is stored in the combined registers [A][Q].

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

*   **RCA**: A basic binary adder where Full Adders are linked in a cascade. The carry-out of one stage ripples to the carry-in of the next.
*   **CLA**: An advanced binary adder that calculates all carry bits in parallel instantly using logic gates, removing the sequential delay.

---

### Limitations of Ripple Carry Adder (RCA):

*   **Sequential Carry Propagation**: Each Full Adder must wait for the carry-out of the previous stage before it can calculate its own sum and carry-out.
*   **Linear Time Delay O(n)**: The propagation delay increases linearly with the number of bits. If each stage has a gate delay of delta_t, an n-bit adder has a worst-case delay of n x delta_t.
*   **Performance Bottleneck**: For 32-bit or 64-bit ALUs, the delay becomes too high, slowing down the entire CPU clock frequency.

```
  RCA Chain: C0 ──► [FA0] ──C1──► [FA1] ──C2──► [FA2] ──► C3 (Slow!)
```

---

### How Carry Look-Ahead (CLA) Improves Speed:

Instead of waiting for the carry to ripple, the CLA calculates all carries in parallel using two helper signals:
1.  **Generate (Gi)**: Generates a carry when both input bits are 1.
    *   Equation: Gi = Ai · Bi
2.  **Propagate (Pi)**: Passes (propagates) an incoming carry when at least one input bit is 1.
    *   Equation: Pi = Ai ⊕ Bi

**The Parallel Carry Logic:**
Using Gi and Pi, the carries (Ci) for each stage are computed directly from the initial carry-in (C0) and the inputs:
*   C1 = G0 + P0 · C0
*   C2 = G1 + P1 · G0 + P1 · P0 · C0
*   C3 = G2 + P2 · G1 + P2 · P1 · G0 + P2 · P1 · P0 · C0
*   C4 = G3 + P3 · G2 + P3 · P2 · G1 + P3 · P2 · P1 · G0 + P3 · P2 · P1 · P0 · C0

**Why it is faster:**
*   All Gi and Pi are generated in **1 gate delay**.
*   All carries (C1 - C4) are calculated using 2-level AND-OR gates, which takes only **2 gate delays**.
*   Total delay is constant (**O(1)**), regardless of the number of bits.
*   *Practical Limit (Fan-in)*: As bit size grows, gates need too many inputs. Therefore, CLA adders are usually built in 4-bit blocks and cascaded.

---

### Comparison:

| Feature | Ripple Carry Adder (RCA) | Carry Look-Ahead (CLA) |
| :--- | :--- | :--- |
| **Carry generation** | Sequential (one after another) | Parallel (simultaneous) |
| **Worst-case delay** | Linear O(n) | Constant O(1) |
| **Hardware complexity** | Low (simple gates) | High (requires many complex gates) |
| **Speed** | Slower | Extremely Fast |
| **Ideal Use** | Small counters, low-speed devices | High-speed ALUs in modern CPUs |

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
| **1** | 0000 | 1100 | 0 | **00** | No Op. Just shift. | — |
| | 0000 | 0110 | 0 | — | **ASHR** (Shift right, keep sign bit) | 3 |
| **2** | 0000 | 0110 | 0 | **00** | No Op. Just shift. | — |
| | 0000 | 0011 | 0 | — | **ASHR** (Shift right, keep sign bit) | 2 |
| **3** | 0000 | 0011 | 0 | **10** | Subtract M (A <- A + (-M)) | — |
| | 1101 | 0011 | 0 | — | A = 0000 + 1101 = 1101 | — |
| | 1110 | 1001 | 1 | — | **ASHR** (Shift right, keep sign bit) | 1 |
| **4** | 1110 | 1001 | 1 | **11** | No Op. Just shift. | — |
| | 1111 | 0100 | 1 | — | **ASHR** (Shift right, keep sign bit) | 0 |

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
| **1** | 00000 | 11101 | 0 | **10** | Subtract M (A <- A - M) | — |
| | 11011 | 11101 | 0 | — | A = 00000 + 11011 = 11011 | — |
| | 11101 | 11110 | 1 | — | **ASHR** | 4 |
| **2** | 11101 | 11110 | 1 | **01** | Add M (A <- A + M) | — |
| | 00010 | 11110 | 1 | — | A = 11101 + 00101 = 00010 | — |
| | 00001 | 01111 | 0 | — | **ASHR** | 3 |
| **3** | 00001 | 01111 | 0 | **10** | Subtract M (A <- A - M) | — |
| | 11100 | 01111 | 0 | — | A = 00001 + 11011 = 11100 | — |
| | 11110 | 00111 | 1 | — | **ASHR** | 2 |
| **4** | 11110 | 00111 | 1 | **11** | No Op. Just shift. | — |
| | 11111 | 00011 | 1 | — | **ASHR** | 1 |
| **5** | 11111 | 00011 | 1 | **11** | No Op. Just shift. | — |
| | 11111 | 10001 | 1 | — | **ASHR** | 0 |

*   Result: [A][Q] -> **11111 10001** -> **-15** (Verified).

---
---

## Q5. Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus (7 Marks)

*   **System Bus**: A logical and physical pathway made of parallel conductive wires that connects the major hardware components of a computer (CPU, memory, and I/O devices) to allow data transfer, addressing, and control synchronization.

---

### The Three Main Buses & Detailed Signals (Write in Exam):

*   **Address Bus**:
    *   *Direction*: Unidirectional. Address signals flow **only** from the CPU (or DMA controller) to memory or I/O devices.
    *   *Function*: Carries the physical binary address that specifies the memory location or I/O port the CPU wants to access.
    *   *Key parameter*: The number of address lines determines the maximum memory capacity the CPU can access.
        *   *Formula*: Max memory locations = 2^n (where n is the number of lines).
        *   *Examples*: 8085 has 16 address lines (2^16 = 64 KB); 8086 has 20 address lines (2^20 = 1 MB).
*   **Data Bus**:
    *   *Direction*: Bidirectional. Data can flow to the CPU (Read) and from the CPU (Write).
    *   *Function*: Carries the actual data values, variables, or program instruction codes between components.
    *   *Key parameter*: The width (number of lines) determines how many bits can transfer in one bus cycle.
        *   *Examples*: 8085 has an 8-bit data bus (transfers 1 byte); 8086 has a 16-bit data bus (transfers 2 bytes).
*   **Control Bus**:
    *   *Direction*: Bidirectional.
    *   *Function*: Carries timing, status, and control signals to coordinate and synchronize all actions on the system bus, preventing bus contention.
    *   *Key Control Signals*:
        *   **MEMR** / **MEMW** (Memory Read / Write): Commands memory to read or write data.
        *   **IOR** / **IOW** (I/O Read / Write): Commands I/O ports to input or output data.
        *   **INTR** / **INTA** (Interrupt Request / Acknowledge): Handles hardware interrupts from devices.
        *   **READY**: Used by slow memory/devices to tell the CPU to insert wait states.
        *   **CLK** / **RESET**: Provides system clock sync and system reset.

---

### Block Diagram (Draw in Exam):

```
  ┌──────────────────────────────────────────────────────────────┐
  │                         SYSTEM BUS                           │
  │   ┌────────────────────────────────────────────────────────┐ │
  │   │  ADDRESS BUS (Unidirectional: CPU ──► Memory / IO)     │ │
  │   ├────────────────────────────────────────────────────────┤ │
  │   │  DATA BUS    (Bidirectional:  CPU ◄══► Memory / IO)    │ │
  │   ├────────────────────────────────────────────────────────┤ │
  │   │  CONTROL BUS (Bidirectional:  CPU ◄══► Memory / IO)    │ │
  │   └────────────────────────────────────────────────────────┘ │
  └─────────┬───────────────────┬───────────────────┬────────────┘
            ▼                   ▼                   ▼
      ┌───────────┐       ┌───────────┐       ┌───────────┐
      │    CPU    │       │  MEMORY   │       │I/O Devices│
      └───────────┘       └───────────┘       └───────────┘
```
