# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain and illustrate even and odd memory banks with diagram. (7 Marks)

*   **Memory Banking**: The 8086 has a 16-bit data bus but is byte-addressable. To read or write a 16-bit word in one bus cycle, the 1 MB memory is physically divided into two 512 KB banks: **Even Bank** and **Odd Bank**.

---

### Memory Banks (Write in Exam):

*   **Even Bank (Lower Bank)**:
    *   Holds all bytes at even addresses (00000H, 00002H, 00004H, ...).
    *   Connected to the lower data lines **D0 - D7**.
    *   Activated when address line **A0 = 0**.
*   **Odd Bank (Upper Bank)**:
    *   Holds all bytes at odd addresses (00001H, 00003H, 00005H, ...).
    *   Connected to the upper data lines **D8 - D15**.
    *   Activated when control line **BHE̅ (Bus High Enable) = 0**.
*   **Aligned Word Access (1 Cycle)**:
    *   A 16-bit word starts at an even address (e.g., 00004H). Its lower byte is in the even bank, upper byte in the odd bank.
    *   The CPU sets A0 = 0 and BHE̅ = 0, reading/writing the whole word in **one bus cycle**.
*   **Unaligned Word Access (2 Cycles)**:
    *   A 16-bit word starts at an odd address (e.g., 00003H).
    *   The CPU must perform **two separate bus cycles**:
        *   *Cycle 1*: Read odd byte via D8-D15.
        *   *Cycle 2*: Read even byte via D0-D7.
    *   This creates a **speed penalty**.

---

### Diagram (Draw in Exam):

```
                          8086 CPU
               ┌─────────────────────────┐
               │    16-bit Data Bus       │
               │  D0-D7      D8-D15      │
               └────┬────────────┬───────┘
                    │            │
           A₀=0     │            │    BHE̅=0
         (select)   │            │   (select)
                    ▼            ▼
         ┌──────────────┐ ┌──────────────┐
         │  EVEN BANK   │ │  ODD BANK    │
         │ (Lower Bank) │ │ (Upper Bank) │
         │              │ │              │
         │ Addr 00000H  │ │ Addr 00001H  │
         │ Addr 00002H  │ │ Addr 00003H  │
         │     ...      │ │     ...      │
         │  512 KB      │ │  512 KB      │
         └──────────────┘ └──────────────┘
```

---

### Bank Selection Table:

| BHE̅ | A_0 | Operation | Active Data Bus Lines | Bus Cycles |
| :---: | :---: | :--- | :---: | :---: |
| **1** | **0** | Read/Write byte at even address | D0 - D7 | 1 |
| **0** | **1** | Read/Write byte at odd address | D8 - D15 | 1 |
| **0** | **0** | Read/Write word at even address | D0 - D15 (All) | 1 |
| **1** | **1** | No operation (Idle) | None | — |

---
---

## Q17. Draw and analyze read and write timing diagram of 8086. (7 Marks)

*   **Bus Cycle**: The sequence of signals on the bus to read or write 1 byte/word.
*   **Basic Bus Cycle**: Lasts **4 clock cycles (T-states)**: T_1, T_2, T_3, and T_4.

---

### The Four States (Write in Exam):

*   **T_1 (Address Phase)**:
    *   CPU places the memory/device address on the multiplexed AD0-AD15 bus.
    *   **ALE (Address Latch Enable)** goes HIGH. This pulses external latches to lock and save the address.
    *   M/\overline{IO} selects memory (HIGH) or I/O (LOW).
*   **T_2 (Bus Transition)**:
    *   CPU stops sending address.
    *   *For Read*: RD̅ goes LOW, CPU floats the data bus to receive data.
    *   *For Write*: WR̅ goes LOW, CPU writes data onto the bus.
    *   **DEN̅** goes LOW to turn on transceivers.
*   **T_3 (Data Transfer)**:
    *   Data is sampled (Read) or saved (Write).
    *   CPU checks the **READY** pin. If READY is LOW (slow device), the CPU inserts **Wait States (T_w)** until READY goes HIGH.
*   **T_4 (Termination)**:
    *   RD̅ or WR̅ returns to HIGH (inactive).
    *   DEN̅ goes HIGH, disconnecting transceivers.

---

### Timing Diagrams (Draw in Exam):

