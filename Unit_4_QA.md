# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain Even and Odd Memory Banks of 8086 (7 Marks)

### Definition
The 8086 microprocessor features a 20-bit address bus and a 16-bit data bus, allowing it to address up to 1 MB of physical memory. To enable 16-bit word access in a single bus cycle while maintaining byte-addressability, the memory is physically divided into two parallel blocks of 512 KB: the Even Memory Bank (Lower Bank) and the Odd Memory Bank (Upper Bank).

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
          │              │ │              │
          │ Addr 00000H  │ │ Addr 00001H  │
          │ Addr 00002H  │ │ Addr 00003H  │
          │     ...      │ │     ...      │
          │  512 KB      │ │  512 KB      │
          └──────────────┘ └──────────────┘
```

### Components and Functions
*   Even Memory Bank (Lower Bank): Stores all data bytes located at even physical addresses (e.g., 00000H, 00002H, etc.). It is connected directly to the lower half of the CPU data bus, lines D0–D7, and is enabled when address line A0 is driven low (A0 = 0).
*   Odd Memory Bank (Upper Bank): Stores all data bytes located at odd physical addresses (e.g., 00001H, 00003H, etc.). It is connected to the upper half of the data bus, lines D8–D15, and is enabled when the active-low control signal BHE̅ (Bus High Enable) is driven low (BHE̅ = 0).
*   Address Line A0 Pin: Acts as the hardware chip-select signal for the Even Bank. When the CPU executes an operation at an even address, A0 is driven low, enabling data transfer over lines D0–D7.
*   BHE̅ (Bus High Enable) Pin: Acts as the hardware chip-select signal for the Odd Bank. When driven low, it enables the data transceivers for the upper data bus lines (D8–D15), allowing byte access to odd memory locations.

### Working of Memory Banks
The CPU coordinates A0 and BHE̅ to perform three types of memory accesses:
1. **Aligned Word Access (Single Bus Cycle)**: Occurs when the CPU reads or writes a 16-bit word starting at an even memory address (e.g., 2000H). The CPU drives A0 = 0 and BHE̅ = 0 simultaneously, activating both banks. The lower byte at 2000H is read over D0–D7, and the upper byte at 2001H is read over D8–D15 in one cycle.
2. **Unaligned Word Access (Two Bus Cycles)**: Occurs when the CPU accesses a 16-bit word starting at an odd address (e.g., 2001H). 
   * In *Cycle 1*, the CPU reads the odd byte at 2001H by setting A0 = 1 and BHE̅ = 0, transferring the byte over D8–D15.
   * In *Cycle 2*, the CPU increments the address to the next even location 2002H, setting A0 = 0 and BHE̅ = 1 to transfer the remaining byte over D0–D7.
3. **Byte Access**: For an even byte address, the CPU sets A0 = 0 and BHE̅ = 1, transferring data over D0–D7. For an odd byte address, it sets A0 = 1 and BHE̅ = 0, transferring data over D8–D15.

### Advantages / Features
*   **16-Bit Parallel Access**: Enables fetching a full 16-bit word in a single bus cycle, doubling the data transfer rate compared to 8-bit memory designs.
*   **Byte-Addressable Space**: Maintains backward compatibility with 8-bit peripherals by allowing individual byte transfers over D0–D7 or D8–D15.

---
---

## Q17. Read and Write Timing Diagram of 8086 (7 Marks)

### Definition / Introduction
A bus cycle is the sequence of events performed by the 8086 processor to read or write data to/from external memory or I/O devices. One basic bus cycle consists of four clock periods (T-states): T1, T2, T3, and T4, which coordinate address latching, data direction control, and read/write operations.

### Diagrams
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

### Detailed Explanation of T-States
*   **State T1 (Address Phase)**: The CPU places the 20-bit physical address on the multiplexed AD0–AD15 and status lines. It drives the ALE (Address Latch Enable) signal high to latch the address into external registers, and configures the M/IO̅ and DT/R̅ signals to define the cycle type and data direction.
*   **State T2 (Bus Turnaround/Control)**: The ALE signal goes low to lock the address in external latches. For read cycles, the multiplexed bus lines are put into a high-impedance state to allow the memory device to drive the bus. For write cycles, the CPU drives the data onto the bus lines. The appropriate control signal (RD̅ or WR̅) and DEN̅ are driven low to enable the data transceivers.
*   **State T3 (Data Phase)**: The CPU reads the byte/word from the data bus (during read cycles) or holds the data stable (during write cycles). At the start of T3, the CPU samples the READY pin; if READY is low, the CPU inserts Wait States (Tw) between T3 and T4, holding all signals active until READY goes high.
*   **State T4 (Termination Phase)**: The control signals (RD̅ or WR̅) and DEN̅ are driven high, disabling the data transceivers. The CPU stops driving the data bus (during write cycles) or stops reading the bus (during read cycles), returning the AD0–AD15 lines to a high-impedance state.

### Advantages / Features
*   **Supports Slow Peripherals**: Uses the READY pin to dynamically insert wait states (Tw) when accessing slow memory or I/O devices.
*   **Bus Isolation**: Uses the DEN̅ signal to isolate the CPU's internal data bus from the system bus, preventing collisions during address phases.

---
---

## Q18. Compare Memory-Mapped I/O and I/O-Mapped I/O (8 Marks)

| Comparison Parameter | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **1. Address Space Partition** | Shares the same physical address space as system RAM. | Occupies a completely separate, isolated address space. |
| **2. Maximum Port Capacity** | Limited only by total system RAM (up to 1 MB in 8086). | Restricted to a dedicated range of 64 KB (65,536 ports). |
| **3. Control Signal Select** | Relies on memory control signals like MEMR̅ and MEMW̅. | Uses specialized I/O control signals via the M/IO̅ line. |
| **4. Instruction Set Support** | Can use any memory reference instructions (e.g., `MOV`, `ADD`). | Restricted to specialized input/output instructions (`IN`/`OUT`). |
| **5. Register Access** | Allows transferring port data to and from any CPU register. | Restricts data transfers strictly to the accumulator (AL/AX). |
| **6. Hardware Complexity** | Requires complex decoders to detect 20-bit memory addresses. | Uses simple, cheaper decoders to decode 16-bit I/O addresses. |
| **7. Transfer Speed** | Faster due to memory-access optimizations. | Slower due to dedicated instruction execution overhead. |
| **8. Memory Space Penalty** | Reduces available RAM space by reserving addresses for ports. | Preserves the entire 1 MB address space for system RAM. |

---
---

## Q19. Calculate Physical Address (4 Marks)

### Introduction / Definition
The 8086 microprocessor uses a segmented memory model to generate 20-bit physical addresses using 16-bit registers. The physical memory is divided into logical segments of 64 KB, and the physical address is calculated by combining a 16-bit Segment Address and a 16-bit Offset Address.

### Formula
Physical Address = (Segment Address · 10H) + Offset Address

### Detailed Step-by-Step Examples
*   Code Segment Calculation (CS:IP):
    *   *Parameters*: Segment CS = `2000H`, Offset IP = `1234H`.
    *   *Calculation*: The CPU shifts the segment address left by 4 bits (equivalent to multiplying by 10H) to obtain `20000H`. It then adds the offset address `1234H`.
    *   *Step 1*: 2000H · 10H = 20000H
    *   *Step 2*: 20000H + 1234H = 21234H
    *   *Result*: Physical Address = `21234H`.
*   Data Segment Calculation (DS:SI):
    *   *Parameters*: Segment DS = `1500H`, Offset SI = `0200H`.
    *   *Calculation*: The CPU shifts the data segment base to obtain `15000H` and adds the source index offset `0200H`.
    *   *Step 1*: 1500H · 10H = 15000H
    *   *Step 2*: 15000H + 0200H = 15200H
    *   *Result*: Physical Address = `15200H`.
*   Stack Segment Calculation (SS:SP):
    *   *Parameters*: Segment SS = `3000H`, Offset SP = `0100H`.
    *   *Calculation*: The CPU shifts the stack segment base to obtain `30000H` and adds the stack pointer offset `0100H`.
    *   *Step 1*: 3000H · 10H = 30000H
    *   *Step 2*: 30000H + 0100H = 30100H
    *   *Result*: Physical Address = `30100H`.
*   Extra Segment Calculation (ES:DI):
    *   *Parameters*: Segment ES = `4000H`, Offset DI = `00A0H`.
    *   *Calculation*: The CPU shifts the extra segment base to obtain `40000H` and adds the destination index offset `00A0H`.
    *   *Step 1*: 4000H · 10H = 40000H
    *   *Step 2*: 40000H + 00A0H = 400A0H
    *   *Result*: Physical Address = `400A0H`.

### Advantages / Features
*   **Enables 1 MB Addressing**: Allows a processor with 16-bit internal registers to generate 20-bit addresses for a 1 MB physical memory space.
*   **Code Relocatability**: Programs can be moved to different physical memory areas by changing the segment base registers without modifying offsets.

---
---

## Q20. Explain Interrupt Handling Mechanism and IVT (6 Marks)

### Introduction / Definition
An interrupt is an electrical signal that temporarily suspends the execution of the main program, forcing the CPU to save its state and branch to an Interrupt Service Routine (ISR). The Interrupt Vector Table (IVT) is a dedicated lookup table in memory that stores the starting addresses of the ISRs.

### Diagram
```
  [Interrupt Request] ──► PUSH Flags/CS/IP ──► Load New CS:IP ──► Execute ISR
