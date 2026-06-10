# CO & MP: Unit III – Introduction to 8086 Microprocessor (Q&A)

---

## Q11. Draw the Pin Diagram of 8086 and Explain ALE, WR̅, DEN̅ and DT/R̅ (6 Marks)

### Introduction:
*   8086 is a 16-bit microprocessor.
*   It has 20 address lines (can access 1 MB memory).
*   It has 16 data lines.
*   Multiplexed bus AD0-AD15 is used to share pins for address and data.

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
    AD5      [11] ──┤            ├──  [30] HLDA (RQ̅/GT1̅)
    AD4      [12] ──┤            ├──  [29] WR̅  (LOCK̅)
    AD3      [13] ──┤            ├──  [28] M/IO̅ (S2̅)
    AD2      [14] ──┤            ├──  [27] DT/R̅ (S1̅)
    AD1      [15] ──┤            ├──  [26] DEN̅  (S0̅)
    AD0      [16] ──┤            ├──  [25] ALE  (QS0)
    NMI      [17] ──┤            ├──  [24] INTA̅ (QS1)
    INTR     [18] ──┤            ├──  [23] TEST̅
    CLK      [19] ──┤            ├──  [22] READY
    GND      [20] ──┤            └──────  [21] RESET
                    └────────────┘
```

---

### Functions of Important Pins:

1.  **ALE (Address Latch Enable)**:
    *   Output signal of 8086.
    *   Used to separate address and data from multiplexed AD0–AD15 lines.
    *   Enables external latch (like 74LS373) to store the address.
2.  **WR̅ (Write)**:
    *   Active LOW output signal.
    *   Indicates write operation.
    *   Transfers data from CPU to memory or I/O device.
3.  **DEN̅ (Data Enable)**:
    *   Active LOW output signal.
    *   Enables external data bus transceivers (like 74LS245).
    *   Allows data transfer between CPU and external devices.
4.  **DT/R̅ (Data Transmit/Receive)**:
    *   Controls direction of data flow.
    *   HIGH -> CPU transmits data (write).
    *   LOW -> CPU receives data (read).

---

### Other Pins (Briefly Mention in Exam):
*   **BHE̅ (Bus High Enable)**: Used to select the upper memory bank.
*   **MN/MX̅ (Min/Max Mode)**: Selects single-processor or multi-processor setup.

---
---

## Q12. Explain Architecture of 8086 (7 Marks)

### Introduction:
*   The 8086 architecture consists of two major functional units:
    1.  **Bus Interface Unit (BIU)**
    2.  **Execution Unit (EU)**
*   Both units work simultaneously, providing pipelined operation and increasing processing speed.

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

### 1. Bus Interface Unit (BIU):

*   **Functions**:
    *   Fetches instruction codes from memory.
    *   Handles memory and I/O data read/write.
    *   Generates the 20-bit physical memory address.
*   **Components**:
    *   **Segment Registers**: CS (Code), DS (Data), SS (Stack), ES (Extra).
    *   **Instruction Pointer (IP)**: Holds offset of next instruction.
    *   **6-Byte Instruction Queue**: Stores prefetched instructions.
    *   **Address Generation Circuit**: Shifts and adds addresses.
*   **Physical Address Calculation**:
    *   Formula:
        Physical Address = (Segment Address x 10H) + Offset Address

---

### 2. Execution Unit (EU):

*   **Functions**:
    *   Decodes instructions.
    *   Executes instructions.
    *   Controls arithmetic and logical operations.
*   **Components**:
    *   **ALU (16-bit)**: Performs mathematical and logical checks.
    *   **General Purpose Registers**: Stores active execution operands.
    *   **Flag Register**: Holds 9 active status/control flags.
    *   **Instruction Decoder**: Translates queue bytes into control signals.

---

### Pipelining Concept (Other Theory):
*   BIU fetches the next instruction while the EU is executing the current instruction.
*   This overlap reduces time waste.
*   If a branch instruction occurs, the queue is cleared (flushed), and the BIU fetches from the new address.

---

### Conclusion:
*   BIU fetches instructions while EU executes them simultaneously, improving processor performance.

---
---

## Q13. Explain Programmer's Model (Register Organization) of 8086 (7 Marks)

### Introduction:
*   8086 contains 14 user-accessible 16-bit registers organized into different functional groups.

---

### Register Layout Diagram (Draw in Exam):

```
  AX: [  AH  ][  AL  ]   (Accumulator)     CS: [   Code Segment   ]
  BX: [  BH  ][  BL  ]   (Base)            DS: [   Data Segment   ]
  CX: [  CH  ][  CL  ]   (Count)           SS: [   Stack Segment  ]
  DX: [  DH  ][  DL  ]   (Data)            ES: [   Extra Segment  ]

  SP: [ Stack Pointer ]                    IP: [Inst. Pointer     ]
  BP: [ Base Pointer  ]                  
  SI: [ Source Index  ]                    FLAGS: [Status & Control]
  DI: [ Dest. Index   ]