```
  READ CYCLE:
          T₁        T₂        T₃        T₄
       ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐
 CLK   │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │
     ──┘  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘  ───
       ┌─────┐
 ALE   │     │
     ──┘     └─────────────────────────────────────────
     ──┬───────────┬──────────────────────┬────────────
 AD   │  ADDRESS  │◄──── DATA IN ────────│
 0-15 │ (A0-A15)  │  (from memory)       │
     ──┴───────────┴──────────────────────┴────────────
                   ┌─────────────────────┐
 RD̅   ─────────────┘                     └─────────────
       (HIGH)         (LOW = Active)        (HIGH)


  WRITE CYCLE: (Similar to Read, but WR̅ and Data Out are active)
          T₁        T₂        T₃        T₄
      ──┬───────────┬──────────────────────┬───────────
 AD   │  ADDRESS  │◄── DATA OUT ─────────│
 0-15 │ (A0-A15)  │ (from CPU to memory) │
     ──┴───────────┴──────────────────────┴───────────
                   ┌─────────────────────┐
 WR̅   ─────────────┘                     └─────────────
       (HIGH)         (LOW = Active)        (HIGH)
```

---
---

## Q18. Compare Memory-Mapped I/O and I/O-Mapped I/O. (8 Marks)

---

### Key Points (Write in Exam):
*   **Memory-Mapped I/O**: The CPU treats I/O devices like normal memory locations. I/O registers share the same 1 MB memory address space.
*   **I/O-Mapped I/O (Isolated I/O)**: I/O devices have a separate 64 KB space. CPU must use `IN` and `OUT` instructions to communicate.

---

### Comparison Table:

| Feature | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **Address Space** | Shares memory space (1 MB) | Separate I/O space (64 KB) |
| **Control Signals** | \overline{MEMR} / \overline{MEMW} | \overline{IOR} / \overline{IOW} |
| **Instructions** | `MOV`, `ADD`, `AND`, etc. | Only `IN` and `OUT` |
| **Status Pin (M/\overline{IO})**| HIGH (1) | LOW (0) |
| **Register Limit** | Any register can be used | Only AL or AX |
| **Address Lines** | 20-bit decoding | 16-bit decoding |
| **RAM Space Impact** | Reduces available memory | Preserves full memory space |

---
---

## Q19. Given CS = 2000H and IP = 1234H, calculate the physical address. (4 Marks)

*   *Formula*:
    Physical Address = (Segment Register * 10H) + Offset Register

---

### Step-by-Step Calculations (Write in Exam):

*   **Problem 1: Given CS = 2000H, IP = 1234H**
    1.  Shift CS left by 1 hex digit (multiply by 10H):
        2000\text{H} x 10\text{H} = \mathbf{20000\text{H}}
    2.  Add IP offset:
        20000\text{H} + 1234\text{H} = \mathbf{21234\text{H}}
    3.  *Answer*: **Physical Address = 21234H**
*   **Problem 2: Given DS = 1500H, SI = 0200H**
    1.  Shift DS:
        1500\text{H} x 10\text{H} = \mathbf{15000\text{H}}
    2.  Add SI offset:
        15000\text{H} + 0200\text{H} = \mathbf{15200\text{H}}
    3.  *Answer*: **Physical Address = 15200H**
*   **Problem 3: Given SS = 3000H, SP = 0100H**
    1.  Shift SS:
        3000\text{H} x 10\text{H} = \mathbf{30000\text{H}}
    2.  Add SP offset:
        30000\text{H} + 0100\text{H} = \mathbf{30100\text{H}}
    3.  *Answer*: **Physical Address = 30100H**

---
---

## Q20. Explain the interrupt handling mechanism in 8086 and the Interrupt Vector Table (IVT). (6 Marks)

*   **Interrupt**: A signal that pauses the current program, runs an **Interrupt Service Routine (ISR)**, and resumes the program.

---

### 1. Interrupt Handling Steps (Write in Exam):
1.  Complete the current instruction.
2.  Push **FLAGS** register onto the stack.
3.  Clear **IF** and **TF** flags to disable interrupts during ISR.
4.  Push **CS** and **IP** onto the stack (saves return address).
5.  Find IVT address:
    IVT Address = Interrupt Type * 4
6.  Load new **IP** and **CS** from the calculated IVT memory location.
7.  Run the ISR code.
8.  ISR ends with `IRET` (Interrupt Return), which pops IP, CS, and FLAGS back to resume the main program.

---

### 2. Interrupt Vector Table (IVT) (Write in Exam):
*   **Location**: Resides in the first 1024 bytes of RAM (addresses **00000H to 003FFH**).
*   **Capacity**: Stores 256 vector addresses.
*   **Vector Size**: Each vector is **4 bytes** (2 bytes for IP offset, 2 bytes for CS segment).

---

### Dedicated Interrupt Types:

| Interrupt Type | Address Range | Purpose |
| :--- | :--- | :--- |
| **Type 0** | 00000H - 00003H | Divide by Zero error |
| **Type 1** | 00004H - 00007H | Single Step debugging |
| **Type 2** | 00008H - 0000BH | NMI (Non-Maskable Pin) |
| **Type 3** | 0000CH - 0000FH | Breakpoint (INT 3) |
| **Type 4** | 00010H - 00013H | Overflow (INTO) |
| **Type 32–255** | 00080H - 003FFH | User-defined software interrupts |
