# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain Even and Odd Memory Banks of 8086 (7 Marks)

### Introduction:
*   The 8086 has a 16-bit data bus but memory is byte-addressable (each address holds 8 bits).
*   To access a full 16-bit word in one clock cycle, memory is divided into Even Bank and Odd Bank.

---

### Even and Odd Banks:

*   **Even Bank (Lower Bank)**:
    *   Stores bytes at even addresses (00000H, 00002H, 00004H, etc.).
    *   Connected to the lower data lines D0–D7 of the data bus.
    *   Selected by address line A0 when A0 = 0.
*   **Odd Bank (Upper Bank)**:
    *   Stores bytes at odd addresses (00001H, 00003H, 00005H, etc.).
    *   Connected to the upper data lines D8–D15 of the data bus.
    *   Selected by control line BHE̅ (Bus High Enable) when BHE̅ = 0.

---

### Core Theory of Word Access (Write in Exam):
*   **Aligned Word Access**: Starts at an even address. CPU selects A0 = 0 and BHE̅ = 0, reading the whole 16-bit word in 1 bus cycle.
*   **Unaligned Word Access**: Starts at an odd address. Requires 2 bus cycles, which slows down the processor.
    *   *Cycle 1*: Reads the odd byte via D8-D15.
    *   *Cycle 2*: Reads the next even byte via D0-D7.

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

| BHE̅ | A0 | Operation | Active Data Lines |
| :---: | :---: | :--- | :--- |
| **1** | **0** | Even bank selected. | D0 - D7 (transfers lower byte). |
| **0** | **1** | Odd bank selected. | D8 - D15 (transfers upper byte). |
| **0** | **0** | Both banks selected. | D0 - D15 (transfers full 16-bit word). |
| **1** | **1** | No bank selected. | None (bus remains idle). |

---

### Conclusion:
*   Memory banking allows 8086 to access 16-bit words efficiently in a single cycle if they are aligned.

---
---

## Q17. Read and Write Timing Diagram of 8086 (7 Marks)

### Introduction:
*   A bus cycle is the sequence of events when the CPU reads or writes memory/IO.
*   It consists of four clock states (T-states): T1, T2, T3, and T4.

---

### Detailed T-State Functions:

*   **T1 (Address Phase)**:
    *   The 20-bit address is placed on the multiplexed AD0-AD15 bus.
    *   ALE (Address Latch Enable) pulses HIGH to lock the address into external latches.
*   **T2 (Bus Turnaround)**:
    *   CPU removes the address to prepare the lines for data transfer.
    *   DEN̅ goes LOW to enable transceivers, and RD̅ or WR̅ is activated.
*   **T3 (Data Phase)**:
    *   Data is read from or written to the bus.
    *   CPU checks the READY pin. If READY = 0 (slow device), CPU inserts Wait states (Tw) until READY becomes 1.
*   **T4 (Termination)**:
    *   Control signals (RD̅/WR̅) go HIGH (inactive).
    *   DEN̅ goes HIGH to disconnect transceivers from the bus.

---

### Read Cycle:
*   RD̅ becomes LOW, and the memory drives data onto the bus for the CPU to read.

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
```

---

### Write Cycle:
*   WR̅ becomes LOW, and the CPU drives data onto the bus to be written to memory.

```
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

## Q18. Compare Memory-Mapped I/O and I/O-Mapped I/O (8 Marks)

### Core Theory (Write in Exam):
*   **Memory-Mapped I/O (MMIO)**: I/O devices share the same address space as RAM. The CPU accesses I/O ports using standard memory instructions.
*   **I/O-Mapped I/O (Isolated I/O)**: I/O ports are placed in a separate address space. The CPU uses the M/IO̅ pin to select between memory (M/IO̅ = 1) and I/O (M/IO̅ = 0).

---

### Comparison Table:

| Feature | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **Address Space** | Shares memory space with RAM. | Separate I/O space isolated from RAM. |
| **Address Range** | 1 MB (same limit as system RAM). | 64 KB (limited to I/O ports). |
| **Instructions Used** | Any memory instruction (like `MOV`, `ADD`). | Only `IN` and `OUT` instructions can be used. |
| **Registers Used** | Any CPU register can store port data. | Only `AL` (8-bit) or `AX` (16-bit) can be used. |
| **Memory Impact** | Reduces available RAM space. | Has no effect on memory space. |
| **Hardware** | Complex address decoding logic is required. | Simple and cheap address decoding logic. |
| **Speed** | Faster due to memory-access optimizations. | Slower due to port-access overhead. |
| **Flexibility** | More flexible (many instruction types). | Less flexible (restricted to IN/OUT commands). |

---

### Conclusion:
*   Memory-mapped I/O provides high programming flexibility, while I/O-mapped I/O saves valuable memory space.

---
---

## Q19. Calculate Physical Address (4 Marks)

### Segmented Memory Theory:
*   The 8086 uses a 20-bit physical address to access 1 MB of RAM, but its registers are only 16-bit.
*   To generate a 20-bit address, the CPU shifts the 16-bit Segment Address left by 4 bits (equivalent to multiplying by 10H) and adds the 16-bit Offset Address.

---

### Formula:
Physical Address = (Segment Address x 10H) + Offset Address

---

### Example Calculation:

*   **Given**:
    *   Segment Address (CS) = **2000H**
    *   Offset Address (IP) = **1234H**
*   **Calculation**:
    1.  Multiply Segment Address by 10H:
        2000H x 10H = 20000H
    2.  Add Offset Address:
        20000H + 1234H = 21234H
*   **Answer**:
    *   Physical Address = **21234H**

---

### Additional Revision Examples:
*   *Given*: DS = 1500H, SI = 0200H
    *   Physical Address = (1500H x 10H) + 0200H = 15200H
*   *Given*: SS = 3000H, SP = 0100H
    *   Physical Address = (3000H x 10H) + 0100H = 30100H

---
---

## Q20. Explain Interrupt Handling Mechanism and IVT (6 Marks)

### Interrupt Theory:
*   An interrupt is an emergency signal that temporarily stops the current program and transfers CPU control to an Interrupt Service Routine (ISR).
*   *Hardware Interrupts*: Triggered via CPU pins (INTR, NMI).
*   *Software Interrupts*: Triggered using `INT n` instructions.

---

### Interrupt Handling Steps:
1.  **Complete instruction**: CPU finishes the current running instruction.
2.  **Push FLAGS**: Saves status flags on the stack.
3.  **Clear IF & TF**: Disables debug mode and maskable interrupts during ISR.
4.  **Push CS**: Saves the return segment address on the stack.
5.  **Push IP**: Saves the return offset address on the stack.
6.  **Fetch address**: Calculates IVT offset (n x 4) and loads new CS and IP.
7.  **Execute ISR**: CPU runs the interrupt handler code.
8.  **Return**: Ends with `IRET` to pop IP, CS, and FLAGS back to resume.

---

### Interrupt Vector Table (IVT):

| Feature | Value | Explanation |
| :--- | :--- | :--- |
| **Location** | 00000H – 003FFH | Stored in the lowest 1024 bytes of RAM. |
| **Size** | 1 KB | Fixed size in system memory. |
| **Entries** | 256 vector addresses | Supports up to 256 different interrupt types. |
| **Entry Size** | 4 Bytes | 2 bytes store the IP offset, 2 bytes store CS. |

---

### Conclusion:
*   The IVT stores the entry addresses of interrupt service routines, allowing the 8086 to handle external events quickly.
