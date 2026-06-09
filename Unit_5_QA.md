# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Explain closely coupled and loosely coupled multiprocessor systems with comparison. (6 Marks)

*   **Multiprocessor System**: A computer system containing two or more CPUs working together to process instructions in parallel, sharing the computational workload to increase throughput. They are classified based on the degree of memory sharing.

---

### Closely Coupled Systems (Write in Exam):

*   **Memory Structure**: Processors share a single centralized main memory space (Uniform Memory Access - UMA).
*   **Communication**: Processors communicate directly through shared variables, semaphores, and message queues in the common memory.
*   **Interconnection**: Processors are connected to memory via a shared system bus, multiport memory, or a high-speed crossbar switch.
*   **Operating System**: Typically controlled by a single, unified instance of the Operating System that coordinates task scheduling.
*   **Bus Contention**: High. As more CPUs are added, they fight for access to the shared system bus and memory, causing delays.
*   **Scalability**: Low. Limited scalability (usually under 32 processors) due to bus and memory bandwidth saturation.
*   **Data Rate**: Very high speed with extremely low latency due to direct memory access.

---

### Loosely Coupled Systems (Write in Exam):

*   **Memory Structure**: Each processor has its own dedicated local (private) memory and I/O channels.
*   **Communication**: Processors do not share memory; they communicate by passing packets of data over an interconnection network (message-passing network).
*   **Operating System**: Each processor runs its own local copy of the Operating System.
*   **Scalability**: High. Highly scalable. You can connect hundreds or thousands of nodes without bus bottlenecks.
*   **Fault Tolerance**: High. If one node (processor or its memory) fails, the remaining nodes can continue running, preventing system-wide failure.
*   **Data Rate**: Slower transfer speed and higher latency due to network communication protocols and message-passing overhead.

---

### Diagrams (Draw in Exam):

```
  Closely Coupled (Shared RAM)          Loosely Coupled (Distributed RAM)
   ┌──────┐  ┌──────┐  ┌──────┐         ┌─────────────┐    ┌─────────────┐
   │ CPU 1│  │ CPU 2│  │ CPU 3│         │    Node 1   │    │    Node 2   │
   └──┬───┘  └──┬───┘  └──┬───┘         │ ┌───┐ ┌───┐ │    │ ┌───┐ ┌───┐ │
      │         │         │             │ │CPU│ │Mem│ │    │ │CPU│ │Mem│ │
   ═══╪═════════╪═════════╪═══          │ └───┘ └───┘ │    │ └───┘ └───┘ │
      │ Shared System Bus               └──────┬──────┘    └──────┬──────┘
   ┌──┴───────────────────┐                    │                  │
   │  SHARED MAIN MEMORY  │             ═══════╪══════════════════╪══════
   └──────────────────────┘                 Message-Passing Network
```

---

### Comparison Table:

| Feature | Closely Coupled | Loosely Coupled |
| :--- | :--- | :--- |
| **Memory** | Shared centralized RAM | Private distributed RAMs |
| **Interconnect** | Shared system bus / Crossbar | Message-passing network |
| **OS** | Single shared OS | Multiple independent OS |
| **Scalability** | Low | High |
| **Fault Tolerance** | Lower | Higher |
| **Latency** | Low (nanoseconds) | High (microseconds to milliseconds) |

---
---

## Q22. Explain Symmetric Multiprocessor (SMP) organization with diagram. (7 Marks)

*   **SMP**: A closely coupled shared-memory architecture where two or more **identical, general-purpose processors** share a single main memory and I/O channels. All processors have equal privileges and equal access speeds, with no master-slave hierarchy.

---

### Key Features (Write in Exam):

*   **Identical Processors**: All processors are identical and have equal privileges. Any processor can run any task, including OS kernel code and I/O handlers.
*   **Shared Memory & I/O**: Processors share a single main memory and I/O subsystem via a common system bus.
*   **UMA (Uniform Memory Access)**: Every processor takes the same amount of time to access any location in the shared main memory.
*   **Private Caches**: Each processor has its own private L1/L2 cache to reduce system bus traffic.
*   **Single OS**: A single copy of the Operating System runs on the SMP, managing all processors and scheduling tasks evenly.

---

### Cache Coherence & MESI Protocol:

