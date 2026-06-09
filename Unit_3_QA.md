# CO & MP: Unit III – Introduction to 8086 Microprocessor (Q&A)

---

## Q11. Draw the pin diagram of 8086 and explain pins ALE, WR̅, DEN̅, and DT/R̅ (6 Marks)

*   **8086**: A 16-bit microprocessor with 20 address lines (1 MB memory space) and 16 data lines. It is housed in a 40-pin Dual Inline Package (DIP) IC.
*   **Multiplexing**: The lower 16 address lines (A0 - A15) are multiplexed with data lines (D0 - D15) to form the AD0 - AD15 bus. This multiplexing reduces the physical pin count of the chip.

---

### Pin Diagram (Draw in Exam):

```
                    ┌────────────┐
        GND  [1]  ──┤            ├──  [40] VCC (+5V)
    AD14     [2]  ──┤            ├──  [39] AD15
    AD13     [3]  ──┤            ├──  [38] A16/S3
    AD12     [4]  ──┤            ├──  [37] A17/S4
    AD11     [5]  ──┤            ├──  [36] A18/S5
    AD10     [6]  ──┤    8086    ├──  [35] A19/S6
    AD9      [7]  ──┤            ├──  [34] BHE̅/S7
    AD8      [8]  ──┤    CPU     ├──  [33] MN/MX̅
    AD7      [9]  ──┤            ├──  [32] RD̅
    AD6      [10] ──┤            ├──  [31] HOLD (RQ̅/GT0̅)
    AD5      [11] ──┤            ├──  [29] WR̅  (LOCK̅)
    AD4      [12] ──┤            ├──  [28] M/IO̅ (S2̅)
    AD3      [13] ──┤            ├──  [27] DT/R̅ (S1̅)
    AD2      [14] ──┤            ├──  [26] DEN̅  (S0̅)
    AD1      [15] ──┤            ├──  [25] ALE  (QS0)
    AD0      [16] ──┤            ├──  [24] INTA̅ (QS1)
    NMI      [17] ──┤            ├──  [23] TEST̅
    INTR     [18] ──┤            ├──  [22] READY
    CLK      [19] ──┤            ├──  [21] RESET
    GND      [20] ──┤            └──────  
                    └────────────┘
```

---

### Detailed Pin Explanations (Write in Exam):

1.  **ALE (Address Latch Enable - Pin 25)**:
    *   *Type*: Output, Active HIGH.
    *   *Role in Demultiplexing*: ALE is used to demultiplex (separate) the address/data bus. During state T1 of a bus cycle, the CPU places the address on AD0-AD15 and pulses ALE HIGH. This pulse commands an external latch chip (like 74LS373) to lock and store the address bits. In states T2, T3, and T4, ALE is LOW, and the AD0-AD15 pins act strictly as data lines.
2.  **WR̅ (Write - Pin 29)**:
    *   *Type*: Output, Active LOW.
    *   *Function*: Signals that the CPU is performing a memory or I/O write operation. When WR̅ goes LOW, it tells the external memory or I/O device to read the data currently placed on the data bus.
3.  **DEN̅ (Data Enable - Pin 26)**:
    *   *Type*: Output, Active LOW.
    *   *Function*: Turns on the data bus transceivers (74LS245 buffer chips) that isolate the CPU from external data bus loading. It goes LOW (active) during T2, T3, and T4 to connect the CPU to the data lines.
4.  **DT/R̅ (Data Transmit / Receive - Pin 27)**:
    *   *Type*: Output, Direction control.
    *   *Function*: Controls the direction of data flow through the transceivers. When HIGH, the CPU is Transmitting (writing). When LOW, the CPU is Receiving (reading).

---
---

## Q12. Explain architecture of 8086 with BIU, EU, ALU, Instruction Queue, Registers, and Buses (7 Marks)

*   **Pipelining Architecture**: The 8086 architecture is divided into two independent functional units: the **Bus Interface Unit (BIU)** and the **Execution Unit (EU)**. This allows the CPU to fetch new instructions and execute current ones in parallel (pipelining), significantly increasing processing speed.

---

### 1. Bus Interface Unit (BIU) (Write in Exam):

