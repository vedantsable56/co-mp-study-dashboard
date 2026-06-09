# CO & MP: Unit III – Introduction to 8086 Microprocessor (Q&A)

---

## Q11. Draw the pin diagram of 8086 and explain pins ALE, WR̅, DEN̅, and DT/R̅ (6 Marks)

*   **8086**:
    *   16-bit microprocessor.
    *   Has 20 address lines (1 MB memory).
    *   Has 16 data lines.
    *   Housed in a 40-pin Dual Inline Package (DIP) IC.
*   **Line Sharing**:
    *   Lower 16 address lines (A0 - A15) share pins with data lines (D0 - D15).
    *   Form the combined AD0 - AD15 bus.
    *   This reduces the physical pin count of the chip.

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
    GND      [20] ──┤            └──────  [21] RESET
                    └────────────┘
```

---

### Detailed Pin Explanations (Write in Exam):

1.  **ALE (Address Latch Enable - Pin 25)**:
    *   *Type*: Output, Active HIGH.
    *   *Role*: Used to separate address and data.
    *   *Action*: During state T1 of a bus cycle, ALE goes HIGH.
    *   *Action*: Signals external latch (74LS373) to save the address bits.
    *   *Action*: During T2, T3, T4, ALE is LOW, and pins act as data lines.
2.  **WR̅ (Write - Pin 29)**:
    *   *Type*: Output, Active LOW.
    *   *Function*: Signals memory or I/O write operations.
    *   *Action*: When LOW, tells external device to store data from the bus.
3.  **DEN̅ (Data Enable - Pin 26)**:
    *   *Type*: Output, Active LOW.
    *   *Function*: Turns on data bus transceivers (74LS245 buffer chips).
    *   *Action*: Goes LOW during T2, T3, T4 to link CPU to data lines.
4.  **DT/R̅ (Data Transmit / Receive - Pin 27)**:
    *   *Type*: Output, Direction control.
    *   *Function*: Sets direction of data flow through transceivers.
    *   *Action*: HIGH = CPU is writing (transmitting).
    *   *Action*: LOW = CPU is reading (receiving).

---
---

## Q12. Explain architecture of 8086 with BIU, EU, ALU, Instruction Queue, Registers, and Buses (7 Marks)

*   **Division**:
    *   Divided into two independent blocks: BIU and EU.
    *   Enables parallel fetch and execute (pipelining).
    *   Increases execution speed.

---

### 1. Bus Interface Unit (BIU) (Write in Exam):

*   **Role**: Handles all transfers and instruction fetching.
*   **Components**:
    *   **Segment Registers**: CS, DS, SS, ES (all 16-bit).
    *   **Segment Registers**: Point to base addresses of 64KB blocks.
    *   **Instruction Pointer (IP)**: Holds offset of next instruction.
    *   **Address Adder (Σ)**: 20-bit math unit.
    *   **Address Calculation**:
        Physical Address = (Segment Register x 10H) + Offset
    *   **Instruction Queue (6-Byte)**: Stores pre-fetched codes.
    *   *Queue Flush*: Cleared on branch/jump; new fetches start immediately.

---

### 2. Execution Unit (EU) (Write in Exam):

*   **Role**: Decodes and executes instructions.
*   **Components**:
    *   **ALU (16-bit)**: Performs math and logic operations.
    *   **Registers**: General, pointer, and index registers.
    *   **Instruction Decoder**: Translates queue bytes into CPU steps.
    *   **Flag Register**: 16-bit status register.

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

*   **Register Set**:
    *   Total of 14 user registers.
    *   All registers are 16-bit wide.
    *   Grouped by execution roles.

---

### Register Groups (Write in Exam):

*   **1. General Purpose Registers** (can be split into AH/AL, BH/BL, CH/CL, DH/DL):
    *   **AX (Accumulator)**: Used for math, division, and I/O tasks.
    *   **BX (Base)**: Holds base address pointer for data.
    *   **CX (Count)**: Loop counter and shift count register.
    *   **DX (Data)**: Stores high-order multiply/divide bits and I/O ports.
*   **2. Segment Registers** (holds base starting addresses):
    *   **CS (Code Segment)**: Holds instructions start address.
    *   **DS (Data Segment)**: Holds variables start address.
    *   **SS (Stack Segment)**: Holds stack start address.
    *   **ES (Extra Segment)**: Holds destination address for strings.
*   **3. Pointer and Index Registers** (holds offset values):
    *   **SP (Stack Pointer)**: Points to top of stack.
    *   **BP (Base Pointer)**: Accesses stack variables.
    *   **SI (Source Index)**: Points to source string.
    *   **DI (Destination Index)**: Points to destination string.
    *   **IP (Instruction Pointer)**: Holds next instruction offset.
*   **4. Flags Register (9 Active Flags)**:
    *   *Status Flags (6)*: CF (Carry), PF (Parity), AF (Aux Carry), ZF (Zero), SF (Sign), OF (Overflow).
    *   *Control Flags (3)*: TF (Trap debug), IF (Interrupt Enable), DF (Direction).

---
---

## Q14. Explain with examples: Immediate, Register, Direct, and Indirect Addressing Modes (7 Marks)

*   **Addressing Mode**: Method used by the CPU to find operand data.

---

### The Four Main Modes & Detailed Formulas (Write in Exam):

1.  **Immediate Addressing Mode**:
    *   *Definition*: Data value is inside the instruction.
    *   *Example*:
        ```assembly
        MOV AX, 5000H     ; Copy hex 5000H to AX
        MOV CL, 10        ; Copy decimal 10 to CL
        ```
2.  **Register Addressing Mode**:
    *   *Definition*: Data is stored inside CPU registers.
    *   *Example*:
        ```assembly
        MOV AX, BX        ; Copy BX to AX
        ADD CX, DX        ; Add DX to CX
        ```
3.  **Direct Addressing Mode**:
    *   *Definition*: 16-bit offset address is written inside brackets.
    *   *Example*:
        ```assembly
        MOV AX, [1234H]   ; Read from memory offset 1234H
        ```
    *   *Calculation*: If DS = 1000H:
        Physical Address = (DS x 10H) + Offset = 11234H
4.  **Register Indirect Addressing Mode**:
    *   *Definition*: Offset is stored inside pointer register (BX, SI, DI, BP).
    *   *Example*:
        ```assembly
        MOV AX, [SI]      ; Read memory at address in SI
        ```
    *   *Calculation*: If DS = 2000H and SI = 0100H:
        Physical Address = (DS x 10H) + SI = 20100H

---
---

## Q15. How is the 8086 instruction set classified? Explain TWO categories in detail (6 Marks)

---

### Classification (Write in Exam):

Classified into **6 categories**:
1.  **Data Transfer Instructions** (copies data).
2.  **Arithmetic Instructions** (performs math calculations).
3.  **Logical/Bit Instructions** (AND, OR, XOR, shifts).
4.  **String Instructions** (processes data arrays).
5.  **Program Control Instructions** (loops, jumps, calls).
6.  **Processor Control Instructions** (manages status flags).

---

### Two Categories in Detail (Write in Exam):

*   **1. Data Transfer Instructions**:
    *   *Purpose*: Copies data between registers, memory, and ports.
    *   *Rule*: Does not change status flags.
    *   *Examples*:
        ```assembly
        MOV AX, 2000H     ; Copy 2000H to AX
        PUSH AX           ; Push AX value to stack
        POP DX            ; Pop top of stack into DX
        ```
*   **2. Arithmetic Instructions**:
    *   *Purpose*: Performs math calculations.
    *   *Rule*: Updates status flags (ZF, CF, SF, etc.).
    *   *Examples*:
        ```assembly
        ADD AX, BX        ; AX = AX + BX
        INC CX            ; CX = CX + 1
        CMP AL, 5         ; Compare AL with 5
        ```
