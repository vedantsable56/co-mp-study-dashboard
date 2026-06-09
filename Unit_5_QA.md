# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Explain closely coupled and loosely coupled multiprocessor systems with comparison. (6 Marks)

*   **Multiprocessor System**: A computer system containing two or more CPUs working together to process instructions in parallel.

---

### Closely Coupled Systems (Write in Exam):
*   **Memory**: CPUs share a single centralized main memory.
*   **Communication**: Processors communicate through shared variables in common memory.
*   **Bus**: Connected via a shared system bus or crossbar switch.
*   **OS**: Controlled by a single instance of the Operating System.
*   **Contention**: High bus contention. CPUs must wait to access the shared bus.
*   **Scalability**: Limited. Adding too many CPUs overloads the shared bus.

---

### Loosely Coupled Systems (Write in Exam):
*   **Memory**: Each CPU has its own private (local) memory and I/O.
*   **Communication**: CPUs communicate by passing messages over a network.
*   **OS**: Each CPU runs its own copy of the Operating System.
*   **Scalability**: High. You can scale the system up to hundreds of CPUs easily.
*   **Fault Tolerance**: High. If one CPU/memory fails, other nodes keep running.

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

### Comparison:

| Feature | Closely Coupled | Loosely Coupled |
| :--- | :--- | :--- |
| **Memory** | Shared centralized RAM | Private distributed RAMs |
| **Interconnect** | Shared system bus | Message-passing network |
| **OS** | Single shared OS | Multiple independent OS |
| **Scalability** | Low | High |
| **Fault Tolerance** | Lower | Higher |

---
---

## Q22. Explain Symmetric Multiprocessor (SMP) organization with diagram. (7 Marks)

*   **SMP**: A closely coupled shared-memory system where two or more **identical CPUs** share a single main memory and I/O, with equal access speeds and no master-slave hierarchy.

---

### Key Features (Write in Exam):
*   **Identical CPUs**: All processors are identical and have equal privileges.
*   **Shared Memory**: A single main memory is shared via a common bus.
*   **UMA**: Uniform Memory Access. Every CPU takes the same time to read/write RAM.
*   **Private Caches**: Each CPU has a private L1/L2 cache to reduce bus traffic.
*   **Single OS**: One OS manages all processors and schedules tasks evenly.

---

### Cache Coherence & MESI Protocol (Write in Exam):
*   *Problem*: Since CPUs have private caches, one CPU might write to its cache and create stale data in other CPU caches.
*   *Solution*: The **MESI Protocol** maintains consistency using 4 states:
    *   **M (Modified)**: Cache line is modified and different from memory.
    *   **E (Exclusive)**: Matches memory and exists only in this cache.
    *   **S (Shared)**: Matches memory and is present in other caches.
    *   **I (Invalid)**: Stale data; must not be read.
*   *Snooping*: Cache controllers watch (snoop) the shared bus to update/invalidate lines.

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

*   **Flynn's Taxonomy**: Classifies computer architectures into **4 groups** based on the number of concurrent **Instruction Streams** and **Data Streams**.

---

### The Four Classes (Write in Exam):

1.  **SISD (Single Instruction, Single Data)**:
    *   *Operation*: 1 CPU runs 1 instruction stream on 1 data stream at a time (Serial).
    *   *Examples*: Traditional single-core PCs.
2.  **SIMD (Single Instruction, Multiple Data)**:
    *   *Operation*: 1 Control Unit broadcasts 1 instruction to multiple execution units, each processing **different data** in parallel.
    *   *Examples*: GPUs, Vector/Matrix processors.
3.  **MISD (Multiple Instruction, Single Data)**:
    *   *Operation*: Multiple processors execute different instructions on the **same data stream**.
    *   *Examples*: Mainly theoretical. Used in redundant flight voting systems.
4.  **MIMD (Multiple Instruction, Multiple Data)**:
    *   *Operation*: Multiple independent CPUs execute different instruction streams on different data streams in parallel.
    *   *Examples*: Modern multi-core CPUs, Clusters, Servers.

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

### Comparison:

