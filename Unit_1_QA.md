# CO & MP: Unit I — Computer Evolution and Performance (Q&A)

---

## Q1. Difference between Von Neumann and Harvard Architecture (7 Marks)

| Comparison Parameter | Von Neumann Architecture | Harvard Architecture |
| :--- | :--- | :--- |
| **1. Memory Structure** | Uses a unified memory space that stores both instruction opcodes and operand data, sharing the same physical storage media. | Utilizes separate, physically isolated memory modules for storing instructions (Program Memory) and data (Data Memory). |
| **2. Bus Configuration** | Uses a single system bus (shared address and data buses) to access both instruction codes and operand data from memory. | Features independent, dedicated buses (instruction address/data bus and data address/data bus) running in parallel. |
| **3. Execution Speed** | Slower, as instruction fetches and data read/write operations must be serialized over the shared bus, causing the Von Neumann bottleneck. | Faster, as the CPU can fetch a machine instruction and perform a memory read/write operation simultaneously in one clock cycle. |
| **4. Pipelining Efficiency** | Hard to implement efficiently because the instruction fetch stage frequently conflicts with the operand read/write stage over the shared bus. | Highly compatible with multi-stage pipelining since instruction fetching and data access execute on separate, non-conflicting buses. |
| **5. Hardware Complexity** | Simpler hardware interface design, requiring fewer address/data pins on the physical CPU chip and less complex motherboard routing. | Complex processor design, requiring double the number of address/data pins on the CPU and complex, dual-bus motherboard traces. |
| **6. System Cost** | Lower overall production cost due to a simplified bus system, fewer CPU pins, and the requirement of only a single memory block. | Higher manufacturing cost due to duplicate memory chips, dual-bus trace layouts, and higher pin-count CPU packaging. |
| **7. Code Security** | Lower security, as executing code and application data share memory, allowing program instructions to be accidentally overwritten. | Higher security, as program memory is write-protected and physically separated, preventing data operations from corrupting code. |
| **8. Memory Utilization** | High optimization efficiency, since unused program memory space can be dynamically allocated to store application data and vice-versa. | Rigid memory allocation, where unused space in the program memory module cannot be utilized by data-heavy applications. |
| **9. Control Unit Design** | Simpler control logic state machine, as it only needs to coordinate sequential, non-overlapping bus cycles. | Complex control unit design, requiring arbitration and synchronization logic to manage two parallel buses simultaneously. |
| **10. Typical Applications** | General-purpose computing systems, such as desktop computers, laptops, and servers, where memory flexibility is essential. | High-speed digital signal processors (DSPs), microcontrollers (e.g., 8051, AVR), and real-time embedded systems. |

---
---

## Q2. Draw and Explain the Hardware Implementation of Booth's Algorithm (6 Marks)

### Definition
The hardware implementation of Booth's algorithm provides the physical registers, arithmetic logic unit (ALU), control circuitry, and datapath logic required to perform signed binary multiplication. It operates directly on numbers represented in two's complement form without requiring separate sign-detection or conversion hardware.

### Diagram
```
                     ┌───────────────────────────────┐
                     │         Control Logic         │
                     │  (State Machine & Sequencer)  │
                     └──────┬────────────────┬───────┘
                            │                │
            ┌─────────┐  ┌──▼────────────────▼┐
            │Regis-   │  │    n-Bit ALU       │
            │er M     │─►│ (Adder/Subtractor) │
            │(Multi-  │  └────────┬───────────┘
            │ plicand)│           │
            └─────────┘           ▼
                        ┌──────────────────┐   ┌─────────┐   ┌───────┐
                        │   Register A     │──►│Register │──►│Flip-  │
                        │  (Accumulator)   │   │  Q      │   │Flop   │
                        │                  │   │(Multi-  │   │Q_-1   │
                        │                  │   │ plier)  │   │       │
                        └──────────────────┘   └─────────┘   └───────┘
                            │                      │             │
                            └───────────────┬──────┴─────────────┘
                                            ▼
                                  Arithmetic Shift Right
```

