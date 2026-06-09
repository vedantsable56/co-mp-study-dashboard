# CO & MP: Unit I — Computer Evolution and Performance (Q&A)

---

## Q1. Difference between Von Neumann and Harvard Architecture (7 Marks)

*   **Von Neumann**: Stores both instructions and data in the **same memory** and uses a **single bus** to access them.
*   **Harvard**: Uses **separate memories** and **separate buses** for instructions and data.

---

### Key Differences (Write in Exam):

*   **Memory Space**:
    *   *Von Neumann*: One unified memory for both data and code.
    *   *Harvard*: Physically separate memories for data and code.
*   **Bus System**:
    *   *Von Neumann*: Single shared bus. CPU can only fetch an instruction OR transfer data at one time.
    *   *Harvard*: Separate instruction bus and data bus. CPU can do both at the same time.
*   **Bottleneck**:
    *   *Von Neumann*: Suffers from **Von Neumann Bottleneck** (bus sharing slows down the CPU).
    *   *Harvard*: No bottleneck.
*   **Speed**:
    *   *Von Neumann*: Slower.
    *   *Harvard*: Faster (easily supports **pipelining**).
*   **Hardware Design**:
    *   *Von Neumann*: Simple, requires fewer CPU pins, and is cheap.
    *   *Harvard*: Complex, requires more CPU pins, and is expensive.
*   **Use Cases**:
    *   *Von Neumann*: General-purpose systems (PCs, laptops, servers).
    *   *Harvard*: Microcontrollers (8051, AVR) and DSP (Digital Signal Processors).

---

### Block Diagrams (Draw in Exam):

```
  VON NEUMANN (Shared Bus)              HARVARD (Dual Bus)
  ┌──────────┐   ┌───────────┐          ┌─────────┐   ┌─────────┐
  │          │   │  SINGLE   │          │ PROG    │   │ DATA    │
  │   CPU    ├──►│  MEMORY   │          │ MEMORY  │   │ MEMORY  │
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
| **Memory** | Shared | Separate |
| **Buses** | Single | Separate |
| **Pipelining** | Hard to implement | Easy to implement |
| **CPU Pins** | Less | More |
| **Applications** | Laptops, Desktops | Microcontrollers, DSPs |

---
---

## Q2. Draw and Explain the Hardware Implementation of Booth's Algorithm (6 Marks)

*   **Purpose**: Used to multiply signed binary numbers (positive or negative) in 2's complement form.

---

### Hardware Components (Write in Exam):
*   **Register M**: Stores the Multiplicand (n-bits).
*   **Register Q**: Stores the Multiplier (n-bits).
*   **Register A (Accumulator)**: Initialized to 0. Stores the running partial product (n-bits).
*   **Flip-Flop Q₋₁**: A 1-bit register initialized to 0. Sits next to the LSB of Q (Q0).
*   **ALU**: Performs addition (A + M) and subtraction (A - M).
*   **Sequence Counter (SC)**: Initialized to n. Decrements after each cycle. Stops when it hits 0.
*   **Control Logic**: Checks Q0 and Q-1 to decide the ALU operation.

---

### Operation Steps:
1.  Check Q0 and Q-1:
    *   **00** or **11**: No ALU action. Just shift.
    *   **01**: Add M to A (A ← A + M). Then shift.
    *   **10**: Subtract M from A (A ← A - M). Then shift.
2.  Perform **ASHR (Arithmetic Shift Right)** on [A, Q, Q_{-1}] by 1 bit.
    *   *Rule*: The sign bit (MSB of A) is copied to itself to keep the sign correct.
3.  Decrement SC. Repeat until SC = 0.

---

### Hardware Diagram (Draw in Exam):

```
               ┌──────────────────────────────────┐
               │          CONTROL LOGIC            │
               │      (Checks Q₀ and Q₋₁ bits)    │
               └──────┬──────────────┬─────────────┘
                      │              │
      ┌─────────┐  ┌──▼──────────────▼┐
      │Register │  │      A L U       │
      │    M    │─►│  (Add / Sub)     │
      └─────────┘  └────────┬─────────┘
                            │
                            ▼
                  ┌─────────────────┐   ┌─────────┐   ┌─────┐
                  │   Register A    │──►│Register │──►│Q₋₁  │
                  │  (Accumulator)  │   │    Q    │   │(FF) │
                  └─────────────────┘   └─────────┘   └─────┘
                      ▲                                   │
                      │◄──── ASHR (Shift Right) ──────────┘
