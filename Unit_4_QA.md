# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain and illustrate even and odd memory banks with diagram. (7 Marks)

*   **Memory Banking**: The 8086 is a 16-bit microprocessor with a 16-bit data bus, but physical memory is byte-addressable (each address holds an 8-bit byte). To allow the CPU to read or write a full 16-bit word in a single bus cycle, the 1 MB memory space is physically split into two parallel 512 KB memory banks: the **Even Bank** and the **Odd Bank**.

---

### Memory Banks Details (Write in Exam):

*   **Even Bank (Lower Bank)**:
    *   Stores all bytes located at even memory addresses (00000H, 00002H, 00004H, ...).
    *   Connected to the lower 8 data lines of the CPU data bus: **D0 - D7**.
    *   Activated using the address line **A0**. It is selected when **A0 = 0**.
*   **Odd Bank (Upper Bank)**:
    *   Stores all bytes located at odd memory addresses (00001H, 00003H, 00005H, ...).
    *   Connected to the upper 8 data lines of the CPU data bus: **D8 - D15**.
    *   Activated using the control line **BHE̅ (Bus High Enable)**. It is selected when **BHE̅ = 0**.

---

### Detailed Access Scenarios:

1.  **Read/Write 8-bit Byte at Even Address**:
    *   *Control Signals*: A0 = 0, BHE̅ = 1.
    *   *Operation*: Only the Even Bank is activated. Data transfers on lines **D0 - D7**. Takes **1 bus cycle**.
2.  **Read/Write 8-bit Byte at Odd Address**:
    *   *Control Signals*: A0 = 1, BHE̅ = 0.
    *   *Operation*: Only the Odd Bank is activated. Data transfers on lines **D8 - D15**. Takes **1 bus cycle**.
3.  **Read/Write Aligned 16-bit Word (Starts at Even Address)**:
    *   *Control Signals*: A0 = 0, BHE̅ = 0.
    *   *Operation*: Both memory banks are activated simultaneously. The lower byte (at even address) is read/written via D0-D7, and the upper byte (at odd address) is read/written via D8-D15. Takes **1 bus cycle**.
4.  **Read/Write Unaligned 16-bit Word (Starts at Odd Address)**:
    *   *Operation*: Requires **2 consecutive bus cycles** because the bytes are located in different physical word layouts:
        *   *Cycle 1*: CPU reads/writes the odd byte from the current odd address (A0 = 1, BHE̅ = 0) via **D8 - D15**.
        *   *Cycle 2*: CPU reads/writes the even byte from the next even address (A0 = 0, BHE̅ = 1) via **D0 - D7**.
    *   *Consequence*: Speed penalty (takes double the time of an aligned access).

---

### Diagram (Draw in Exam):