### Components and Functions
*   **Register M (Multiplicand Register)**: A dedicated n-bit register that stores the multiplicand value throughout the multiplication process. It provides its stored value to the ALU for addition or subtraction operations based on the control signals.
*   **Register Q (Multiplier Register)**: An n-bit shift register that initially holds the multiplier. During each step of the algorithm, the least significant bit (Q_0) is scanned alongside Q_-1, and the entire register is shifted arithmetically to the right.
*   **Register A (Accumulator Register)**: An n-bit register initialized to all zeros at the start of the operation. It stores the partial products generated during successive addition and subtraction cycles, eventually forming the upper half of the final product.
*   **Flip-Flop Q_-1**: A single-bit register placed adjacent to the least significant bit of Register Q (Q_0). It is initialized to zero and holds the bit shifted out from Q_0 during the previous arithmetic right shift, allowing the control logic to check bit transitions.
*   **n-Bit Parallel ALU (Adder/Subtractor)**: Performs addition (A + M) or subtraction (A - M) operations on the contents of Register A and Register M. The result of the operation is immediately written back into Register A.
*   **Sequence Counter (SC)**: A hardware counter register initialized with the word size (n). It decrements by one at the end of each clock cycle (after the shift step) and signals the control logic to terminate the operation when its count reaches zero.
*   **Control Logic Block**: A state machine that continuously samples the bits Q_0 and Q_-1. It generates the enable and select signals for the ALU (addition, subtraction, or no operation) and triggers the arithmetic right shift of the combined [A, Q, Q_-1] registers.

### Working
The multiplication process starts by loading the multiplicand into Register M, the multiplier into Register Q, and clearing Register A and Flip-Flop Q_-1 to zero. The sequence counter (SC) is loaded with the bit-width n. During each of the n clock cycles, the control logic evaluates the binary state of the two bits [Q_0, Q_-1]:
1. If the bits are `01`, Register M is added to Register A (A ← A + M) via the ALU.
2. If the bits are `10`, Register M is subtracted from Register A (A ← A - M) via the ALU.
3. If the bits are `00` or `11`, no arithmetic operation is performed.
Following the arithmetic phase, an Arithmetic Shift Right (ASHR) is performed on the combined registers [A, Q, Q_-1]. This shift operation preserves the sign bit (MSB of Register A) to maintain the correct two's complement representation. The sequence counter (SC) is terminated when it reaches zero, at which point the final 2n-bit product is available in the combined registers [A, Q].

---
---

## Q3. Discuss the Limitation of a Ripple Carry Adder and Explain How a Carry Look-Ahead (CLA) Adder Improves Speed (7 Marks)

### Definition / Introduction
A Ripple Carry Adder (RCA) is a digital circuit that adds two n-bit numbers by chaining n Full Adders in series, where the carry output of each stage is connected to the carry input of the succeeding stage. A Carry Look-Ahead (CLA) Adder is an advanced parallel design that reduces carry propagation delays by calculating the carry-in bits for all stages simultaneously using logic equations.

### Diagram
```
  Ripple Carry Adder Propagation Delay:
  A0 B0         A1 B1         A2 B2         A3 B3
  ┌──┴──┐       ┌──┴──┐       ┌──┴──┐       ┌──┴──┐
  │ FA0 ├──C1──►│ FA1 ├──C2──►│ FA2 ├──C3──►│ FA3 ├──C4──► (Sequential propagation)
  └──┬──┘       └──┬──┘       └──┬──┘       └──┬──┘
     S0            S1            S2            S3

  Carry Look-Ahead Adder Logic Block:
  A0,B0 ────► ┌─────────────────────────────────┐ ────► S0
  A1,B1 ────► │  Carry Generate (G) &           ├─ C1-C3► S1
  A2,B2 ────► │  Carry Propagate (P) Logic Block│ ────► S2
  A3,B3 ────► └─────────────────────────────────┘ ────► S3 (Parallel calculation)
```

### Limitations of Ripple Carry Adder (RCA)
*   **Carry Propagation Delay**: The primary limitation of the RCA is that the carry bit must "ripple" sequentially through every Full Adder stage from the least significant bit (LSB) to the most significant bit (MSB). No stage can compute its final sum and carry output until it receives the steady carry input from the previous stage.
*   **Linear Time Complexity**: The propagation delay increases linearly with the bit-width n of the adders. If each Full Adder stage introduces a delay of t_d, the worst-case delay for an n-bit addition is n·t_d, which makes the circuit slow for 32-bit or 64-bit word sizes.
*   **Performance Bottleneck**: In modern high-frequency arithmetic logic units (ALUs), the linear carry delay of the RCA restricts the maximum operating clock speed of the entire processor, making it unsuitable for high-performance computing.

