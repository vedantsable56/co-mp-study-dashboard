# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain Even and Odd Memory Banks of 8086 (7 Marks)

### Introduction:
*   The 8086 microprocessor has a 20-bit address bus and a 16-bit data bus.
*   The 8086 memory space of 1 MB is byte-addressable, meaning each individual memory location stores 8 bits (1 byte) of data.
*   To allow the 16-bit processor to read or write a full 16-bit word in a single clock cycle, the 1 MB physical memory is organized into two parallel banks of 512 KB each: the **Even Bank (Lower Bank)** and the **Odd Bank (Upper Bank)**.

---

### Even and Odd Banks Details:

*   **Even Bank (Lower Bank)**:
    *   **Addresses**: Stores all data bytes located at even physical addresses (e.g., 00000H, 00002H, 00004H, ..., FFFFEH).
    *   **Data Bus Connection**: Connected directly to the lower half of the data bus, lines D0–D7.
    *   **Selection**: Activated by the address line A0 when A0 = 0 (indicating an even address).
*   **Odd Bank (Upper Bank)**:
    *   **Addresses**: Stores all data bytes located at odd physical addresses (e.g., 00001H, 00003H, 00005H, ..., FFFFFH).
    *   **Data Bus Connection**: Connected directly to the upper half of the data bus, lines D8–D15.
    *   **Selection**: Activated by the active-low control line BHE̅ (Bus High Enable) when BHE̅ = 0.

---

### Aligned vs Unaligned Word Access (Detailed Theory):

The CPU can perform byte operations or word operations. Accessing a 16-bit word depends on whether the word starts at an even or odd address:

1.  **Aligned Word Access (Single Bus Cycle)**:
    *   **Condition**: Occurs when the CPU reads or writes a 16-bit word starting at an even memory address (e.g., 2000H).
    *   **Operation**: The CPU places the address on the bus, resulting in A0 = 0. At the same time, it drives BHE̅ = 0.
    *   **Bus Activity**: This selects both the Even Bank (via A0 = 0) and the Odd Bank (via BHE̅ = 0) simultaneously. The byte at 2000H is transferred over D0–D7, and the byte at 2001H is transferred over D8–D15. The operation completes in 1 bus cycle (4 clock states).

2.  **Unaligned Word Access (Two Bus Cycles)**:
    *   **Condition**: Occurs when the CPU reads or writes a 16-bit word starting at an odd memory address (e.g., 2001H).
    *   **Operation**: The 16-bit word is split across two aligned word boundaries, requiring the CPU to perform two separate bus cycles to complete the transfer.
    *   **Bus Activity**:
        *   *Cycle 1 (Read/Write Odd Byte)*: The CPU addresses the odd address 2001H (A0 = 1, BHE̅ = 0). The Odd Bank is selected. The byte at 2001H is transferred over the upper data lines D8–D15.
        *   *Cycle 2 (Read/Write Next Even Byte)*: The CPU automatically increments the address to the next even address 2002H (A0 = 0, BHE̅ = 1). The Even Bank is selected. The byte at 2002H is transferred over the lower data lines D0–D7.
    *   **Performance Impact**: Unaligned word access requires 2 bus cycles (8 clock states), which doubles the access time and slows down the processor.

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

| BHE̅ | A0 | Memory Operation Type | Active Data Lines | Description |
| :---: | :---: | :--- | :--- | :--- |
| **1** | **0** | Read/Write Even Byte | D0 - D7 | Transfers 8-bit byte from/to an even address. |
| **0** | **1** | Read/Write Odd Byte | D8 - D15 | Transfers 8-bit byte from/to an odd address. |
| **0** | **0** | Read/Write Aligned Word | D0 - D15 | Transfers 16-bit word starting at an even address. |
| **1** | **1** | None (Idle Bus) | None | No bank is selected; data lines are in high-impedance. |

---

### Conclusion:
*   Organizing the memory into Even and Odd banks allows the 8086 to access 16-bit words in a single bus cycle, provided the word starts at an even address (aligned). Unaligned word transfers require two separate cycles.

---
---

## Q17. Read and Write Timing Diagram of 8086 (7 Marks)

### Introduction:
*   A bus cycle is the sequence of events performed by the 8086 processor to read or write data to/from external memory or I/O devices.
*   One basic bus cycle consists of four clock periods (T-states): T1, T2, T3, and T4.

---

### Detailed T-State Functions:

1.  **T1 (Address Phase)**:
    *   **Bus Activity**: The CPU places the 20-bit physical address of the memory or I/O location on the multiplexed AD0–AD15 and A16/S3–A19/S6 lines.
    *   **Signals**:
        *   *ALE (Address Latch Enable)*: Driven HIGH by the CPU. The falling edge of the ALE pulse triggers external latches (e.g., 74LS373) to store the address, separating it from the data lines.
        *   *M/IO̅*: Set to 1 if the CPU is accessing memory, or 0 if accessing an I/O device.
        *   *DT/R̅ (Data Transmit/Receive)*: Set to 1 for write cycles (transmitting data) or 0 for read cycles (receiving data).

