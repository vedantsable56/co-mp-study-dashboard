# CO & MP: Unit III – Introduction to 8086 Microprocessor (Q&A)

---

## Q11. Draw the Pin Diagram of 8086 and Explain ALE, WR̅, DEN̅ and DT/R̅ (6 Marks)

### Definition
The 8086 is a 40-pin Dual In-line Package microprocessor that uses multiplexed address and data bus lines to share pin paths.

### Diagram
```
                     ┌────────────┐
         GND  [1]  ──┤            ├──  [40] VCC (+5V)
     AD15     [2]  ──┤            ├──  [39] AD0
     ALE      [25] ──┤    8086    ├──  [29] WR̅
     DEN̅      [26] ──┤    CPU     ├──  [27] DT/R̅
     GND      [20] ──┤            └──────  [21] RESET
                     └────────────┘
```

### Address and Write Control
*   **ALE (Address Latch Enable)**: Output pin that pulses high during T1 state to signal external latches to store address bits.
*   **WR̅ (Write)**: Active-low output pin that goes low during T2 to signal memory or I/O of valid data on the bus.

### Data Flow Control
*   **DEN̅ (Data Enable)**: Active-low output pin that goes low during T2 to enable external transceivers and protect the bus.
*   **DT/R̅ (Data Transmit/Receive)**: Output pin that goes high for data transmission (write) and low for data receiving (read).

### Auxiliary Control
*   **BHE̅ (Bus High Enable)**: Active-low output signal that enables the upper memory bank for data lines D8–D15.
*   **MN/MX̅ (Min/Max Mode)**: Input pin that selects Minimum Mode (single CPU) or Maximum Mode (multiprocessor layout).

### Features
*   **Bus Multiplexing**: Shares address and data lines to lower physical pin count.
*   **Tristate Outputs**: Pins support high-impedance state for DMA bus takeover.

---
---

## Q12. Explain Architecture of 8086 (7 Marks)

### Definition
The 8086 architecture is divided into two autonomous blocks: the Bus Interface Unit (BIU) for memory bus transfers, and the Execution Unit (EU) for instruction decoding and execution.

### Diagram
```
  ┌─────────────────────────┐        ┌─────────────────────────┐
  │   Bus Interface Unit    │        │     Execution Unit      │
  │  Segment Regs & IP      ├─Queue─►│  ALU, General Regs      │
  └─────────────────────────┘        └─────────────────────────┘
```

### Components
*   **Segment Registers (CS, DS, SS, ES)** : Hold 16-bit base addresses of active memory blocks.
*   **Instruction Pointer (IP)** : Holds the 16-bit offset of the next instruction byte to be fetched.
*   **Address Adder (Σ)** : Performs a left shift and add operation to generate 20-bit physical addresses.
*   **Instruction Queue** : A 6-byte FIFO buffer that stores fetched instruction opcodes in advance.
*   **ALU (Arithmetic Logic Unit)** : A 16-bit arithmetic and logic unit that executes math and logic operations.
*   **General Purpose Registers** : 16-bit data registers (AX, BX, CX, DX) that can be split into 8-bit registers.
*   **Pointer and Index Registers** : Store offset pointers for stack access (SP, BP) and string operations (SI, DI).
*   **Instruction Decoder** : Decodes queue opcodes and generates internal CPU control signals.
*   **Flag Register** : A 16-bit register holding 6 status flags and 3 control flags.

### Working
*   The BIU fetches instruction bytes using idle bus cycles and stores them in the 6-byte queue.
*   The EU pops decoded instructions from the queue and executes them in the ALU.
*   If data access is needed, the EU requests the BIU to perform memory read/write cycles.
*   Pipelining occurs as the BIU fetches the next instruction while the EU executes the current one.
*   When a branch instruction is executed, the EU flushes the queue, and the BIU fetches from the new address.

### Key Features
*   **Instruction Pipelining**: Prefetches up to six instruction bytes to minimize execution delays.
*   **Segmented Memory**: Organizes memory into logical segments to support relocatable programs.

---
---

## Q13. Explain Programmer's Model (Register Organization) of 8086 (7 Marks)

### Definition
The 8086 programmer's model consists of 14 user-accessible 16-bit registers that manage data processing, segmentation, stack access, and status flags.

### Diagram
```
  AX: [  AH  ][  AL  ]   (Accumulator)     CS: [   Code Segment   ]
  BX: [  BH  ][  BL  ]   (Base Offset)     DS: [   Data Segment   ]
  CX: [  CH  ][  CL  ]   (Count)           SS: [   Stack Segment  ]
  DX: [  DH  ][  DL  ]   (Data)            ES: [   Extra Segment  ]
```