*   **Role**: Handles all data transfers, memory accesses, and instruction fetching on the external system bus.
*   **Components**:
    *   **Segment Registers**: Four 16-bit registers: **CS** (Code Segment), **DS** (Data Segment), **SS** (Stack Segment), and **ES** (Extra Segment). They point to the base addresses of 64KB blocks in the memory.
    *   **Instruction Pointer (IP)**: A 16-bit register holding the memory offset of the next instruction to be fetched.
    *   **Address Adder (Σ)**: A 20-bit hardware circuit that calculates the 20-bit physical address by shifting the segment register left by 4 bits and adding the offset:
        Physical Address = (Segment Register x 10H) + Offset
    *   **Instruction Queue (6-Byte)**: A 6-byte first-in, first-out (FIFO) storage queue. While the EU is executing instructions, the BIU pre-fetches up to 6 bytes of instruction code from memory and stores them in this queue, speeding up instruction execution.
    *   *Queue Flush*: If a jump, call, or branch instruction occurs, the queue is cleared (flushed), and the BIU fetches the instruction from the new target address.

---

### 2. Execution Unit (EU) (Write in Exam):

*   **Role**: Decodes instructions from the queue and executes them.
*   **Components**:
    *   **ALU (Arithmetic Logic Unit)**: A 16-bit ALU that performs arithmetic (+, -, *, /) and logic (AND, OR, XOR, shifts) operations.
    *   **General Purpose Registers**: 16-bit registers (**AX, BX, CX, DX, SP, BP, SI, DI**) used to store operands and offset addresses.
    *   **Instruction Decoder**: Decodes instructions read from the queue and converts them into control signals for the execution unit.
    *   **Flag Register**: A 16-bit register tracking CPU status flags.

---

### Block Diagram (Draw in Exam):

```
  ┌──────────────────────────────────────────────────────────────────┐
  │                         8086 CPU                                 │
  │                                                                  │
  │  ┌─────────────────────────┐        ┌─────────────────────────┐  │
  │  │   BIU (Bus Interface)   │        │   EU (Execution Unit)   │  │
  │  │  Segment Regs (CS, DS,  │        │  General Regs (AX, BX,  │  │
  │  │  SS, ES) & IP           │        │  CX, DX, SP, BP, SI, DI)│  │
  │  └──────────┬──────────────┘        └────────────▲────────────┘  │
  │             │ 20-bit Address                     │               │
  │             ▼                                    │               │
  │       Address Adder (Σ)                     Control Unit         │
  │             │                                    │               │
  │       ┌─────▼─────┐                         ┌────┴────┐          │
  │       │ 6-Byte    ├─ (Prefetched Opcodes) ─►│   ALU   │          │
  │       │ Queue     │                         └─────────┘          │
  │       └─────┬─────┘                                              │
  └─────────────┼────────────────────────────────────────────────────┘
                ▼ External System Bus
```

---
---

## Q13. Explain programmer's model (register organization) of 8086 (7 Marks)

*   **Register Set**: The 8086 contains **14 user-accessible registers**, each **16-bit** wide. They are grouped based on their functions.

---

### Register Groups (Write in Exam):

*   **1. General Purpose Registers** (can be split into High and Low 8-bit registers):
    *   **AX (Accumulator = AH + AL)**: Primary register for arithmetic, logical, multiplication, division, and I/O port operations.
    *   **BX (Base = BH + BL)**: Used as a base register to hold memory offset pointers for data segment addressing.
    *   **CX (Count = CH + CL)**: Used as a loop counter in loop instructions and as a shift counter during bit shifts.
    *   **DX (Data = DH + DL)**: Holds high-order bits in 32-bit multiplication/division and stores I/O port addresses during indirect I/O instructions.
*   **2. Segment Registers** (holds base starting addresses of 64KB blocks):
    *   **CS (Code Segment)**: Points to memory block with executable code.
    *   **DS (Data Segment)**: Points to memory block with active variables and data.
    *   **SS (Stack Segment)**: Points to memory block storing the stack.
    *   **ES (Extra Segment)**: Points to extra data space (used in string operations).
*   **3. Pointer and Index Registers** (used as offsets within segments):
    *   **SP (Stack Pointer)**: Paired with SS; points to the top of the stack.
    *   **BP (Base Pointer)**: Paired with SS; used to access parameter data on the stack.
    *   **SI (Source Index)**: Paired with DS; points to the source string operand in string instructions.
    *   **DI (Destination Index)**: Paired with ES; points to the destination string operand in string instructions.
    *   **IP (Instruction Pointer)**: Paired with CS; holds the offset address of the next instruction.
*   **4. Flags Register (9 Active Flags)**:
    *   *Status Flags (6)*: **CF** (Carry Flag - sets on arithmetic carry/borrow), **PF** (Parity Flag - sets if low byte has even number of 1s), **AF** (Auxiliary Carry - used for BCD arithmetic), **ZF** (Zero Flag - sets if result is 0), **SF** (Sign Flag - matches MSB of result), **OF** (Overflow Flag - sets if signed result exceeds range).
    *   *Control Flags (3)*: **TF** (Trap Flag - enables single-step debugging), **IF** (Interrupt Enable - enables/disables maskable interrupts), **DF** (Direction Flag - controls string auto-increment or auto-decrement).