*   *The Cache Coherence Problem*: Since each processor has its own private cache, multiple caches might hold copies of the same memory location. If one CPU updates its cache block, the other CPU caches will contain stale data.
*   *The MESI Protocol*: Maintains cache consistency by tracking the state of each cache line using 4 states:
    *   **M (Modified)**: The cache line is modified (dirty) and is different from main memory. It exists only in the current cache.
    *   **E (Exclusive)**: The cache line matches main memory and exists only in the current cache.
    *   **S (Shared)**: The cache line matches main memory and exists in other processor caches as well.
    *   **I (Invalid)**: The cache line does not contain valid data; it must be re-read from memory on the next access.
*   *Snooping*: Cache controllers monitor (snoop) the shared system bus to invalidate or update their own cache lines when they detect a write to a shared address by another CPU.

---

### Diagram (Draw in Exam):

```
  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
  │   Processor 1 │ │   Processor 2 │ │   Processor n │
  │  ┌─────────┐  │ │  ┌─────────┐  │ │  ┌─────────┐  │
  │  │ Cache   │  │ │  │ Cache   │  │ │  │ Cache   │  │
  │  └────┬────┘  │ │  └────┬────┘  │ │  └────┬────┘  │
  └───────┼───────┘ └───────┼───────┘ └───────┼───────┘
          │                 │                 │
  ════════╪═════════════════╪═════════════════╪═════════
                      Shared System Bus
  ════════╪═══════════════════════════════════╪═════════
          ├───────────────────────────────────┘
          ▼
    ┌─────────────┐       ┌─────────────┐
    │ SHARED RAM  │       │ SHARED I/O  │
    └─────────────┘       └─────────────┘
```

---
---

## Q23. Explain Flynn's Taxonomy for multiple processor organizations with diagram. (7 Marks)

*   **Flynn's Taxonomy**: A classification of computer architectures introduced by Michael J. Flynn in 1966. It groups computers into **4 classes** based on the number of concurrent **Instruction Streams** and **Data Streams** active at any time.

---

### The Four Classes (Write in Exam):

1.  **SISD (Single Instruction, Single Data)**:
    *   *Operation*: A single control unit decodes a single instruction stream to process a single data stream sequentially.
    *   *Examples*: Traditional single-core PCs, older mainframes.
2.  **SIMD (Single Instruction, Multiple Data)**:
    *   *Operation*: A single control unit broadcasts a single instruction to multiple processing elements. Each processing element executes the same instruction on **different data elements** in parallel.
    *   *Examples*: Vector processors, GPUs (Graphics Processing Units) for graphics/AI, MMX instructions.
3.  **MISD (Multiple Instruction, Single Data)**:
    *   *Operation*: Multiple processing elements execute different instructions on the **same data stream** simultaneously.
    *   *Examples*: Mostly theoretical. Used in high-reliability redundant systems, like space shuttle flight computers.
4.  **MIMD (Multiple Instruction, Multiple Data)**:
    *   *Operation*: Multiple independent processors execute different instruction streams on different data streams in parallel.
    *   *Examples*: Modern multi-core CPUs, compute clusters, distributed servers.

---

### Diagrams (Draw in Exam):

```
  SISD: [Memory] ──(Data)──► [CPU] ◄──(Instruction)── [Control Unit]

  SIMD:                       [Control Unit]
                                    │ (Instruction)
                        ┌───────────┼───────────┐
                        ▼           ▼           ▼
                      [CPU 1]     [CPU 2]     [CPU n]
                       (Data 1)    (Data 2)    (Data n)

  MIMD:               [Control 1] ──► [CPU 1] ◄── (Data 1)
                      [Control 2] ──► [CPU 2] ◄── (Data 2)
```

---

### Comparison Table:

| Class | Instruction Streams | Data Streams | Execution | Example |
| :--- | :---: | :---: | :--- | :--- |
| **SISD** | 1 | 1 | Serial / Sequential | Single-core PC |
| **SIMD** | 1 | Multiple | Vector parallel | GPU |
| **MISD** | Multiple | 1 | Redundant | Flight controls |
| **MIMD** | Multiple | Multiple | Task parallel | Multi-core CPU |

---
---

## Q24. Explain UMA vs NUMA architectures. (8 Marks)

---

### Core Concepts (Write in Exam):
*   **UMA (Uniform Memory Access)**: A shared-memory system where all processors connect to a single centralized physical memory. The access time to any memory location is **equal** for all processors.
*   **NUMA (Non-Uniform Memory Access)**: A shared-memory system where the memory is physically distributed next to each processor. A processor can access its **local memory** quickly, but accessing **remote memory** (the memory of another processor node) takes much longer.

---

### Key Differences (Write in Exam):