### Components
*   **Accumulator Register (AX)** : Used in arithmetic, logic, I/O operations, and multiplication or division.
*   **Base Register (BX)** : Holds base offset pointer addresses for indirect memory addressing.
*   **Count Register (CX)** : Acts as a loop counter and a shift or rotate counter.
*   **Data Register (DX)** : Holds I/O port addresses and high-order product bits during multiplication.
*   **Code Segment (CS)** : Holds the 16-bit base address of program instruction memory.
*   **Data Segment (DS)** : Points to the segment where variables and application data are stored.
*   **Stack Segment (SS)** : Holds the base address of stack memory for subroutines.
*   **Extra Segment (ES)** : Serves as a destination base segment for string manipulation operations.
*   **Stack Pointer (SP)** : Points to the active top offset of the stack segment.
*   **Base Pointer (BP)** : Accesses parameters passed onto the stack during subroutine calls.
*   **Source/Destination Index (SI/DI)** : Store source and destination offset addresses during string operations.
*   **Instruction Pointer (IP)** : Holds the offset address of the next instruction code byte.
*   **Flag Register** : Holds 6 arithmetic status flags and 3 system control flags.

### Working
*   The programmer manipulates data within AX, BX, CX, DX, or pointer registers.
*   The BIU combines segment registers and offsets to calculate physical memory addresses.
*   Status flags are updated automatically after every ALU operation.
*   Control flags define single-step, interrupt, and string direction states.

---
---

## Q14. Explain Immediate, Register, Direct and Indirect Addressing Modes (7 Marks)

### Definition
Addressing modes define the syntax and operational steps used by instructions to locate and fetch operand data.

### Diagram
```
  Immediate ──► Operand inside instruction code
  Register  ──► Operand inside CPU register
  Direct    ──► Address offset written in instruction
  Indirect  ──► Address offset stored in register (BX/SI/DI)
```

### Immediate and Register Modes
*   **Immediate Mode**: The operand is a constant value located directly in the instruction code.
    *   *Example*: `MOV AX, 1234H` (loads constant 1234H into AX register).
*   **Register Mode**: The operand is stored in a CPU register, and no memory cycles are executed.
    *   *Example*: `MOV AX, BX` (copies register BX contents into register AX).

### Direct and Indirect Modes
*   **Direct Mode**: The 16-bit offset address is written directly in the instruction brackets.
    *   *Example*: `MOV AX, [5000H]` (PA is calculated as (DS x 10H) + 5000H).
*   **Register Indirect Mode**: The offset address is stored in BX, BP, SI, or DI pointer registers.
    *   *Example*: `MOV AX, [SI]` (PA is calculated as (DS x 10H) + SI).

### Advantages
*   **Array Support**: Register indirect modes simplify loops and index searches.
*   **Saves Memory**: Immediate and register modes execute faster without referencing RAM.

---
---

## Q15. How is 8086 Instruction Set Classified? Explain Any Two Categories (6 Marks)

### Definition
The 8086 instruction set consists of native CPU commands classified into six groups based on data, math, logic, branching, and control tasks.

### Diagram
```
  [ Instruction Set ] ──► Transfer / Arithmetic / Logical / Branch / Control
```

### Data Transfer Instructions
*   **Purpose**: Copy bytes or words between registers, memory, and I/O ports.
*   **Flag Impact**: These instructions do not affect any status flags.
*   **Examples**: `MOV AX, BX` (copies BX to AX) and `PUSH CX` (stores CX on stack).

### Arithmetic Instructions
*   **Purpose**: Perform mathematical calculations on binary or BCD data formats.
*   **Flag Impact**: Update status flags (ZF, CF, SF, OF, AF, PF) based on the result.
*   **Examples**: `ADD AX, BX` (sums BX and AX) and `CMP AL, 05H` (compares by subtraction).

### Other Categories
*   **Logical**: Performs Boolean operations (AND, OR, XOR) and shifts bits.
*   **Program Control**: Controls program execution loops, conditional jumps, and subroutine calls.
*   **Processor Control**: Modifies status flag bits (e.g., CLI) and syncs bus actions.

### Features
*   **Data Size Flex**: Supports both 8-bit byte and 16-bit word operations.
*   **Instruction Set Class**: Divides instruction logic to optimize memory reads.
