# CO & MP: Unit IV — Memory Organization and Interrupts (Q&A)

---

## Q16. Explain Even and Odd Memory Banks of 8086 (7 Marks)

### Introduction / Definition:
*   The 8086 memory is split into even and odd banks.
*   Each bank stores 512 KB of physical byte addresses.
*   This layout allows accessing 16-bit words in one cycle.

### Diagram:
```
  ┌───────────┐    ┌───────────┐
  │ Even Bank │    │ Odd Bank  │
  │  (D0-D7)  │    │ (D8-D15)  │
  └─────▲─────┘    └─────▲─────┘
        │ A0=0           │ BHE̅=0
```

### Key Points / Core Theory:
*   **Even bank** stores bytes at even memory address locations.
*   **Odd bank** stores bytes at odd memory address locations.
*   **Bus high enable** select line activates the upper memory bank.
*   **Address line zero** low state selects the lower memory bank.
*   **Aligned word transfers** read both memory banks in one cycle.

### Simple Real-World Example:
*   A double door entrance allows two people inside at once.
*   Opening only one door limits entrance to one person.

### Advantages / Applications:
*   Increases byte reading efficiency using dual bank line transfers.
*   Speeds up word execution by fetching sixteen bits at once.
*   Maintains compatibility with older eight bit hardware device controllers.

### Conclusion:
*   Memory banking allows the 8086 to perform fast word reads.
*   It divides memory into two physical byte channels.

---
---

## Q17. Read and Write Timing Diagram of 8086 (7 Marks)

### Introduction / Definition:
*   A bus cycle defines the timing steps for memory access.
*   Each read or write cycle consists of four T-states.
*   The clock determines the transition of address and data signals.

### Diagram:
```
CLK  _┌─┐_┌─┐_┌─┐_┌─┐_
ALE  __┌─┐___________
AD   __Address__Data_
```

### Key Points / Core Theory:
*   **State T1** places the physical memory address on the bus.
*   **State T2** turns the multiplexed bus lines around for reading.
*   **State T3** performs the actual byte or word transfer steps.
*   **State T4** disables control signals and ends the bus cycle.
*   **Wait states** delay operations when slow memory devices are read.

### Simple Real-World Example:
*   A mail carrier stops, opens the box, and drops letters.
*   Each action takes a predefined amount of time.

### Advantages / Applications:
*   Coordinates precise synchronization between the CPU and memory chips.
*   Allows connecting slow external devices using hardware ready lines.
*   Prevents data corruption by holding control signals stable during transfers.

### Conclusion:
*   Timing diagrams define the exact electrical states of bus lines.
*   They verify that address and data transfers remain stable.

---
---

## Q18. Compare Memory-Mapped I/O and I/O-Mapped I/O (8 Marks)

### Introduction:
*   Memory-mapped I/O treats hardware ports as normal memory locations.
*   I/O-mapped I/O uses a separate address space for hardware ports.

### Comparison Table:

| Comparison Point | Memory-Mapped I/O | I/O-Mapped I/O |
| :--- | :--- | :--- |
| **1. Address Space** | Shared | Separate |
| **2. Address Range** | 1 MB | 64 KB |
| **3. Commands Used** | Any memory command | IN and OUT |
| **4. Registers Used** | Any register | Accumulator only |
| **5. Memory Impact** | Reduces RAM space | No impact |
| **6. Hardware Logic** | Complex decoding | Simple decoding |
| **7. Transfer Speed** | Faster | Slower |
| **8. Code Flexibility** | Higher | Lower |

---
---

## Q19. Calculate Physical Address (4 Marks)

### Introduction / Definition:
*   The 8086 uses a 20-bit address for physical memory.
*   Internal registers store segment bases and offsets as 16-bit values.
*   The CPU shifts segment values to build physical addresses.

### Diagram:
```
  (Segment Address x 10H) + Offset = Physical Address
```

### Key Points / Core Theory:
*   **Segment address** defines the base of the memory block.
*   **Offset address** defines the distance from the segment start.
*   **Left shift** multiplies the segment base by sixteen.
*   **Physical address** is a twenty bit memory reference value.
*   **Overlap** occurs when segments start at sixteen byte intervals.

### Simple Real-World Example:
*   **Given**: CS = 2000H, IP = 1234H.
*   **Step 1**: Segment x 10H -> 20000H.
*   **Step 2**: Add Offset -> 20000H + 1234H = 21234H.
*   **Result**: Physical Address = 21234H.

### Advantages / Applications:
*   Allows a 16-bit processor to address 1 MB of memory.
*   Supports relocatable code by changing only segment register values.
*   Separates code, data, and stack segments for safety.

### Conclusion:
*   Segmented addressing constructs 20-bit addresses from 16-bit registers.
*   It provides flexible memory organization for running programs.

---
---

## Q20. Explain Interrupt Handling Mechanism and IVT (6 Marks)

### Introduction / Definition:
*   An interrupt stops the current program to handle an event.
*   The CPU runs an Interrupt Service Routine to handle it.
*   The Interrupt Vector Table stores the addresses of these routines.

### Diagram:
```
[Interrupt Trigger] ──► PUSH Flags/CS/IP ──► Load New CS:IP ──► ISR
```

### Key Points / Core Theory:
*   **Interrupt table** occupies the first one kilobyte of memory.
*   **Vector entries** contain segment and offset addresses for ISRs.
*   **Stack operations** save the return address and flag status.
*   **Interrupt return** restores saved registers and resumes main code.
*   **Hardware interrupts** use external CPU pins to trigger routines.

### Simple Real-World Example:
*   A phone rings while a student is reading a book.
*   They bookmark the page, answer, and resume reading.

### Advantages / Applications:
*   Allows the CPU to handle urgent external events immediately.
*   Prevents wasting CPU cycles on constant device polling.
*   Handles runtime software errors like division by zero.

### Conclusion:
*   Interrupts provide a fast method to respond to hardware events.
*   The vector table coordinates jumping to correct service routines.