2.  **T2 (Bus Turnaround Phase)**:
    *   **Bus Activity**:
        *   *Read Cycle*: The CPU puts the multiplexed AD0–AD15 lines into a high-impedance state (turns them around) to allow the target memory or I/O device to drive the data lines.
        *   *Write Cycle*: The CPU stops driving the address and begins driving the data to be written onto the AD0–AD15 lines.
    *   **Signals**:
        *   *ALE*: Goes LOW to lock the address in the external latch.
        *   *RD̅ or WR̅*: The appropriate control signal is driven LOW (active).
        *   *DEN̅ (Data Enable)*: Driven LOW (active) to turn on the external transceivers (74LS245) to connect the data bus.

3.  **T3 (Data Transfer Phase)**:
    *   **Bus Activity**:
        *   *Read Cycle*: The memory/IO device drives the data lines, and the CPU reads the byte or word.
        *   *Write Cycle*: The CPU maintains stable data on the bus for the device to write.
    *   **Wait State Check**: At the start of T3, the CPU samples the READY input pin. If READY = 0 (indicating a slow memory or I/O device is not ready), the CPU inserts a Wait State (Tw) after T3. During Tw, all control signals remain active. The CPU continues sampling READY on every clock cycle until it goes HIGH (1), after which the cycle transitions to T4.

4.  **T4 (Termination Phase)**:
    *   **Bus Activity**: The data transfer is completed.
    *   **Signals**:
        *   *RD̅ or WR̅*: Driven HIGH (inactive).
        *   *DEN̅*: Driven HIGH (inactive), disabling the external transceivers and separating the processor from the data bus.
        *   *AD0–AD15*: Put back into a high-impedance state, preparing for the next bus cycle.

---

### Read Cycle Diagram:

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

### Write Cycle Diagram:

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
*   **Memory-Mapped I/O (MMIO)**: The CPU treats I/O devices exactly like memory locations. An address range of the normal memory space is reserved for I/O ports. Any instruction that references memory (like `MOV`, `ADD`, `AND`) can be used to interact with I/O.
*   **I/O-Mapped I/O (Isolated I/O)**: The processor maintains two separate address spaces: one for memory (1 MB in 8086) and one for I/O ports (64 KB in 8086). The CPU uses the M/IO̅ pin to select between them. Only specialized instructions (`IN` and `OUT`) can access the I/O space.

---

### Comparison Table:

| Feature | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **1. Address Space** | Shares memory space with RAM. | Separate I/O space isolated from RAM. |
| **2. Address Range** | 1 MB (same limit as system RAM). | 64 KB (limited to I/O ports). |
| **3. Instructions Used** | Any memory instruction (like `MOV`, `ADD`). | Only `IN` and `OUT` instructions can be used. |
| **4. Registers Used** | Any CPU register can store port data. | Only `AL` (8-bit) or `AX` (16-bit) can be used. |
| **5. Memory Impact** | Reduces available RAM space. | Has no effect on memory space. |
| **6. Hardware** | Complex address decoding logic is required. | Simple and cheap address decoding logic. |
| **7. Speed** | Faster due to memory-access optimizations. | Slower due to port-access overhead. |
| **8. Flexibility** | More flexible (many instruction types). | Less flexible (restricted to IN/OUT commands). |

---

### Conclusion:
*   Memory-mapped I/O provides high programming flexibility and instruction options, while I/O-mapped I/O preserves physical RAM space and uses simpler decoding hardware.

---
---

## Q19. Calculate Physical Address (4 Marks)

### Segmented Memory Theory:
*   The 8086 microprocessor has a 20-bit address bus to access 1 MB of memory, but its internal registers are only 16 bits wide.
*   To generate 20-bit physical addresses using 16-bit registers, the 8086 uses a segmented memory model.
*   The physical memory is divided into segments of 64 KB each. The 20-bit physical address is calculated by taking the 16-bit segment address, shifting it left by 4 bits (equivalent to multiplying by 10H), and adding the 16-bit offset address.
*   **Default Pairings**:
    *   *CS (Code Segment)* pairs with *IP (Instruction Pointer)*.
    *   *DS (Data Segment)* pairs with *SI (Source Index)*, *DI (Destination Index)*, or *BX (Base Register)*.
    *   *SS (Stack Segment)* pairs with *SP (Stack Pointer)* or *BP (Base Pointer)*.
    *   *ES (Extra Segment)* pairs with *DI (Destination Index)* for string transfers.

---

### Formula:
Physical Address = (Segment Address x 10H) + Offset Address

---

### Detailed Step-by-Step Examples:

#### Example 1: Fetching an Instruction (CS:IP)
*   **Given**: Segment Register CS = **2000H**, Offset Register IP = **1234H**
*   **Step-by-Step Calculation**:
    1.  Shift CS address left by 4 bits (multiply by 10H):
        2000H x 10H = 20000H
    2.  Add the offset IP:
        20000H + 1234H = 21234H