---
---

## Q14. Explain with examples: Immediate, Register, Direct, and Indirect Addressing Modes (7 Marks)

*   **Addressing Mode**: The method or format the 8086 microprocessor uses to locate and access operands (data) for execution.

---

### The Four Main Modes & Detailed Formulas (Write in Exam):

1.  **Immediate Addressing Mode**:
    *   *Definition*: The operand data is a constant value included directly within the instruction itself.
    *   *Example*:
        ```assembly
        MOV AX, 5000H     ; Copy hex constant 5000H into AX register
        MOV CL, 10        ; Copy decimal constant 10 into CL register
        ```
2.  **Register Addressing Mode**:
    *   *Definition*: The operand data is stored in one of the CPU registers. It executes very fast because it requires no external memory access.
    *   *Example*:
        ```assembly
        MOV AX, BX        ; Copy 16-bit BX value into AX register
        ADD CX, DX        ; Add 16-bit DX value to CX register
        ```
3.  **Direct Addressing Mode**:
    *   *Definition*: The 16-bit memory offset address of the data is written directly inside the instruction (enclosed in square brackets).
    *   *Example*:
        ```assembly
        MOV AX, [1234H]   ; Read memory location DS:1234H into AX register
        ```
    *   *Address Calculation*: If DS = 1000H, the physical memory address is calculated as:
        Physical Address = (DS x 10H) + Offset = (1000H x 10H) + 1234H = 11234H
4.  **Register Indirect Addressing Mode**:
    *   *Definition*: The memory offset address of the operand is stored in an index or base register (**BX, SI, DI,** or **BP**).
    *   *Example*:
        ```assembly
        MOV AX, [SI]      ; Load data from memory address stored in SI
        ```
    *   *Address Calculation*: If DS = 2000H and SI = 0100H:
        Physical Address = (DS x 10H) + SI = (2000H x 10H) + 0100H = 20100H

---

### Other Addressing Modes (Briefly Mention in Exam):
*   **Based Addressing**: Offset is calculated as `[BX + Offset]` or `[BP + Offset]`.
*   **Indexed Addressing**: Offset is calculated as `[SI + Offset]` or `[DI + Offset]`.
*   **Based-Indexed Addressing**: Offset is calculated as `[BX + SI]`, `[BX + DI]`, `[BP + SI]`, or `[BP + DI]`.

---
---

## Q15. How is the 8086 instruction set classified? Explain TWO categories in detail (6 Marks)

---

### Classification (Write in Exam):

The 8086 instruction set is classified into **6 functional categories**:
1.  **Data Transfer Instructions** (copies data between locations).
2.  **Arithmetic Instructions** (performs mathematical calculations).
3.  **Bit Manipulation/Logical Instructions** (performs logical AND, OR, XOR, and bit shifts).
4.  **String Instructions** (performs operations on arrays of bytes or words).
5.  **Program Execution Control Instructions** (handles loops, conditional/unconditional jumps, and calls).
6.  **Processor Control Instructions** (manages flags and system modes).

---

### Two Categories in Detail (Write in Exam):

*   **1. Data Transfer Instructions**:
    *   *Purpose*: Used to copy data bytes or words between registers, memory, and I/O ports. They do **not** affect status flags.
    *   *Key Commands & Examples*:
        *   `MOV dest, src`: Copies data.
            ```assembly
            MOV AX, 2000H     ; Copies constant 2000H into AX
            MOV BX, AX        ; Copies AX into BX
            ```
        *   `PUSH src` / `POP dest`: Pushes/pops data onto/from the stack.
            ```assembly
            PUSH AX           ; Saves AX value on stack
            POP DX            ; Restores saved value into DX
            ```
        *   `IN` / `OUT`: Reads/writes data from/to I/O ports.
            ```assembly
            IN AL, 80H        ; Read byte from port 80H into AL
            ```
*   **2. Arithmetic Instructions**:
    *   *Purpose*: Perform mathematical calculations on binary/BCD operands. They **do** update status flags (ZF, CF, SF, OF, etc.).
    *   *Key Commands & Examples*:
        *   `ADD` / `SUB`: Performs addition and subtraction.
            ```assembly
            ADD AX, BX        ; AX = AX + BX
            ```
        *   `INC` / `DEC`: Increments or decrements a register/memory location by 1.
            ```assembly
            INC CX            ; CX = CX + 1
            ```
        *   `CMP dest, src`: Compares two values by subtracting them internally and setting flags without changing the operands.
            ```assembly
            CMP AL, 5         ; Compares AL with 5
            ```
