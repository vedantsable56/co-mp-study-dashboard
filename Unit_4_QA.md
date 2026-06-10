# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain Even and Odd Memory Banks of 8086 (7 Marks)

### Introduction:
*   8086 has a 16-bit data bus and 1 MB memory space.
*   To access 16-bit data efficiently, memory is divided into Even Bank and Odd Bank.

---

### Even and Odd Banks:

*   **Even Bank**:
    *   Stores bytes at even addresses (00000H, 00002H, etc.).
    *   Connected to data lines D0–D7.
    *   Selected when address line A0 = 0.
*   **Odd Bank**:
    *   Stores bytes at odd addresses (00001H, 00003H, etc.).
    *   Connected to data lines D8–D15.
    *   Selected when control line BHE̅ = 0.

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

| BHE̅ | A0 | Operation |
| :---: | :---: | :--- |
| **1** | **0** | Even bank selected |
| **0** | **1** | Odd bank selected |
| **0** | **0** | Both banks selected |
| **1** | **1** | No bank selected |

---

### Detailed Access Scenarios (Other Points):
1.  **Read/Write Byte at Even Address**:
    *   A0 = 0, BHE̅ = 1.
    *   Uses data lines D0-D7.
    *   Takes 1 bus cycle.
2.  **Read/Write Byte at Odd Address**:
    *   A0 = 1, BHE̅ = 0.
    *   Uses data lines D8-D15.
    *   Takes 1 bus cycle.
3.  **Aligned Word (starts at Even Address)**:
    *   A0 = 0, BHE̅ = 0.
    *   Uses data lines D0-D15.
    *   Takes 1 bus cycle.
4.  **Unaligned Word (starts at Odd Address)**:
    *   Takes 2 bus cycles (speed penalty).
    *   *Cycle 1*: Reads odd byte via D8-D15.
    *   *Cycle 2*: Reads even byte via D0-D7.

---

### Conclusion:
*   Memory banking allows 8086 to access 16-bit words efficiently.

---
---

## Q17. Read and Write Timing Diagram of 8086 (7 Marks)

### Introduction:
*   A bus cycle consists of four clock states (T-states): T1, T2, T3 and T4.

---

### T-State Functions:

*   **T1**:
    *   Address is placed on the bus.
    *   ALE (Address Latch Enable) becomes HIGH.
*   **T2**:
    *   Read or Write signal is activated.
    *   Data transfer starts.
*   **T3**:
    *   Data transfer takes place.
    *   Wait state (Tw) is inserted if READY = 0 (slow memory).
*   **T4**:
    *   Bus cycle ends.
    *   Control signals become inactive.

---

### Read Cycle:
*   RD̅ becomes LOW.
*   Data is transferred from memory to the CPU.

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
*   WR̅ becomes LOW.
*   Data is transferred from the CPU to memory.

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

### Comparison Table:

| Feature | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **Address Space** | Shares memory space. | Separate I/O space. |
| **Address Range** | 1 MB. | 64 KB. |
| **Instructions Used** | Any memory instruction (like `MOV`). | `IN` and `OUT` only. |
| **Registers Used** | Any register. | `AL` or `AX` only. |
| **Memory Impact** | Reduces memory space. | No effect on memory. |
| **Hardware** | Complex. | Simple. |
| **Speed** | Faster. | Slower. |
| **Flexibility** | More. | Less. |

---

### Conclusion:
*   Memory-mapped I/O provides flexibility, while I/O-mapped I/O saves memory space.

---
---

## Q19. Calculate Physical Address (4 Marks)

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

### Interrupt:
*   An interrupt is a signal that temporarily stops the current program and transfers control to an Interrupt Service Routine (ISR).

---

### Interrupt Handling Steps:
1.  Complete the current instruction.
2.  Push **FLAGS** onto stack.
3.  Push **CS** onto stack.
4.  Push **IP** onto stack.
5.  Fetch ISR address from the Interrupt Vector Table (IVT).
6.  Execute the ISR.
7.  Return to the main program using the `IRET` instruction.

---

### Interrupt Vector Table (IVT):

| Feature | Value |
| :--- | :--- |
| **Location** | 00000H – 003FFH |
| **Size** | 1 KB (first 1024 bytes of memory) |
| **Entries** | 256 interrupt vectors |
| **Entry Size** | 4 Bytes (2 bytes for IP, 2 bytes for CS) |

---

### Dedicated Interrupt Types (Other Theory):
*   **Type 0**: Divide by Zero error.
*   **Type 1**: Single Step debugging.
*   **Type 2**: NMI (Non-Maskable pin).
*   **Type 3**: Breakpoint.
*   **Type 4**: Overflow.

---

### Conclusion:
*   IVT stores addresses of interrupt service routines used by 8086.