```
                          8086 CPU
               ┌─────────────────────────┐
               │    16-bit Data Bus       │
               │  D0-D7      D8-D15      │
               └────┬────────────┬───────┘
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
| **1** | **1** | No operation (Idle) | None | — |

---
---

## Q17. Draw and analyze read and write timing diagram of 8086. (7 Marks)

*   **Bus Cycle**: The sequence of signal changes on the CPU buses to perform a read or write operation with memory or I/O.
*   **T-States**: A basic bus cycle is divided into **4 clock cycles (T-states)**: **T1, T2, T3, and T4**.

---

### Detailed Operations in Each T-State (Write in Exam):

*   **T1 (Address Phase)**:
    *   The CPU places the 20-bit memory or I/O address on the multiplexed AD0-AD15 bus and status lines A16/S3 - A19/S6.
    *   **ALE (Address Latch Enable)** goes HIGH. The falling edge of ALE latches the address into external registers.
    *   **M/IO̅** is driven HIGH (for memory access) or LOW (for I/O access) to select the correct space.
    *   **BHE̅** goes LOW if data needs to be accessed from the Odd Bank.
*   **T2 (Bus Turnaround / Command Phase)**:
    *   The CPU removes the address from the multiplexed bus AD0-AD15 to prepare it for data transfer.
    *   **DEN̅ (Data Enable)** goes LOW to enable data bus transceivers.
    *   **DT/R̅** is set to HIGH (transmitting/writing) or LOW (receiving/reading).
    *   *For Read*: **RD̅** goes LOW. The CPU floats the AD0-AD15 pins so the memory/device can drive them.
    *   *For Write*: **WR̅** goes LOW. The CPU drives the write data onto the AD0-AD15 bus.
*   **T3 (Data Phase)**:
    *   The data bus carries the valid data.
    *   The CPU samples the state of the **READY** pin:
        *   If **READY = HIGH**, the cycle moves directly to T4.
        *   If **READY = LOW** (indicating a slow device), the CPU inserts a **Wait State (Tw)**. The bus signals remain frozen until READY goes HIGH.
*   **T4 (Termination Phase)**:
    *   The control signals **RD̅** or **WR̅** return to HIGH (inactive).
    *   **DEN̅** returns to HIGH, disabling the transceivers and disconnecting the CPU from the external bus.

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
*   **Memory-Mapped I/O**: The CPU treats registers in I/O interface chips exactly like memory locations. These registers share the same 1 MB physical memory address space. No dedicated I/O instructions are needed.
*   **I/O-Mapped I/O (Isolated I/O)**: The CPU treats I/O devices as separate from memory. The CPU has a dedicated 64 KB I/O address space, accessed only using specific `IN` and `OUT` instructions.

---

### Detailed Comparison Table:

| Feature | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **Address Space** | Shares the memory space (1 MB space) | Separate, dedicated I/O space (64 KB space) |
| **Control Signals** | MEMR̅ / MEMW̅ | IOR̅ / IOW̅ |
| **Instructions** | Any memory instruction (`MOV`, `ADD`, `AND`) | Only `IN` and `OUT` instructions |
| **Status Pin (M/IO̅)**| Driven HIGH (1) | Driven LOW (0) |
| **Register Limit** | Operands can use any general CPU register | Operands must use AL (8-bit) or AX (16-bit) |
| **Address Decoding** | Requires full 20-bit address decoding | Requires only 16-bit address decoding |
| **RAM Space Impact** | Reduces the available address range for RAM | Does not reduce RAM space |
| **Hardware Complexity**| Higher (more address lines to decode) | Lower (simpler decoding circuit) |

---
---

## Q19. Given CS = 2000H and IP = 1234H, calculate the physical address. (4 Marks)

*   **Segmented Memory Calculation**: The 8086 has a 20-bit physical address but uses 16-bit registers. To calculate the 20-bit physical address, the 16-bit segment register value is shifted left by 4 bits (which is mathematically equivalent to multiplying by 10H) and added to the 16-bit offset:
    Physical Address = (Segment Register x 10H) + Offset Register

---

### Step-by-Step Calculations (Write in Exam):

*   **Problem 1: Given CS = 2000H, IP = 1234H**
    1.  Shift CS left by 1 hex digit (multiply by 10H):
        2000H x 10H = 20000H
    2.  Add the IP offset value:
        20000H + 1234H = 21234H
    3.  *Answer*: **Physical Address = 21234H**
*   **Problem 2: Given DS = 1500H, SI = 0200H**
    1.  Shift DS:
        1500H x 10H = 15000H
    2.  Add the SI offset value:
        15000H + 0200H = 15200H
    3.  *Answer*: **Physical Address = 15200H**
*   **Problem 3: Given SS = 3000H, SP = 0100H**
    1.  Shift SS:
        3000H x 10H = 30000H
    2.  Add the SP offset value:
        30000H + 0100H = 30100H
    3.  *Answer*: **Physical Address = 30100H**

---

### Advantages of Segmented Memory:
*   Allows the 16-bit processor to address up to 1 MB of memory.
*   Enables dynamic program relocatability (moving code/data segments in RAM by changing only segment registers).
*   Allows clear partitioning of memory into separate sections for Code, Data, and Stack.

---
---

## Q20. Explain the interrupt handling mechanism in 8086 and the Interrupt Vector Table (IVT). (6 Marks)

*   **Interrupt**: An asynchronous signal sent to the CPU that pauses the current program execution, redirects the CPU to run an **Interrupt Service Routine (ISR)**, and resumes the original program afterward.
*   **Classification**:
    *   *Hardware Interrupts*: Triggered via physical pins (INTR or NMI).
    *   *Software Interrupts*: Triggered using instructions like `INT n` or errors (divide by zero).

---

### 1. Interrupt Handling Steps (Write in Exam):

When the CPU accepts an interrupt, it executes the following sequence:
1.  Completes execution of the current instruction.
2.  Pushes the **FLAGS** register onto the stack to save the CPU status.
3.  Clears the **IF (Interrupt Flag)** and **TF (Trap Flag)** to disable further interrupts during ISR execution.
4.  Pushes the current **CS** segment register value onto the stack.
5.  Pushes the current **IP** instruction pointer value onto the stack (saving the return address).
6.  Calculates the vector address in the Interrupt Vector Table:
    IVT Address = Interrupt Type (n) x 4
7.  Loads the new **IP** from the calculated IVT address, and the new **CS** from the next word (IVT address + 2).
8.  Executes the ISR. The ISR must end with the `IRET` (Interrupt Return) instruction, which pops IP, CS, and FLAGS back from the stack to resume the main program.

---

### 2. Interrupt Vector Table (IVT) (Write in Exam):

*   **Location**: Always located in the first 1024 bytes of memory, from **00000H to 003FFH**.
*   **Vectors**: The table stores 256 interrupt vectors.
*   **Vector Size**: Each vector is **4 bytes** wide (2 bytes for the offset IP, 2 bytes for the segment CS).

---

### Dedicated Interrupt Types:

| Interrupt Type | Address Range | Purpose |
| :--- | :--- | :--- |
| **Type 0** | 00000H - 00003H | Divide by Zero error (triggered automatically by ALU) |
| **Type 1** | 00004H - 00007H | Single Step execution (used by debuggers when TF = 1) |
| **Type 2** | 00008H - 0000BH | NMI (Non-Maskable Interrupt pin, e.g., power failure) |
| **Type 3** | 0000CH - 0000FH | Breakpoint instruction (INT 3, used in debugging) |
| **Type 4** | 00010H - 00013H | Overflow exception (INTO instruction) |
| **Type 5–31** | 00014H - 0007FH | Reserved by Intel for hardware support |
| **Type 32–255** | 00080H - 003FFH | User-defined software interrupts (e.g., INT 21H DOS APIs) |
