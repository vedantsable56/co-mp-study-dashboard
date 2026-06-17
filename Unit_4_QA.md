# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain Even and Odd Memory Banks of 8086 (7 Marks)

### Definition
The 8086 memory is split into Even and Odd Banks of 512 KB each to support both 8-bit byte access and 16-bit word access in a single cycle.

### Diagram
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
          └──────────────┘ └──────────────┘
```

### Components
*   **Even Bank (Lower Bank)** : Stores bytes at even physical addresses and connects to lower data lines D0–D7.
*   **Odd Bank (Upper Bank)** : Stores bytes at odd physical addresses and connects to upper data lines D8–D15.
*   **Address Line A0** : Acts as the hardware chip-select signal for the Even Memory Bank (active low).
*   **BHE̅ Pin (Bus High Enable)** : Acts as the hardware chip-select signal for the Odd Memory Bank (active low).

### Working
*   Aligned word access reads both banks simultaneously by driving A0 = 0 and BHE̅ = 0.
*   Bytes at even addresses are read by driving A0 = 0 and BHE̅ = 1 over D0–D7 lines.
*   Bytes at odd addresses are read by driving A0 = 1 and BHE̅ = 0 over D8–D15 lines.
*   Unaligned word access at odd addresses requires two successive bus cycles to complete.
*   Cycle 1 of unaligned access reads the odd byte, and Cycle 2 reads the next even byte.

---
---

## Q17. Read and Write Timing Diagram of 8086 (7 Marks)

### Definition
A bus cycle defines the timing phases used by the 8086 CPU to read or write memory, consisting of T1, T2, T3, and T4 clock periods.

### Diagram
```
CLK  _┌─┐_┌─┐_┌─┐_┌─┐_
ALE  __┌─┐___________
AD   __Address__Data_
```

### Address Phase and Control Signal Activation
*   **State T1 (Address Phase)**: CPU places physical address on AD0–AD15 and pulses ALE high to latch the address.
*   **State T2 (Bus Turnaround)**: Bus goes high-impedance (read) or drives data (write). RD̅/WR̅ and DEN̅ go low.

### Data Transfer and Completion
*   **State T3 (Data Transfer)**: CPU reads or writes data bits and samples the READY pin to check for slow devices.
*   **State T4 (Bus Cycle End)**: Control signals (RD̅/WR̅) and DEN̅ return high to disconnect transceivers.

### Features
*   **Wait States**: Introduces Tw cycles if READY is low to allow slow devices to respond.
*   **Data Bus Safety**: Uses DEN̅ and DT/R̅ to enable transceivers and coordinate data direction.

---
---

## Q18. Compare Memory-Mapped I/O and I/O-Mapped I/O (8 Marks)

| Comparison Parameter | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **1. Address Space** | Shares address space with system RAM. | Occupies separate I/O address space. |
| **2. Max Port Range** | Up to 1 MB (same limit as RAM). | Limited to a range of 64 KB. |
| **3. Control Signals** | Relies on memory signals (MEMR̅/MEMW̅). | Uses I/O control signals (M/IO̅). |
| **4. Instructions** | Can use any memory reference command. | Restricted to IN and OUT instructions. |
| **5. Registers** | Allows transfer with any CPU register. | Restricts data transfers to AL or AX. |
| **6. Decoder Complexity**| High complexity (decodes 20-bit address). | Low complexity (decodes 16-bit address). |
| **7. Access Speed** | Faster due to memory instructions. | Slower due to port control instructions. |
| **8. Memory Penalty** | Reduces RAM space reserved for ports. | Preserves entire memory space for RAM. |

---
---

## Q19. Calculate Physical Address (4 Marks)

### Definition
The 8086 shifts the segment address left by 4 bits and adds the offset address to generate a 20-bit physical address.

### Formula
Physical Address = (Segment Address · 10H) + Offset Address

### Examples
*   **Code Segment Calculation (CS:IP)**: CS = `2000H`, IP = `1234H`.
    *   Physical Address = (2000H · 10H) + 1234H = 20000H + 1234H = 21234H.
*   **Data Segment Calculation (DS:SI)**: DS = `1500H`, SI = `0200H`.
    *   Physical Address = (1500H · 10H) + 0200H = 15000H + 0200H = 15200H.
*   **Stack Segment Calculation (SS:SP)**: SS = `3000H`, SP = `0100H`.
    *   Physical Address = (3000H · 10H) + 0100H = 30000H + 0100H = 30100H.
*   **Extra Segment Calculation (ES:DI)**: ES = `4000H`, DI = `00A0H`.
    *   Physical Address = (4000H · 10H) + 00A0H = 40000H + 00A0H = 400A0H.

---
---

## Q20. Explain Interrupt Handling Mechanism and IVT (6 Marks)

### Definition
An interrupt temporarily suspends execution of the main program to run an Interrupt Service Routine (ISR) located via the IVT.

### Diagram
```
  [Interrupt Request] ──► PUSH Flags/CS/IP ──► Load New CS:IP ──► Execute ISR
```

### Interrupt Handling Steps
*   **Step 1**: CPU finishes the current machine instruction.
*   **Step 2**: Pushes Flag register, CS segment register, and IP offset register onto the stack.
*   **Step 3**: Clears Interrupt Flag (IF) and Trap Flag (TF) to disable debug mode and maskable interrupts.
*   **Step 4**: Multiplies interrupt vector type `n` by 4 to get the vector table index address.
*   **Step 5**: Loads target IP (offset) and CS (segment base) from calculated IVT address.
*   **Step 6**: Executes ISR and returns to the main program using the `IRET` instruction.

### Interrupt Vector Table (IVT)
*   **Address Range**: Located in the lowest 1024 bytes of memory, from address `00000H` to `003FFH`.
*   **Vector Size**: Supports 256 vector addresses, where each entry is 4 bytes (2 bytes for IP, 2 bytes for CS).
*   **Predefined Types**: Includes Type 0 (Divide by Zero), Type 2 (NMI), and Type 3 (Breakpoint).

### Features
*   **Fast ISR lookup**: Reaches targeted subroutines using quick lookup math (n x 4).
*   **Priority Rules**: Coordinates concurrent hardware and software interrupt requests.
