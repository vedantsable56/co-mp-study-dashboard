# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain and illustrate even and odd memory banks with diagram. (7 Marks)

*   **Memory Banking**:
    *   8086 has a 16-bit wide data bus.
    *   Memory addresses are byte-addressable (8-bit).
    *   To allow 16-bit word access in one cycle, memory is divided.
    *   Split into Even Bank (512 KB) and Odd Bank (512 KB).

---

### Memory Banks Details (Write in Exam):

*   **Even Bank (Lower Bank)**:
    *   Stores bytes at even addresses (00000H, 00002H, 00004H, ...).
    *   Connected to lower data lines D0 - D7.
    *   Selected when address line A0 = 0.
*   **Odd Bank (Upper Bank)**:
    *   Stores bytes at odd addresses (00001H, 00003H, 00005H, ...).
    *   Connected to upper data lines D8 - D15.
    *   Selected when control line BHE̅ = 0.

---

### Detailed Access Scenarios:

1.  **Read/Write Byte at Even Address**:
    *   *Controls*: A0 = 0, BHE̅ = 1.
    *   *Action*: Only Even Bank is active. Data transfers on D0 - D7.
    *   *Cycle count*: 1 bus cycle.
2.  **Read/Write Byte at Odd Address**:
    *   *Controls*: A0 = 1, BHE̅ = 0.
    *   *Action*: Only Odd Bank is active. Data transfers on D8 - D15.
    *   *Cycle count*: 1 bus cycle.
3.  **Read/Write Aligned Word (starts at Even Address)**:
    *   *Controls*: A0 = 0, BHE̅ = 0.
    *   *Action*: Both banks active. D0-D7 transfers even byte.
    *   *Action*: D8-D15 transfers odd byte.
    *   *Cycle count*: 1 bus cycle.
4.  **Read/Write Unaligned Word (starts at Odd Address)**:
    *   *Cycle 1*: Read odd byte via D8 - D15 (A0 = 1, BHE̅ = 0).
    *   *Cycle 2*: Read even byte via D0 - D7 (A0 = 0, BHE̅ = 1).
    *   *Consequence*: Speed penalty (requires 2 bus cycles).

---

### Diagram (Draw in Exam):

```
                          8086 CPU
               ┌─────────────────────────┐
               │    16-bit Data Bus       │
               │  D0-D7      D8-D15      │
               └────┼────────────┬───────┘
                    │            │
            A0=0     │            │    BHE̅=0
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

| BHE̅ | A0 | Operation | Active Data Bus Lines | Bus Cycles |
| :---: | :---: | :--- | :---: | :---: |
| **1** | **0** | Read/Write byte at even address | D0 - D7 | 1 |
| **0** | **1** | Read/Write byte at odd address | D8 - D15 | 1 |
| **0** | **0** | Read/Write word at even address | D0 - D15 (All) | 1 |
| **1** | **1** | Idle | None | — |

---
---

## Q17. Draw and analyze read and write timing diagram of 8086. (7 Marks)

*   **Bus Cycle**: Sequence of signals for one read or write.
*   **Time slots**: Basic cycle lasts 4 clock cycles (T1, T2, T3, T4).

---

### Detailed Operations in Each T-State (Write in Exam):

*   **T1 (Address Phase)**:
    *   CPU puts address on AD0-AD15.
    *   CPU puts status on A16/S3 - A19/S6.
    *   ALE goes HIGH to save address.
    *   M/IO̅ indicates memory or I/O access.
    *   BHE̅ goes LOW if odd bank is used.
*   **T2 (Bus Turnaround / Command Phase)**:
    *   CPU removes address from AD0-AD15.
    *   DEN̅ goes LOW to enable buffers.
    *   DT/R̅ sets transfer direction.
    *   *Read*: RD̅ goes LOW; CPU floats bus lines.
    *   *Write*: WR̅ goes LOW; CPU drives data onto bus.
*   **T3 (Data Phase)**:
    *   CPU checks READY pin:
        *   READY = HIGH: Move to T4.
        *   READY = LOW: CPU inserts Wait state (Tw) for slow devices.
*   **T4 (Termination Phase)**:
    *   RD̅ or WR̅ returns to HIGH (inactive).
    *   DEN̅ goes HIGH to turn off buffers.

---

### Timing Diagrams (Draw in Exam):

```
  READ CYCLE:
          T1        T2        T3        T4
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


  WRITE CYCLE:
          T1        T2        T3        T4
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

