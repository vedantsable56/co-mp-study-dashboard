# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Closely Coupled and Loosely Coupled Multiprocessor Systems (6 Marks)

### Introduction:
*   Closely coupled systems share a common centralized main memory block.
*   Loosely coupled systems use distributed memory blocks for each processor.

### Comparison Table:

| Comparison Point | Closely Coupled | Loosely Coupled |
| :--- | :--- | :--- |
| **1. Memory Layout** | Shared memory | Distributed memory |
| **2. Data Transfer** | Shared RAM | Message passing |
| **3. Operating System** | Single OS | Multiple OS copies |
| **4. System Scaling** | Lower scaling | Higher scaling |
| **5. Fault Impact** | High risk | Isolated nodes |
| **6. Connection Delay** | Lowest delay | Higher delay |
| **7. Physical Link** | System bus | Communication network |
| **8. Synchronization** | Shared variables | Software messages |

---
---

## Q22. Explain SMP Organization (7 Marks)

### Introduction / Definition:
*   Symmetric Multiprocessing uses two or more identical processors in parallel.
*   All processors share the same memory and input output devices.
*   They have equal access rights under a single operating system.

### Diagram:
```
  ┌──────┐    ┌──────┐
  │ CPU1 │    │ CPU2 │
  └───┬──┘    └───┬──┘
  ════╧═══════════╧═════ System Bus ◄══► Shared RAM
```

### Key Points / Core Theory:
*   **Identical processors** run duplicate tasks in parallel on the bus.
*   **Shared memory** provides one physical address space for all CPUs.
*   **Single kernel** manages all tasks and schedules threads dynamically.
*   **Cache consistency** ensures all private caches hold matching data values.
*   **Bus snooping** monitors bus transactions to invalidate old cache lines.

### Simple Real-World Example:
*   Multiple cooks share the same kitchen table and raw ingredients.
*   They prepare different dishes independently without a master supervisor.

### Advantages / Applications:
*   Speeds up processor throughput by executing multiple threads simultaneously.
*   Increases reliability because other CPUs run if one fails.
*   Dynamically schedules task assignments based on current processor load.

### Conclusion:
*   SMP organization offers high execution speeds for multi-threaded applications.
*   It shares memory resources equally to simplify parallel programming.

---
---

## Q23. Explain Flynn's Taxonomy (7 Marks)

### Introduction:
*   Flynn's Taxonomy classifies computer architectures by instruction and data streams.
*   It divides computers into SISD, SIMD, MISD, and MIMD classes.

### Comparison Table:

| Comparison Point | SISD | SIMD | MISD | MIMD |
| :--- | :--- | :--- | :--- | :--- |
| **1. Instruction Stream** | Single | Single | Multiple | Multiple |
| **2. Data Stream** | Single | Multiple | Single | Multiple |
| **3. Control Units** | One CU | One CU | Multiple CUs | Multiple CUs |
| **4. ALU Count** | One ALU | Multiple ALUs | Multiple ALUs | Multiple ALUs |
| **5. Execution Mode** | Sequential | Lockstep parallel | Redundant parallel | Independent parallel |
| **6. Code Complexity** | Lowest | Higher | Higher | Highest |
| **7. Ideal Task** | Standard software | Vector processing | Fault tolerance | Distributed apps |
| **8. Device Example** | Old single-core | GPU chips | Flight controllers | Modern multi-core |

---
---

## Q24. Compare UMA and NUMA Architectures (8 Marks)

### Introduction:
*   UMA provides uniform memory access delay for all physical addresses.
*   NUMA access delay depends on the memory block's physical distance.

### Comparison Table:

| Comparison Point | UMA | NUMA |
| :--- | :--- | :--- |
| **1. Memory Layout** | Centralized | Distributed |
| **2. Access Delay** | Uniform | Non-uniform |
| **3. System Scaling** | Lower | Higher |
| **4. Interconnection** | System bus | Network routing |
| **5. Cache Consistency** | Bus snooping | Directory protocols |
| **6. Controller Design** | Simple | Complex |
| **7. Memory Bandwidth** | Shared limit | High local bandwidth |
| **8. Target System** | Small servers | Large supercomputers |

---
---

## Q25. Compare RISC and CISC Architectures (7 Marks)

### Introduction:
*   RISC utilizes a reduced set of simple, single-cycle instructions.
*   CISC utilizes a complex set of multi-cycle instructions in hardware.

### Comparison Table:

| Comparison Point | RISC | CISC |
| :--- | :--- | :--- |
| **1. Command Length** | Fixed size | Variable size |
| **2. Execution Cycle** | Single cycle | Multi-cycle |
| **3. Register File** | Large file | Small file |
| **4. Control Design** | Hardwired logic | Microprogrammed ROM |
| **5. Memory Reference** | Load and store | Direct operations |
| **6. Pipelining** | Simple | Complex |
| **7. Compiler Role** | High optimization | Low optimization |
| **8. Target Chip** | ARM chips | Intel x86 |