*   **Access Latency**:
    *   *UMA*: Equal access time for all physical addresses.
    *   *NUMA*: Varying access times (local memory access is fast; remote memory access across the interconnect is slow).
*   **Scalability**:
    *   *UMA*: Low scalability. Adding too many CPUs saturates the shared bus, causing performance to drop (typically maxes out at 16–32 CPUs).
    *   *NUMA*: High scalability. Can scale to hundreds of processors because each processor node has its own local memory bus.
*   **Cache Coherence Mechanism**:
    *   *UMA*: Uses **Bus Snooping** (like MESI) which relies on broadcasting write signals over the shared bus.
    *   *NUMA*: Uses **Directory-Based Coherence** because broadcasting write signals over a network does not scale.
*   **Programming Complexity**:
    *   *UMA*: Simple. Programmers do not need to worry about where data is placed in memory.
    *   *NUMA*: High. To prevent performance loss, programmers must optimize code for **data locality** (ensuring threads process data stored in their local RAM).

---

### Diagrams (Draw in Exam):

```
  UMA (Central RAM)                   NUMA (Distributed RAM)
  ┌─────┐                             ┌─────────────┐       ┌─────────────┐
  │CPU 1├──┐                          │   Node 1    │       │   Node 2    │
  │CPU 2├──┼─►[Shared Bus]──►[RAM]    │ [CPU]─►[RAM]│◄─────►│ [CPU]─►[RAM]│
  │CPU n├──┘                          └─────────────┘       └─────────────┘
```

---

### Comparison Table:

| Feature | UMA | NUMA |
| :--- | :--- | :--- |
| **Memory layout** | Centralized | Physically distributed |
| **Access speed** | Uniform | Non-uniform |
| **Scalability** | Low (Typically < 32 CPUs) | High (Thousands of CPUs) |
| **Interconnect** | Shared bus or Crossbar | Scalable Interconnect Network |
| **Coherence Method**| Bus Snooping (MESI) | Directory-based |

---
---

## Q25. Compare RISC and CISC architectures. (7 Marks)

---

### Core Concepts (Write in Exam):
*   **RISC**: Reduced Instruction Set Computer. CPU design focused on execution speed. It uses a **small set of simple, single-cycle instructions** and relies on a compiler to optimize instruction execution.
*   **CISC**: Complex Instruction Set Computer. CPU design focused on hardware capabilities. It uses a **large set of complex, variable-length instructions** that can perform multiple steps (like loading from memory, calculating, and storing back) in a single instruction.

---

### Key Differences (Write in Exam):

*   **Instruction Format & Size**:
    *   *RISC*: Fixed instruction size (typically 32-bit). Simplifies and speeds up instruction decoding.
    *   *CISC*: Variable instruction size (1 to 15 bytes in x86). Requires complex decoding circuits.
*   **Execution Time (CPI)**:
    *   *RISC*: Almost all instructions execute in a single clock cycle (CPI ≈ 1).
    *   *CISC*: Instructions take multiple clock cycles to execute (CPI ranges from 2 to 20+).
*   **Memory Access**:
    *   *RISC*: **Load-Store Architecture**. Only `LOAD` and `STORE` instructions can access memory. All arithmetic operations must take place between registers.
    *   *CISC*: Any instruction can access memory directly (e.g., `ADD [mem], reg`).
*   **Registers**:
    *   *RISC*: Contains a large register file (typically 32 or more general-purpose registers).
    *   *CISC*: Contains a small register file (typically 8 to 16 general-purpose registers).
*   **Control Unit Design**:
    *   *RISC*: Hardwired control unit (fast combinational logic circuits).
    *   *CISC*: Microprogrammed control unit (slower microcode ROM).
*   **Pipelining**:
    *   *RISC*: Easy to pipeline due to fixed instruction sizes and single-cycle execution.
    *   *CISC*: Difficult to pipeline because of variable instruction lengths and variable execution times.

---

### Comparison Table:

| Feature | RISC | CISC |
| :--- | :--- | :--- |
| **Instruction Size** | Fixed (e.g., 32-bit) | Variable (1 to 15 bytes) |
| **CPI (Cycles)** | ≈ 1 | High (2 - 20+) |
| **Memory Access** | Only `LOAD`/`STORE` | Allowed in any instruction |
| **General Registers**| Many (32+) | Few (8–16) |
| **Control Unit** | Hardwired | Microprogrammed |
| **Pipelining** | Easy and efficient | Difficult |
| **Examples** | ARM (mobile chips), RISC-V | Intel x86, AMD |
