# CO & MP: Unit III – Introduction to 8086 Microprocessor (Q&A)

---

## Q11. Draw the pin diagram of 8086 and explain pins ALE, WR̅, DEN̅, and DT/R̅ (6 Marks)

*   **8086**: 16-bit microprocessor with a 40-pin Dual Inline Package (DIP) IC.
*   **Multiplexing**: Lower address lines A0 - A15 are shared with data lines D0 - D15 to form the combined bus AD0 - AD15 (saving physical pins).

---

### Pin Diagram (Draw in Exam):

```
                    ┌────────────┐
        GND  [1]  ──┤            ├──  [40] VCC (+5V)
    AD14     [2]  ──┤            ├──  [39] AD15
    AD13     [3]  ──┤            ├──  [38] A16/S3
    AD12     [4]  ──┤            ├──  [37] A17/S4
    AD11     [5]  ──┤            ├──  [36] A18/S5
    AD10     [6]  ──┤            ├──  [35] A19/S6
    AD9      [7]  ──┤            ├──  [34] BHE̅/S7
    AD8      [8]  ──┤    8086    ├──  [33] MN/MX̅
    AD7      [9]  ──┤            ├──  [32] RD̅
    AD6      [10] ──┤            ├──  [31] HOLD (RQ̅/GT0̅)
    AD5      [11] ──┤            ├──  [30] HLDA (RQ̅/GT1̅)
    AD4      [12] ──┤            ├──  [29] WR̅  (LOCK̅)
    AD3      [13] ──┤            ├──  [28] M/IO̅ (S2)
    AD2      [14] ──┤            ├──  [27] DT/R̅ (S1)
    AD1      [15] ──┤            ├──  [26] DEN̅  (S0)
    AD0      [16] ──┤            ├──  [25] ALE  (QS0)
    NMI      [17] ──┤            ├──  [24] INTA̅ (QS1)
    INTR     [18] ──┤            ├──  [23] TEST̅
    CLK      [19] ──┤            ├──  [22] READY
    GND      [20] ──┤            ├──  [21] RESET
                    └────────────┘
```

---

### Explanation of the Four Pins (Write in Exam):

1.  **ALE (Address Latch Enable - Pin 25)**:
    *   *Type*: Output, Active HIGH.
    *   *Function*: Used to demultiplex the address/data bus.
    *   *Action*: During state T_1 of a bus cycle, ALE goes HIGH. This commands an external latch (74LS373) to lock and save the address bits.
2.  **WR̅ (Write - Pin 29)**:
    *   *Type*: Output, Active LOW.
    *   *Function*: Signals that the CPU is writing data out.
    *   *Action*: When LOW, it tells memory or I/O devices to read data currently placed on the data bus.
3.  **DEN̅ (Data Enable - Pin 26)**:
    *   *Type*: Output, Active LOW.
    *   *Function*: Turns on the data bus transceivers (74LS245 buffer chips).
    *   *Action*: Active during T_2, T_3, T_4 to connect the CPU to the data lines.
4.  **DT/R̅ (Data Transmit / Receive - Pin 27)**:
    *   *Type*: Output, Direction set.
    *   *Function*: Controls the direction of data flow through transceivers.
    *   *Action*: HIGH (1) = CPU is Transmitting (writing). LOW (0) = CPU is Receiving (reading).

---
---

## Q12. Explain architecture of 8086 with BIU, EU, ALU, Instruction Queue, Registers, and Buses (7 Marks)

*   **Key Concept**: Internal architecture is split into two independent blocks: **Bus Interface Unit (BIU)** and **Execution Unit (EU)**.
*   This split allows **pipelining** (fetching next command while running current one).

---

### 1. Bus Interface Unit (BIU) (Write in Exam):
*   **Role**: Handles all communication with external memory/devices.
*   **Components**:
    *   *Segment Registers*: **CS** (Code), **DS** (Data), **SS** (Stack), **ES** (Extra). 16-bit registers pointing to memory base zones.
    *   *Instruction Pointer (IP)*: Holds offset of next instruction.
    *   *Address Adder (Σ)*: 20-bit logic that calculates physical addresses:
        Physical Address = (Segment Register * 10H) + Offset
    *   *Instruction Queue*: 6-Byte FIFO buffer. Pre-fetches instruction code ahead of time (pipelining).

---

### 2. Execution Unit (EU) (Write in Exam):
*   **Role**: Decodes and runs instructions.
*   **Components**:
    *   *ALU*: 16-bit calculator performing math (+, -, *, /) and logic (AND, OR, XOR) operations.
    *   *General Registers*: Holds temporary data (**AX, BX, CX, DX**).
    *   *Pointer/Index Registers*: Holds offset addresses (**SP, BP, SI, DI**).
    *   *Instruction Decoder*: Translates queue bytes into commands.
    *   *Flag Register*: 16-bit register tracking CPU flags.

---

### Block Diagram (Draw in Exam):