### How Carry Look-Ahead (CLA) Adder Improves Speed
The CLA adder improves speed by eliminating the dependency on sequential carry propagation. It defines two intermediate signals for each bit position:
1. **Carry Generate (G_i)**: Active when a carry is generated at stage i regardless of the input carry.
   Equation: G_i = A_i · B_i
2. **Carry Propagate (P_i)**: Active when an input carry is propagated to the next stage.
   Equation: P_i = A_i ⊕ B_i

Using these signals, the carry-in for every stage is calculated directly using parallel logic gates that look ahead to the carry status of the preceding stages:
*   C_1 = G_0 + P_0 · C_0
*   C_2 = G_1 + P_1 · G_0 + P_1 · P_0 · C_0
*   C_3 = G_2 + P_2 · G_1 + P_2 · P_1 · G_0 + P_2 · P_1 · P_0 · C_0
*   C_4 = G_3 + P_3 · G_2 + P_3 · P_2 · G_1 + P_3 · P_2 · P_1 · G_0 + P_3 · P_2 · P_1 · P_0 · C_0

Since these equations depend only on the initial inputs (A_i, B_i) and the external carry-in (C_0), the carry logic block can calculate all carry bits in parallel. All carries are generated within two gate delays, reducing the time complexity from O(n) to a constant O(1), which improves the operating speed of large adders.

---
---

## Q4. Multiply Using Booth's Algorithm: Multiplicand = +3, Multiplier = -4 (8 Marks)

### Definition
Booth's algorithm is an multiplication algorithm that multiplies two signed binary numbers in two's complement representation. It scans the multiplier bits to perform additions, subtractions, or shifts, reducing the total count of additions required.

### Principle
The algorithm evaluates adjacent bit pairs of the multiplier (Q_0 and Q_-1) to determine the arithmetic operation. If the transition is `10` (falling edge), a subtraction is performed; if `01` (rising edge), an addition is performed; if `00` or `11`, no arithmetic operation is required. An arithmetic right shift is executed in every cycle to align the partial products.

### Steps
1. Initialize Register A to 0000, Flip-Flop Q_-1 to 0, and loaded Multiplicand M and Multiplier Q.
2. Initialize the Sequence Counter (SC) to the bit-width n = 4.
3. Inspect the combination of Q_0 and Q_-1.
4. Execute A ← A + M (for 01) or A ← A - M (for 10) if required.
5. Perform an Arithmetic Shift Right (ASHR) on [A, Q, Q_-1].
6. Decrement SC by 1. If SC is not zero, repeat from Step 3.

### Working and Numerical Trace
- Multiplicand (M) = +3 = `0011` in binary.
- Two's complement of Multiplicand (-M) = -3 = `1101` in binary.
- Multiplier (Q) = -4 = `1100` in binary.
- Initial Setup: A = `0000`, Q = `1100`, Q_-1 = `0`, SC = `4`.

| Cycle | Accumulator (A) | Multiplier (Q) | Q_-1 | Q_0, Q_-1 | Performed Operation | SC |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **Init** | 0000 | 1100 | 0 | - | Load registers and clear A, Q_-1 | 4 |
| **C1** | 0000 | 1100 | 0 | `00` | No arithmetic operation; execute ASHR | 4 |
| **Shift** | 0000 | 0110 | 0 | - | ASHR [A, Q, Q_-1]; sign bit preserved | 3 |
| **C2** | 0000 | 0110 | 0 | `00` | No arithmetic operation; execute ASHR | 3 |
| **Shift** | 0000 | 0011 | 0 | - | ASHR [A, Q, Q_-1]; sign bit preserved | 2 |
| **C3** | 1101 | 0011 | 0 | `10` | Subtract M: execute A ← A + (-M) | 2 |
| **Shift** | 1110 | 1001 | 1 | - | ASHR [A, Q, Q_-1]; sign bit preserved | 1 |
| **C4** | 1110 | 1001 | 1 | `11` | No arithmetic operation; execute ASHR | 1 |
| **Shift** | 1111 | 0100 | 1 | - | ASHR [A, Q, Q_-1]; sign bit preserved | 0 |

The final product is stored in the combined registers [A, Q] as `11110100`.
- Verification: The binary value `11110100` is a signed two's complement number.
- Inverting the bits: `00001011`
- Adding 1: `00001100` (equal to decimal 12).
- Since the original sign bit was 1, the result is -12, which is correct (+3 · -4 = -12).