```

---

### 1. General Purpose Registers:

| Register | Function | Implicit Exam Usage |
| :--- | :--- | :--- |
| **AX** | Accumulator Register | Used in multiplication, division, and I/O tasks. |
| **BX** | Base Register | Holds base address pointer for data memory. |
| **CX** | Count Register | Used as a loop and shift counter. |
| **DX** | Data Register | Holds data overflow and I/O port address. |

---

### 2. Segment Registers:

| Register | Function | Default Offset Register |
| :--- | :--- | :--- |
| **CS** | Code Segment | Instruction Pointer (IP) |
| **DS** | Data Segment | Source Index (SI), Destination Index (DI), BX |
| **SS** | Stack Segment | Stack Pointer (SP), Base Pointer (BP) |
| **ES** | Extra Segment | Destination Index (DI) for strings |

---

### 3. Pointer and Index Registers:

| Register | Function |
| :--- | :--- |
| **SP** | Stack Pointer (points to top of stack) |
| **BP** | Base Pointer (points to stack data parameters) |
| **SI** | Source Index (points to source string memory) |
| **DI** | Destination Index (points to destination string memory) |
| **IP** | Instruction Pointer (holds offset of next instruction) |

---

### 4. Flag Register:

*   **Status Flags (6)**:
    *   *Carry Flag (CF)*: Set if carry/borrow occurs.
    *   *Parity Flag (PF)*: Set if result has even parity (even number of 1s).
    *   *Auxiliary Carry Flag (AF)*: Set on BCD carry.
    *   *Zero Flag (ZF)*: Set if arithmetic result is zero.
    *   *Sign Flag (SF)*: Set if result is negative (MSB is 1).
    *   *Overflow Flag (OF)*: Set if signed result exceeds range.
*   **Control Flags (3)**:
    *   *Trap Flag (TF)*: Enables single-step debugging.
    *   *Interrupt Flag (IF)*: Enables/disables maskable interrupts.
    *   *Direction Flag (DF)*: Controls string step direction (0 = increment, 1 = decrement).

---
---

## Q14. Explain Immediate, Register, Direct and Indirect Addressing Modes (7 Marks)

### Definition:
*   Addressing mode is the method used by the CPU to locate operand data.

---

### Comparison Table:

| Addressing Mode | Description | Example | Effective Offset Address |
| :--- | :--- | :--- | :--- |
| **Immediate** | Data is present in instruction itself. | `MOV AX, 5000H` | No memory access. |
| **Register** | Operand stored in register. | `MOV AX, BX` | No memory access. |
| **Direct** | Memory address specified directly. | `MOV AX, [1234H]` | `Offset = 1234H` |
| **Indirect** | Address stored in register. | `MOV AX, [SI]` | `Offset = SI` |

---

### 1. Immediate Addressing Mode:
*   Operand is part of the instruction.
*   No memory access required (fast execution).
*   *Example*:
    ```assembly
    MOV AX, 5000H  ; Copies 5000H directly into AX register
    ```

### 2. Register Addressing Mode:
*   Operand is stored in a CPU register.
*   Extremely fast since it runs inside CPU.
*   *Example*:
    ```assembly
    MOV AX, BX     ; Copies contents of BX into AX register
    ```

### 3. Direct Addressing Mode:
*   Memory address (offset) is specified directly in brackets.
*   *Example*:
    ```assembly
    MOV AX, [1234H] ; Copies word from offset 1234H into AX
    ```
*   *Physical Address Formula*:
    Physical Address = (DS x 10H) + 1234H

### 4. Register Indirect Addressing Mode:
*   Memory address is stored in BX, BP, SI, or DI register.
*   *Example*:
    ```assembly
    MOV AX, [SI]    ; Copies word from address stored in SI into AX
    ```
*   *Physical Address Formula*:
    Physical Address = (DS x 10H) + SI

---
---

## Q15. How is 8086 Instruction Set Classified? Explain Any Two Categories (6 Marks)

### Classification of 8086 Instruction Set:
1.  **Data Transfer Instructions**
2.  **Arithmetic Instructions**
3.  **Logical Instructions**
4.  **String Manipulation Instructions**
5.  **Program Control Instructions**
6.  **Processor Control Instructions**

---

### 1. Data Transfer Instructions:

*   **Purpose**: Used to transfer data between registers, memory, and I/O devices.
*   **Flag Effect**: Status flags are not affected by data copies.
*   **Common Instructions**:
    *   `MOV`: Moves data.
    *   `PUSH` / `POP`: Saves and restores stack values.
    *   `XCHG`: Exchanges values.
    *   `IN` / `OUT`: Handles I/O port data transfers.
*   **Examples**:
    ```assembly
    MOV AX, BX   ; Copy BX to AX
    PUSH AX      ; Save AX on stack
    POP DX       ; Restore stack value to DX
    ```

---

### 2. Arithmetic Instructions:

*   **Purpose**: Used to perform arithmetic operations.
*   **Flag Effect**: Updates status flags (ZF, CF, SF, etc.) based on results.
*   **Common Instructions**:
    *   `ADD` / `SUB`: Add and subtract.
    *   `MUL` / `DIV`: Multiply and divide.
    *   `INC` / `DEC`: Add 1 or subtract 1.
    *   `CMP`: Compare values by subtraction.
*   **Examples**:
    ```assembly
    ADD AX, BX   ; AX = AX + BX
    SUB AX, CX   ; AX = AX - CX
    INC DX       ; DX = DX + 1
    ```

---

### Conclusion:
*   The 8086 instruction set is divided into six categories. Data Transfer instructions move data without affecting flags, while Arithmetic instructions perform mathematical operations on data and update flags.