### Key Concepts (Write in Exam):
*   **Memory-Mapped I/O**:
    *   I/O registers share memory address space.
    *   CPU treats I/O like normal memory locations.
    *   No special commands are needed.
*   **I/O-Mapped I/O (Isolated I/O)**:
    *   I/O has separate 64 KB address space.
    *   Accessed only with IN and OUT commands.

---

### Detailed Comparison Table:

| Feature | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **Address Space** | Shares memory space (1 MB) | Separate I/O space (64 KB) |
| **Control Signals** | MEMR̅ / MEMW̅ | IOR̅ / IOW̅ |
| **Instructions** | Any memory instruction (`MOV`, `ADD`) | Only `IN` and `OUT` |
| **Status Pin (M/IO̅)**| Driven HIGH (1) | Driven LOW (0) |
| **Register Limit** | Uses any general register | Must use AL or AX |
| **Address Decoding** | Requires 20-bit decoding | Requires 16-bit decoding |
| **RAM Space Impact** | Reduces RAM address range | No impact on RAM space |
| **Hardware** | Higher wire decoding complexity | Lower complexity |

---
---

## Q19. Given CS = 2000H and IP = 1234H, calculate the physical address. (4 Marks)

*   **Segmented Memory Calculation**:
    *   Shift segment register left by 4 bits (multiply by 10H).
    *   Add the 16-bit offset value.
    *   Formula:
        Physical Address = (Segment Register x 10H) + Offset Register

---

### Step-by-Step Calculations (Write in Exam):

*   **Problem 1: Given CS = 2000H, IP = 1234H**
    1.  Shift CS:
        2000H x 10H = 20000H
    2.  Add IP:
        20000H + 1234H = 21234H
    3.  *Answer*: Physical Address = 21234H
*   **Problem 2: Given DS = 1500H, SI = 0200H**
    1.  Shift DS:
        1500H x 10H = 15000H
    2.  Add SI:
        15000H + 0200H = 15200H
    3.  *Answer*: Physical Address = 15200H
*   **Problem 3: Given SS = 3000H, SP = 0100H**
    1.  Shift SS:
        3000H x 10H = 30000H
    2.  Add SP:
        30000H + 0100H = 30100H
    3.  *Answer*: Physical Address = 30100H

---

### Segmented Memory Benefits:
*   Allows 16-bit CPU to access 1 MB memory.
*   Enables dynamic code relocatability (moving code in RAM).
*   Partitions memory into distinct sections (Code, Data, Stack).

---
---

## Q20. Explain the interrupt handling mechanism in 8086 and the Interrupt Vector Table (IVT). (6 Marks)

*   **Interrupt**:
    *   Signal that pauses the current program.
    *   CPU runs an Interrupt Service Routine (ISR).
    *   Main program resumes after ISR completes.
*   **Interrupt Classes**:
    *   *Hardware*: Pins like INTR or NMI.
    *   *Software*: Commands like `INT n`.

---

### 1. Interrupt Handling Steps (Write in Exam):

1.  Complete current instruction.
2.  Push **FLAGS** register onto stack.
3.  Clear **IF** and **TF** flags to block interrupts during ISR.
4.  Push **CS** segment register onto stack.
5.  Push **IP** offset register onto stack.
6.  Get vector from IVT:
    IVT Address = Interrupt Type (n) x 4
7.  Load new **IP** and **CS** from table.
8.  Run ISR. The ISR must end with `IRET` to pop IP, CS, and FLAGS back.

---

### 2. Interrupt Vector Table (IVT) (Write in Exam):

*   **Location**: Address 00000H to 003FFH (first 1024 bytes).
*   **Size**: Holds 256 vector addresses.
*   **Fields**: Each vector is 4 bytes (2 bytes IP, 2 bytes CS).

---

### Dedicated Interrupt Types:

| Interrupt Type | Address Range | Purpose |
| :--- | :--- | :--- |
| **Type 0** | 00000H - 00003H | Divide by Zero error |
| **Type 1** | 00004H - 00007H | Single Step debugging |
| **Type 2** | 00008H - 0000BH | NMI (Non-Maskable pin) |
| **Type 3** | 0000CH - 0000FH | Breakpoint instruction |
| **Type 4** | 00010H - 00013H | Overflow exception |
| **Type 5–31** | 00014H - 0007FH | Intel reserved hardware |
| **Type 32–255** | 00080H - 003FFH | User-defined software interrupts |