```

---
---

## Q3. Discuss the Limitation of a Ripple Carry Adder and Explain How a Carry Look-Ahead (CLA) Adder Improves Speed (7 Marks)

*   **RCA**: Adders chained together. The carry-out of one goes to the carry-in of the next.
*   **CLA**: Pre-calculates all carry bits instantly in parallel using logic gates.

---

### Limitations of Ripple Carry Adder (RCA):
*   **Sequential Delay**: Each Full Adder must wait for the carry from the previous stage to arrive.
*   **High Propagation Delay**: Delay is linear O(n). For an n-bit adder with gate delay Δt, total delay is n x Δt.
*   **Bottleneck**: Slower performance in wide-bit adders (e.g., 32-bit or 64-bit systems).

```
  RCA Chain: C₀ ──► [FA₀] ──C₁──► [FA₁] ──C₂──► [FA₂] ──► C₃ (Slow!)
```

---

### How Carry Look-Ahead (CLA) Improves Speed:
Instead of waiting, it calculates carry signals (C_i) in parallel using two functions:
1.  **Generate (G_i)**: G_i = A_i · B_i (creates a carry if both inputs are 1).
2.  **Propagate (P_i)**: P_i = A_i ⊕ B_i (passes the carry if either input is 1).

**Carry Equations (Calculated Instantly):**
*   C_1 = G_0 + P_0 · C_0
*   C_2 = G_1 + P_1 · G_0 + P_1 · P_0 · C_0
*   C_3 = G_2 + P_2 · G_1 + P_2 · P_1 · G_0 + P_2 · P_1 · P_0 · C_0
*   C_4 = G_3 + P_3 · G_2 + P_3 · P_2 · G_1 + P_3 · P_2 · P_1 · G_0 + P_3 · P_2 · P_1 · P_0 · C_0

**Why it is faster:**
*   All G_i and P_i are generated in **1 gate delay**.
*   All carries (C_1 - C_4) are calculated using 2-level AND-OR gates (taking **2 gate delays**).
*   Total delay is constant (**O(1)**), regardless of the adder's bit width.

---

### Comparison:

| Feature | Ripple Carry Adder (RCA) | Carry Look-Ahead (CLA) |
| :--- | :--- | :--- |
| **Carry Calculation** | One after another | All at the same time |
| **Delay** | Linear O(n) | Constant O(1) |
| **Hardware cost** | Low | High (requires many gates) |
| **Speed** | Slower | Extremely Fast |

---
---

## Q4. Multiply Using Booth's Algorithm: Multiplicand = +3, Multiplier = −4 (8 Marks)

**Data Setup:**
*   Multiplicand (M) = +3 → 0011
*   -M = -3 → 1101
*   Multiplier (Q) = -4 → 1100
*   Initialize: A = 0000, Q_{-1} = 0, SC = 4

---

### Trace Table (Write in Exam):

| Cycle | Accumulator (A) | Multiplier (Q) | Q-1 | Q0 Q-1 | Action | SC |
| :---: | :---: | :---: | :---: | :---: | :--- | :---: |
| **Init** | 0000 | 1100 | 0 | — | Initialize registers | 4 |
| **1** | 0000 | 1100 | 0 | **00** | No Op. Just shift. | — |
| | 0000 | 0110 | 0 | — | **ASHR** (Shift right, keep sign bit) | 3 |
| **2** | 0000 | 0110 | 0 | **00** | No Op. Just shift. | — |
| | 0000 | 0011 | 0 | — | **ASHR** (Shift right, keep sign bit) | 2 |
| **3** | 0000 | 0011 | 0 | **10** | Subtract M (A ← A + (-M)) | — |
| | 1101 | 0011 | 0 | — | A = 0000 + 1101 = 1101 | — |
| | 1110 | 1001 | 1 | — | **ASHR** (Shift right, keep sign bit) | 1 |
| **4** | 1110 | 1001 | 1 | **11** | No Op. Just shift. | — |
| | 1111 | 0100 | 1 | — | **ASHR** (Shift right, keep sign bit) | 0 |

**Result:**
*   Combined Register [A][Q] → 1111 0100
*   Convert to decimal (2's complement):
    *   Invert: 0000 1011
    *   Add 1: 0000 1100 (12 in decimal)
*   **Result = -12** (Correct since +3 x -4 = -12).

---

### Extra Practice: +5 × −3 (5-bit Booth's)
*   M = +5 → 00101
*   -M = -5 → 11011
*   Q = -3 → 11101

| Cycle | Accumulator (A) | Multiplier (Q) | Q-1 | Q0 Q-1 | Action | SC |
| :---: | :---: | :---: | :---: | :---: | :--- | :---: |
| **Init** | 00000 | 11101 | 0 | — | Initialize registers | 5 |
| **1** | 00000 | 11101 | 0 | **10** | Subtract M (A ← A - M) | — |
| | 11011 | 11101 | 0 | — | A = 00000 + 11011 = 11011 | — |
| | 11101 | 11110 | 1 | — | **ASHR** | 4 |
| **2** | 11101 | 11110 | 1 | **01** | Add M (A ← A + M) | — |
| | 00010 | 11110 | 1 | — | A = 11101 + 00101 = 00010 | — |
| | 00001 | 01111 | 0 | — | **ASHR** | 3 |
| **3** | 00001 | 01111 | 0 | **10** | Subtract M (A ← A - M) | — |
| | 11100 | 01111 | 0 | — | A = 00001 + 11011 = 11100 | — |
| | 11110 | 00111 | 1 | — | **ASHR** | 2 |
| **4** | 11110 | 00111 | 1 | **11** | No Op. Just shift. | — |
| | 11111 | 00011 | 1 | — | **ASHR** | 1 |
| **5** | 11111 | 00011 | 1 | **11** | No Op. Just shift. | — |
| | 11111 | 10001 | 1 | — | **ASHR** | 0 |

*   Result: [A][Q] → 11111 10001 → -15 (Verified).

---
---

## Q5. Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus (7 Marks)

*   **System Bus**: A set of parallel wires connecting the CPU, Memory, and I/O devices to exchange data and control commands.

---

### The Three Main Buses (Write in Exam):

*   **Address Bus**:
    *   *Direction*: Unidirectional (signals go **only** from CPU → Memory/IO).
    *   *Function*: Carries the memory address or I/O port number the CPU wants to access.
    *   *Key detail*: Width determines maximum addressable memory.
        *   n-lines can address 2^n locations.
        *   *Examples*: 8085 has 16 lines (64 KB); 8086 has 20 lines (1 MB).
*   **Data Bus**:
    *   *Direction*: Bidirectional (data goes to and from the CPU).
    *   *Function*: Carries data, variable values, or instruction codes.
    *   *Key detail*: Width determines how many bits can transfer at once.
        *   *Examples*: 8085 has an 8-bit data bus; 8086 has a 16-bit data bus.
*   **Control Bus**:
    *   *Direction*: Bidirectional.
    *   *Function*: Carries command, status, and synchronization signals.
    *   *Key Signals*:
        *   \overline{MEMR} / \overline{MEMW}: Memory Read / Write.
        *   \overline{IOR} / \overline{IOW}: I/O Port Read / Write.
        *   INTR / \overline{INTA}: Interrupt Request and Acknowledge.
        *   CLK: System Clock.

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