### Key Execution Steps
*   **Multiplicand Registration**: The multiplicand value of +3 is represented in signed 4-bit binary as `0011` and stored in Register M. Its two's complement value `-M` is computed as `1101` and is utilized during subtraction cycles when the multiplier transitions from a `1` to a `0`.
*   **Multiplier Registration**: The multiplier value of -4 is represented in signed 4-bit binary as `1100` and loaded into Register Q. The least significant bit (Q_0) and Flip-Flop Q_-1 are examined in each cycle to determine the arithmetic operations.
*   **Registers Initialization**: Before the multiplication process begins, Register A (Accumulator) and Flip-Flop Q_-1 are initialized to `0000` and `0` respectively. The Sequence Counter (SC) is initialized to `4` (representing the bit-width of the operands).
*   **Bit Evaluation and Operation**: In each cycle, the bit combination of [Q_0, Q_-1] determines whether addition, subtraction, or shift-only occurs. Subtraction is performed for state `10`, addition for `01`, and no arithmetic operation is executed for states `00` or `11`.
*   **Arithmetic Right Shift (ASHR)**: An arithmetic right shift is performed on the combined registers [A, Q, Q_-1] at the end of each cycle. This shift operation preserves the sign bit (MSB of Register A) to ensure that the two's complement signed representation remains mathematically correct.

### Advantages
*   Supports signed operands in two's complement format directly without pre-conversion.
*   Reduces the number of add/subtract operations when the multiplier contains strings of consecutive 1s or 0s.
*   Simplifies datapath hardware requirements in signed digital multiplier designs.

---
---

## Q5. Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus (7 Marks)

### Definition / Introduction
A system bus is a set of physical wiring traces on a computer motherboard that serves as a shared communication pathway connecting the central processing unit (CPU), system memory, and input/output (I/O) peripheral devices. It coordinates digital signal transmission to prevent bus conflicts.

### Diagram
```
   ┌────────────────────────────────────────────────────────┐
   │                       SYSTEM BUS                       │
   │   ┌──────────────────────────────────────────────────┐ │
   │   │  ADDRESS BUS (Unidirectional: CPU to Memory/IO)  │ │
   │   ├──────────────────────────────────────────────────┤ │
   │   │  DATA BUS    (Bidirectional: CPU ◄═► Memory/IO)  │ │
   │   ├──────────────────────────────────────────────────┤ │
   │   │  CONTROL BUS (Bidirectional: CPU ◄═► Memory/IO)  │ │
   │   └──────────────────────────────────────────────────┘ │
   └─────────┬───────────────────┬───────────────────┬──────┘
             ▼                   ▼                   ▼
       ┌───────────┐       ┌───────────┐       ┌───────────┐
       │    CPU    │       │  MEMORY   │       │I/O Devices│
       └───────────┘       └───────────┘       └───────────┘
```

### Detailed Explanation of Bus Components
*   **Address Bus**: The address bus is a unidirectional set of lines that carries the physical address signals generated by the CPU to select a target memory location or memory-mapped I/O port. The width of the address bus determines the maximum size of the memory space that the CPU can access. For example, the 8086 has 20 address lines, enabling it to address up to 1 MB of memory.
*   **Data Bus**: The data bus consists of bidirectional lines used to transfer machine instruction codes, variable data, and constants between the processor and memory or peripheral modules. The bit-width of the data bus determines how many bits can be fetched or written in a single bus cycle, which directly affects system performance. Common widths include 8, 16, 32, and 64 bits.
*   **Control Bus**: The control bus contains multiple bidirectional lines that transmit control, command, timing, and status signals across the computer modules to coordinate bus activity. These signals prevent data collisions by ensuring only one device drives data onto the shared bus lines at any time. Important control signals include read/write requests, ready signals, and interrupts.
*   **Bus Width and Capacity**: The physical number of lines in the address bus dictates the maximum memory locations (2^n) the processor can address, while the data bus lines determine the execution bandwidth. Increasing the bus widths improves data transmission rates and allows the CPU to access larger data structures in a single cycle.

### Advantages / Features
*   **Reduces Wiring Complexity**: Connects all hardware blocks through a single shared set of lines rather than complex, point-to-point connections.
*   **Scalability**: Allows adding new peripheral cards or memory modules directly to the shared system bus without modifying the CPU interface.
*   **Arbitration Controls**: Includes bus request and grant lines that enable multiple master devices, like DMA controllers, to share access.
