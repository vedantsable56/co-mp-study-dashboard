# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Closely Coupled and Loosely Coupled Multiprocessor Systems (6 Marks)

| Comparison Parameter | Closely Coupled System | Loosely Coupled System |
| :--- | :--- | :--- |
| **1. Memory Structure** | Shared centralized memory pool. | Private distributed local memory. |
| **2. Communication** | Through shared variables in RAM. | Through message passing over a network. |
| **3. Transfer Rate** | Extremely high (limited by bus speed). | Moderate to low (limited by network). |
| **4. Operating System** | Single centralized OS controls all. | Each processor node runs its own OS. |
| **5. System Scaling** | Low scaling due to bus saturation. | High scaling (nodes are independent). |
| **6. Fault Tolerance** | Lower (shared memory failure halts system). | Higher (failed node is isolated). |
| **7. Synchronization** | Uses locks or shared semaphores. | Uses software message-passing. |
| **8. Connection Distance**| Very short (within same board). | Long (distributed over network links). |

---
---

## Q22. Explain SMP Organization (7 Marks)

### Definition
Symmetric Multiprocessing (SMP) is a multiprocessor architecture where two or more identical processors connect to shared main memory and I/O devices, sharing equal access rights under a single OS.

### Diagram
```
  ┌──────┐    ┌──────┐
  │ CPU1 │    │ CPU2 │
  └───┬──┘    └───┬──┘
  ════╧═══════════╧═════ System Bus ◄══► Shared RAM
```

### Components
*   **Identical CPU Cores** : Execution units that run threads in parallel.
*   **Private Caches** : High-speed local memory (L1/L2) that reduces bus accesses.
*   **Shared System Bus** : Single pathway connecting all processors and memory.
*   **Shared RAM** : Centralized main memory accessible by all processors.
*   **Shared I/O Controllers** : Common ports allowing any CPU to launch transfers.

### Working
*   All CPU cores share the single centralized physical RAM.
*   Cache controllers monitor the system bus via **Bus Snooping** to detect writes.
*   **MESI Protocol** manages cache consistency using four states: Modified, Exclusive, Shared, Invalid.
*   When a CPU writes to a shared cache line, other cache lines are marked Invalid.
*   The single operating system schedules threads dynamically to balance CPU load.

### Key Features
*   **Load Balancing**: Coordinates execution to distribute active threads.
*   **Fault Tolerance**: Continues operation using remaining CPUs if one fails.

---
---

## Q23. Explain Flynn's Taxonomy (7 Marks)

### Definition
Flynn's Taxonomy classifies computer architectures by the number of concurrent instruction streams and data streams active in the system.

### Diagram
```
  SISD: [ Mem ] ──► [ CU ] ──► [ PE ]   SIMD: [ CU ] ──► [ PE 1, PE 2 ]
  MISD: [ CU 1, CU 2 ] ──► [ PE ]        MIMD: [ CPU 1 ] , [ CPU 2 ] ──► [ Net ]
```

### SISD and SIMD Classes
*   **SISD (Single Instruction, Single Data)**: Processes one instruction stream on a single data stream sequentially (e.g., single-core PC).
*   **SIMD (Single Instruction, Multiple Data)**: Broadcasts one instruction to multiple execution units working on separate data streams in lockstep (e.g., GPUs).

### MISD and MIMD Classes
*   **MISD (Multiple Instruction, Single Data)**: Runs multiple instructions on a single data stream (rare; used for redundant fault-tolerant flight computers).
*   **MIMD (Multiple Instruction, Multiple Data)**: Executing multiple instructions on multiple data streams asynchronously (e.g., multi-core CPUs).

### Features
*   **Parallelism Level**: Classifies architectures from sequential execution (SISD) to task-level parallelism (MIMD).
*   **Hardware Design**: SIMD shares one instruction decoder, while MIMD duplicates all control and bus logic.

---
---

## Q24. Compare UMA and NUMA Architectures (8 Marks)

| Comparison Parameter | UMA Architecture | NUMA Architecture |
| :--- | :--- | :--- |
| **1. Memory Layout** | Centralized memory pool. | Distributed memory next to each CPU. |
| **2. Access Delay** | Uniform (constant delay). | Non-uniform (faster local, slower remote). |
| **3. Interconnection** | System bus or crossbar switches. | Point-to-point networks and router links. |
| **4. Scaling Limits** | Low scalability (< 32 processors). | High scalability (thousands of nodes). |
| **5. Consistency** | Bus snooping (MESI protocol). | Directory-based consistency protocol. |
| **6. Total Bandwidth** | Low (single shared memory bus). | High (private memory bus per node). |
| **7. Design Cost** | Lower (simple memory controller). | Higher (complex routing and directories). |
| **8. Performance Limit**| Bus saturation bottlenecks. | Remote memory access delays. |

---
---

## Q25. Compare RISC and CISC Architectures (7 Marks)

| Comparison Parameter | RISC Architecture | CISC Architecture |
| :--- | :--- | :--- |
| **1. Instruction Set** | Small set of simple commands. | Large set of complex, multi-cycle commands. |
| **2. Word Length** | Fixed-size instructions (32-bit). | Variable-size instructions (1 to 15 bytes). |
| **3. Registers** | Large register file (32+ registers). | Small register file (8 to 16 registers). |
| **4. Control Design** | Hardwired logic using gates. | Microprogrammed control using ROM. |
| **5. Memory Access** | Load-Store design (RAM access restricted). | Memory-to-memory design (RAM access allowed). |
| **6. Pipelining** | Simple and highly efficient. | Complex due to variable cycle times. |
| **7. Compiler Role** | High optimization to assign registers. | Simple compilation using hardware commands. |
| **8. Target CPU** | ARM chips and RISC-V. | Intel x86 and AMD chips. |