| Class | Instruction Streams | Data Streams | Execution | Example |
| :--- | :---: | :---: | :--- | :--- |
| **SISD** | 1 | 1 | Serial | Single-core PC |
| **SIMD** | 1 | Multiple | Vector parallel | GPU |
| **MISD** | Multiple | 1 | Redundant | Flight controls |
| **MIMD** | Multiple | Multiple | Task parallel | Multi-core CPU |

---
---

## Q24. Explain UMA vs NUMA architectures. (8 Marks)

---

### Core Concept (Write in Exam):
*   **UMA (Uniform Memory Access)**: A shared-memory system where all CPUs connect to a single central memory. RAM access time is **equal** for all CPUs.
*   **NUMA (Non-Uniform Memory Access)**: A shared-memory system where memory is physically split next to each CPU. Access to local memory is **fast**, but access to remote memory (another CPU's RAM) is **slower**.

---

### Key Differences (Write in Exam):
*   **Access Time**:
    *   *UMA*: Equal (uniform) for all addresses.
    *   *NUMA*: Non-uniform (local RAM is fast, remote RAM is slow).
*   **Scalability**:
    *   *UMA*: Limited scalability due to central system bus saturation.
    *   *NUMA*: High scalability. Adding more nodes adds local memory.
*   **Programming**:
    *   *UMA*: Simple. No memory placement rules needed.
    *   *NUMA*: Complex. Code must be optimized for **data locality**.
*   **Coherence**:
    *   *UMA*: Done via Bus Snooping.
    *   *NUMA*: Done via Directory-based protocols (snooping doesn't scale).

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

### Comparison:

| Feature | UMA | NUMA |
| :--- | :--- | :--- |
| **Memory layout** | Centralized | Physically distributed |
| **Access speed** | Uniform | Non-uniform |
| **Scalability** | Low (Typically < 32 CPUs) | High (Thousands of CPUs) |
| **Interconnect** | Shared bus or Crossbar | Scalable Interconnect Network |

---
---

## Q25. Compare RISC and CISC architectures. (7 Marks)

---

### Core Concepts (Write in Exam):
*   **RISC**: Reduced Instruction Set Computer. CPU uses a **small set of simple, single-cycle instructions**. Relies on a compiler to optimize code.
*   **CISC**: Complex Instruction Set Computer. CPU uses a **large set of complex, variable-length instructions** to perform multiple steps in a single command.

---

### Key Differences (Write in Exam):

*   **Instruction Format**:
    *   *RISC*: Fixed length (usually 32-bit). Fast decoding.
    *   *CISC*: Variable length (1 to 15 bytes in x86). Complex decoding.
*   **Execution Speed**:
    *   *RISC*: Almost all instructions run in 1 clock cycle (CPI ≈ 1).
    *   *CISC*: Instructions take multiple cycles (CPI varies from 2 to 20+).
*   **Memory Access**:
    *   *RISC*: Load-Store architecture. Only `LOAD` and `STORE` can access RAM. Arithmetic is register-to-register only.
    *   *CISC*: Any instruction can access memory directly (e.g., `ADD [mem], reg`).
*   **Registers**:
    *   *RISC*: Large register file (typically 32+ registers).
    *   *CISC*: Few general-purpose registers (typically 8–16).
*   **Control Unit**:
    *   *RISC*: Hardwired control unit (fast combinational logic circuits).
    *   *CISC*: Microprogrammed control unit (complex microcode ROM).

---

### Comparison Table:

| Feature | RISC | CISC |
| :--- | :--- | :--- |
| **Instruction Size** | Fixed (e.g., 32-bit) | Variable (1 to 15 bytes) |
| **CPI (Cycles)** | ≈ 1 | High (2 - 20+) |
| **RAM Access** | Only `LOAD`/`STORE` | Allowed in any instruction |
| **General Registers**| Many (32+) | Few (8–16) |
| **Control Unit** | Hardwired | Microprogrammed |
| **Pipelining** | Easy and efficient | Difficult |
| **Examples** | ARM (mobile CPUs), RISC-V | Intel x86, AMD |