*   **Result**: Physical Address = **21234H**

#### Example 2: Accessing Data (DS:SI)
*   **Given**: Segment Register DS = **1500H**, Offset Register SI = **0200H**
*   **Step-by-Step Calculation**:
    1.  Shift DS address left by 4 bits:
        1500H x 10H = 15000H
    2.  Add the offset SI:
        15000H + 0200H = 15200H
*   **Result**: Physical Address = **15200H**

#### Example 3: Stack Operation (SS:SP)
*   **Given**: Segment Register SS = **3000H**, Offset Register SP = **0100H**
*   **Step-by-Step Calculation**:
    1.  Shift SS address left by 4 bits:
        3000H x 10H = 30000H
    2.  Add the offset SP:
        30000H + 0100H = 30100H
*   **Result**: Physical Address = **30100H**

#### Example 4: Extra String Destination (ES:DI)
*   **Given**: Segment Register ES = **4000H**, Offset Register DI = **00A0H**
*   **Step-by-Step Calculation**:
    1.  Shift ES address left by 4 bits:
        4000H x 10H = 40000H
    2.  Add the offset DI:
        40000H + 00A0H = 400A0H
*   **Result**: Physical Address = **400A0H**

---
---

## Q20. Explain Interrupt Handling Mechanism and IVT (6 Marks)

### Interrupt Theory:
*   An interrupt is an electrical signal that temporarily halts the execution of the main program, forcing the CPU to save its state and branch to a special subprogram called an **Interrupt Service Routine (ISR)**.
*   **Types**:
    *   *Hardware Interrupts*: Triggered externally via the INTR or NMI pins of the CPU.
    *   *Software Interrupts*: Triggered internally using the `INT n` instruction.

---

### Step-by-Step Interrupt Handling Mechanism:

When the 8086 CPU detects an active interrupt, it performs the following steps in sequence:

1.  **Complete Current Instruction**: The CPU finishes executing the instruction currently in progress.
2.  **Push Flags onto Stack**: The CPU decrements the Stack Pointer (SP) by 2 and pushes the contents of the 16-bit Flag Register onto the stack to preserve the processor status.
3.  **Clear IF and TF**:
    *   Clearing the *Interrupt Flag (IF)* to 0 disables further maskable interrupts, preventing other interrupts from breaking the ISR.
    *   Clearing the *Trap Flag (TF)* to 0 disables single-step debugging mode.
4.  **Push CS onto Stack**: The CPU decrements SP by 2 and pushes the current Code Segment (CS) register onto the stack to save the return segment address.
5.  **Push IP onto Stack**: The CPU decrements SP by 2 and pushes the current Instruction Pointer (IP) register onto the stack to save the return offset address.
6.  **Fetch ISR Vector Address**:
    *   The CPU reads the interrupt type number `n` (from the instruction or the interrupt controller).
    *   It calculates the address of the interrupt vector in the IVT by multiplying `n` by 4:
        Vector Address = n x 4
    *   It reads the first 2 bytes from this address and loads them into the IP register (offset).
    *   It reads the next 2 bytes from the vector address and loads them into the CS register (segment base).
7.  **Execute ISR**: The CPU jumps to the new CS:IP address and executes the ISR code.
8.  **Return to Main Program**: The ISR must end with the `IRET` (Interrupt Return) instruction. `IRET` pops the top three 16-bit values off the stack back into IP, CS, and Flags registers, resuming the main program at the exact point of interruption.

---

### Interrupt Vector Table (IVT):

The IVT is a reserved block of memory that acts as a lookup table containing the physical entry addresses of the ISRs.

*   **Location**: It occupies the lowest 1024 bytes of physical memory, ranging from address **00000H to 003FFH**.
*   **Size**: Fixed at **1 KB**.
*   **Capacity**: Supports **256 distinct interrupts** (numbered 0 to 255).
*   **Entry Structure**: Each entry is 4 bytes wide:
    *   *Lower 2 bytes*: Store the 16-bit offset value (loaded into IP).
    *   *Upper 2 bytes*: Store the 16-bit segment base value (loaded into CS).

#### Predefined Interrupts in IVT:
*   **Type 0 (Divide-by-Zero)**: Triggered if a division results in an overflow.
*   **Type 1 (Single Step)**: Executed after every instruction if the Trap Flag is set.
*   **Type 2 (Non-Maskable Interrupt - NMI)**: Triggered by a signal on the NMI pin (cannot be disabled by IF).
*   **Type 3 (Breakpoint)**: Generated by the `INT 3` instruction, used in debuggers.
*   **Type 4 (Overflow)**: Triggered by the `INTO` instruction if the Overflow Flag is set.

---

### Conclusion:
*   The IVT provides a fast, standardized way for the 8086 to look up ISR addresses, allowing the CPU to halt its work, handle the event, and return to the main program using stack operations.