```
  ┌──────────────────────────────────────────────────────────────────┐
  │                         8086 CPU                                 │
  │                                                                  │
  │  ┌─────────────────────────┐        ┌─────────────────────────┐  │
  │  │   BIU (Bus Interface)   │        │   EU (Execution Unit)   │  │
  │  │  Segment Regs (CS,DS,   │        │  General Regs (AX, BX,  │  │
  │  │  SS, ES) & IP           │        │  CX, DX, SP, BP, SI, DI)│  │
  │  └──────────┬──────────────┘        └────────────▲────────────┘  │
  │             │ 20-bit                             │               │
  │             ▼ Address                            │               │
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

*   **Total Registers**: 14 user-accessible registers, all 16-bit.

---

### Register Groups (Write in Exam):

*   **General Purpose / Data Registers** (can be split into High/Low 8-bit registers):
    *   **AX (Accumulator)**: AX = AH/AL. Primary register for math, multiplication, division, and I/O.
    *   **BX (Base)**: BX = BH/BL. Holds base address pointer for memory tables.
    *   **CX (Count)**: CX = CH/CL. Loop counter for loops and bit shifts.
    *   **DX (Data)**: DX = DH/DL. Used for division, multiplication, and storing I/O port addresses.
*   **Segment Registers** (holds base starting address of 64KB blocks):
    *   **CS (Code Segment)**: Points to memory block with executable code.
    *   **DS (Data Segment)**: Points to memory block with variables and active data.
    *   **SS (Stack Segment)**: Points to memory block storing the Stack.
    *   **ES (Extra Segment)**: Points to extra data space (used in string commands).
*   **Pointer and Index Registers** (used as offsets within segments):
    *   **SP (Stack Pointer)**: Paired with SS. Points to top of stack.
    *   **BP (Base Pointer)**: Paired with SS. Points to parameter data on stack.
    *   **SI (Source Index)**: Paired with DS. Points to source memory in string copies.
    *   **DI (Destination Index)**: Paired with ES. Points to destination memory in string copies.
    *   **IP (Instruction Pointer)**: Paired with CS. Points to next instruction offset.
*   **Flags Register** (tracks state and controls execution):
    *   *Status Flags (6)*: **CF** (Carry), **PF** (Parity), **AF** (Aux Carry), **ZF** (Zero), **SF** (Sign), **OF** (Overflow).
    *   *Control Flags (3)*: **TF** (Trap debugging), **IF** (Interrupt Enable), **DF** (Direction of strings).

---
---

## Q14. Explain with examples: Immediate, Register, Direct, and Indirect Addressing Modes (7 Marks)

*   **Addressing Mode**: The method the CPU uses to locate its operand data.

---

### The Four Modes (Write in Exam):

1.  **Immediate Addressing Mode**:
    *   *Definition*: Data is a constant value written directly inside the instruction.
    *   *Example*:
        ```assembly
        MOV AX, 5000H     ; Copy hex constant 5000H into AX
        MOV CL, 0AH       ; Copy decimal 10 into CL
        ```
2.  **Register Addressing Mode**:
    *   *Definition*: Data is located inside one of the CPU's registers. Extremely fast (no memory access).
    *   *Example*:
        ```assembly
        MOV AX, BX        ; Copy BX value into AX
        ADD CX, DX        ; Add DX to CX
        ```
3.  **Direct Addressing Mode**:
    *   *Definition*: The 16-bit offset address of memory is written directly inside the instruction using brackets.
    *   *Example*:
        ```assembly
        MOV AX, [1234H]   ; Read memory location DS:1234H into AX
        ```
        *   *Formula*: If DS = 1000H, Physical Address = (1000\text{H} x 10\text{H}) + 1234\text{H} = 11234\text{H}.
4.  **Register Indirect Addressing Mode**:
    *   *Definition*: The memory offset is stored inside a register pointer (**BX, SI, DI,** or **BP**).
    *   *Example*:
        ```assembly
        MOV AX, [SI]      ; Load data from memory address stored in SI
        ```
        *   *Formula*: If DS = 2000H and SI = 0100H, Physical Address = (2000\text{H} x 10\text{H}) + 0100\text{H} = 20100\text{H}.

---
---

## Q15. How is the 8086 instruction set classified? Explain TWO categories in detail (6 Marks)

---

### Classification (Write in Exam):
The instruction set is split into **6 categories**:
1.  **Data Transfer** (copies files/values).
2.  **Arithmetic** (math calculations).
3.  **Logical** (AND, OR, shifts).
4.  **String** (handles data blocks).
5.  **Program Control** (loops, jumps, calls).
6.  **Processor Control** (manages flags/modes).

---

### Two Categories in Detail (Write in Exam):

*   **1. Data Transfer Instructions**:
    *   *Purpose*: Move values between registers, memory, and I/O ports. They do **not** affect CPU flags.
    *   *Key Commands*:
        *   `MOV dest, src`: Copies data.
        *   `PUSH src` / `POP dest`: Pushes/pops 16-bit data to/from the stack.
        *   `IN` / `OUT`: Communicates with external I/O ports.
    *   *Examples*:
        ```assembly
        MOV AX, BX        ; Copy BX to AX
        PUSH DX           ; Save DX on stack
        IN AL, 60H        ; Read byte from I/O port 60H
        ```
*   **2. Arithmetic Instructions**:
    *   *Purpose*: Perform mathematical calculations. They **do** update status flags (ZF, CF, SF, etc.).
    *   *Key Commands*:
        *   `ADD` / `SUB`: Performs addition and subtraction.
        *   `INC` / `DEC`: Adds or subtracts 1.
        *   `CMP dest, src`: Compares two values by subtracting them internally (modifies flags, discards result).
    *   *Examples*:
        ```assembly
        ADD AX, 1000H     ; AX = AX + 1000H
        DEC CX            ; CX = CX - 1
        CMP AL, BL        ; Compare AL and BL (sets zero/carry flags)
        ```