```

### Detailed Explanation of Interrupt Mechanism
*   **Instruction Completion**: The CPU completes execution of the currently running machine instruction before servicing the interrupt request to prevent data corruption.
*   **Push Flags onto Stack**: The CPU decrements the Stack Pointer (SP) by 2 and pushes the 16-bit Flag Register onto the stack to preserve the status flags.
*   **Clear IF and TF Flags**: The CPU clears the Interrupt Flag (IF) to 0 to disable further maskable interrupts, and clears the Trap Flag (TF) to 0 to disable single-step debugging during the ISR.
*   **Push CS and IP onto Stack**: The CPU decrements SP by 4 and pushes the current Code Segment (CS) and Instruction Pointer (IP) registers onto the stack to save the return address.
*   **IVT Address Calculation**: The CPU multiplies the interrupt type number `n` by 4 to locate the vector entry in the table:
    IVT Address = n · 4
*   **Fetch CS:IP Vector**: The CPU reads the first 2 bytes from the calculated IVT address and loads them into the IP register (offset), and reads the next 2 bytes to load into the CS register (segment base).
*   **Execute ISR**: The CPU jumps to the new CS:IP address and executes the Interrupt Service Routine instructions.
*   **Return to Main Program**: The ISR ends with the `IRET` instruction, which pops the saved IP, CS, and Flag values off the stack, resuming the main program.

### Detailed Structure of IVT
*   **Memory Location**: Stored in the lowest 1024 bytes of physical memory, spanning from address `00000H` to `003FFH`.
*   **Capacity**: Supports 256 vector addresses (interrupt types 0 to 255), with each entry occupying 4 bytes (2 bytes for IP, 2 bytes for CS).
*   Interrupt Predefined Types:
    *   *Type 0 (Divide by Zero)*: Triggered if a division operation results in an overflow.
    *   *Type 1 (Single Step)*: Executed after every instruction if the Trap Flag (TF) is set.
    *   *Type 2 (NMI)*: Triggered by a signal on the Non-Maskable Interrupt pin.
    *   *Type 3 (Breakpoint)*: Triggered by the `INT 3` instruction for debugging.
    *   *Type 4 (Overflow)*: Triggered by the `INTO` instruction if the Overflow Flag (OF) is set.

### Key Features
*   **Fast Vector Lookup**: Calculates the target ISR address using simple multiplication (n x 4), reducing interrupt latency.
*   **Priority Management**: Coordinates hardware interrupts (via INTR, NMI) and software interrupts (via INT n) based on internal priority rules.
