# CO & MP: Unit III – Introduction to 8086 Microprocessor (Q&A)

---

## Q11. Draw the Pin Diagram of 8086 and Explain ALE, WR̅, DEN̅ and DT/R̅ (6 Marks)

### Introduction / Definition:
*   The 8086 is a 16-bit microprocessor with forty physical pins.
*   It uses multiplexed lines to share address and data signals.
*   This sharing reduces the physical pin count of the processor.

### Diagram:
```
          ┌────────────┐
     GND  │1        40│ VCC
     AD15 │2   8086 39│ AD0
     ALE  │25  CPU  29│ WR̅
     DEN̅  │26       27│ DT/R̅
          └────────────┘
```

### Key Points / Core Theory:
*   **Address latch enable** separates multiplexed address and data bus lines.
*   **Write signal** goes low to indicate active memory write operations.
*   **Data enable** activates external transceiver buffers for bus safety.
*   **Data transmit receive** sets the direction of bus data flow.
*   **Multiplexed lines** save physical package pins on the CPU chip.

### Simple Real-World Example:
*   A single water pipe brings clean water or drains waste.
*   Valves control which way the water flows at different times.

### Advantages / Applications:
*   Decreases chip size requirements by sharing physical connection pins.
*   Signals control external latches to keep memory addressing stable.
*   Simplifies data direction control during read and write processes.

### Conclusion:
*   The 8086 pins coordinate critical address latching and transfer timing.
*   They ensure clean communication with memory and input devices.

---
---

## Q12. Explain Architecture of 8086 (7 Marks)

### Introduction / Definition:
*   The 8086 architecture consists of two main processing units.
*   The Bus Interface Unit handles external system bus transfers.
*   The Execution Unit decodes and runs instruction opcodes internally.

### Diagram:
```
  ┌─────────────────┐       ┌─────────────────┐
  │  Bus Interface  │       │ Execution Unit  │
  │   Unit (BIU)    ├──────►│     (EU)        │
  └─────────────────┘ Queue └─────────────────┘
```

### Key Points / Core Theory:
*   **Bus Interface Unit** fetches instruction bytes from memory locations.
*   **Instruction queue** stores up to six bytes of fetched code.
*   **Execution Unit** decodes and executes instructions from the queue.
*   **Pipelining** allows fetching and executing operations at the same time.
*   **Address adder** calculates the physical memory address in hardware.

### Simple Real-World Example:
*   An assembly line worker packages boxes while another worker labels.
*   Neither worker waits idle for the other to finish tasks.

### Advantages / Applications:
*   Speed up instruction throughput by fetching code during execution.
*   Lowers bus idle time by prefetching instructions in advance.
*   Separates system memory access logic from internal calculation hardware.

### Conclusion:
*   Parallel operation of BIU and EU represents basic processor pipelining.
*   It results in faster program execution and high performance.

---
---

## Q13. Explain Programmer's Model (Register Organization) of 8086 (7 Marks)

### Introduction / Definition:
*   Registers are high speed storage locations inside the processor.
*   The 8086 contains fourteen user-accessible 16-bit register files.
*   They are grouped by function like segment, pointer, or general.

### Diagram:
```
  ┌───────────────────────────────────────────────┐
  │ AX, BX, CX, DX  (General Purpose Registers)   │
  ├───────────────────────────────────────────────┤
  │ CS, DS, SS, ES  (Segment Base Registers)      │
  └───────────────────────────────────────────────┘
```

### Key Points / Core Theory:
*   **General purpose registers** store calculation data and address offsets.
*   **Segment registers** hold the base addresses of memory blocks.
*   **Pointer registers** track active stack addresses and index values.
*   **Flag register** holds status bits representing arithmetic operation results.
*   **Instruction pointer** holds the offset of the next instruction.

### Simple Real-World Example:
*   A carpenter keeps frequently used tools in pocket holsters.
*   Large, heavy material remains in the main storage shed.

### Advantages / Applications:
*   Accessing internal registers is much faster than reading memory.
*   Dedicated registers simplify specific instructions like loops and shifts.
*   Segment registers allow easy management of different program blocks.

### Conclusion:
*   Register organization provides fast access to variables and stack pointers.
*   It forms the programmer's view of the microprocessor architecture.

---
---

## Q14. Explain Immediate, Register, Direct and Indirect Addressing Modes (7 Marks)

### Introduction:
*   Addressing modes define how the CPU locates instructions and data.
*   The 8086 uses different modes for registers, memory, and constants.

### Comparison Table:

| Comparison Point | Immediate | Register | Direct | Indirect |
| :--- | :--- | :--- | :--- | :--- |
| **1. Data Location** | Instruction code | CPU register | RAM memory | RAM memory |
| **2. Address Source** | None | Register name | Instruction offset | Pointer register |
| **3. Memory Cycles** | Zero | Zero | One cycle | One cycle |
| **4. Execution Speed** | Fastest | Fastest | Slower | Slower |
| **5. Register Needs** | None | Required | None | Required |
| **6. Segment Default** | None | None | Data segment | Data segment |
| **7. Ideal Use** | Setting constants | Register math | Global variables | Array loops |
| **8. Code Example** | `MOV AX, 5` | `MOV AX, BX` | `MOV AX, [50]` | `MOV AX, [SI]` |

---
---

## Q15. How is 8086 Instruction Set Classified? Explain Any Two Categories (6 Marks)

### Introduction / Definition:
*   The 8086 instruction set contains all native processor commands.
*   These commands are classified into groups based on their function.
*   Key categories include data transfer, arithmetic, and logic operations.

### Diagram:
```
  ┌──────────────────────────────────────────────┐
  │                 Instruction                  │
  ├──────────────┬──────────────┬────────────────┤
  │   Transfer   │  Arithmetic  │    Logical     │
  └──────────────┴──────────────┴────────────────┘
```

### Key Points / Core Theory:
*   **Data transfer instructions** copy bytes between registers and memory.
*   **Arithmetic instructions** perform binary calculations like addition and subtraction.
*   **Logical instructions** perform Boolean operations like AND, OR, XOR.
*   **Program control instructions** change instruction execution paths via jumps.
*   **Processor control instructions** modify flag states and timing status.

### Simple Real-World Example:
*   A cookbook contains instructions to gather, chop, and mix.
*   Each instruction type performs a distinct role in cooking.

### Advantages / Applications:
*   Provides a versatile set of controls for software developers.
*   Allows writing complex mathematical programs using simple hardware commands.
*   Optimizes memory access using targeted data movement instructions.

### Conclusion:
*   The 8086 instruction set is grouped into six distinct categories.
*   These commands control data movement, math, and program logic.
