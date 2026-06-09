# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Explain closely coupled and loosely coupled multiprocessor systems with comparison. (6 Marks)

*   **Multiprocessor System**:
    *   Contains two or more CPUs working together.
    *   Processes instructions in parallel.
    *   Shares workload to increase performance.
    *   Classified by degree of memory sharing.

---

### Closely Coupled Systems (Write in Exam):

*   **Memory Structure**: Processors share a single central memory (UMA).
*   **Communication**: CPUs communicate through variables in shared memory.
*   **Interconnection**: Connected via system bus or crossbar switch.
*   **Operating System**: Controlled by a single, shared OS instance.
*   **Bus Contention**: High bus conflict as CPU count grows.
*   **Scalability**: Low; limited to under 32 processors.
*   **Data Rate**: High speed; very low delay.

---

### Loosely Coupled Systems (Write in Exam):

*   **Memory Structure**: Each processor has local memory and I/O.
*   **Communication**: CPUs pass packets over a message network.
*   **Operating System**: Each CPU runs its own local OS copy.
*   **Scalability**: High; scales to thousands of nodes.
*   **Fault Tolerance**: High; node failure does not crash the system.
*   **Data Rate**: Slower speeds with higher delay.

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
| **Delay** | Low (nanoseconds) | High (microseconds) |

---
---

## Q22. Explain Symmetric Multiprocessor (SMP) organization with diagram. (7 Marks)

*   **SMP**:
    *   Closely coupled system with identical CPUs.
    *   Processors share single memory and I/O.
    *   Uniform memory access speeds.
    *   No master-slave relationship.

---

### Key Features (Write in Exam):

*   **Identical Processors**: All CPUs have equal privileges.
*   **Shared Memory & I/O**: Share components via common system bus.
*   **UMA (Uniform Memory Access)**: Access speed to RAM is equal.
*   **Private Caches**: Each CPU has private cache to reduce bus traffic.
*   **Single OS**: One OS manages schedules and tasks.

---

### Cache Consistency & MESI Protocol:

*   *The Cache Consistency Problem*:
    *   CPUs have private caches.
    *   Multiple caches can hold copies of same memory address.
    *   If one CPU writes to cache, other caches get stale data.
*   *The MESI Protocol*:
    *   Maintains consistency using 4 states:
    *   **M (Modified)**: Cache is modified (dirty); memory is old.
    *   **E (Exclusive)**: Cache matches memory; exists only here.
    *   **S (Shared)**: Cache matches memory; exists in other caches.
    *   **I (Invalid)**: Cache data is old and invalid.
*   *Snooping*: Cache controllers watch the bus to update/invalidate lines.

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

*   **Flynn's Taxonomy**:
    *   Classification of computer systems (Michael Flynn, 1966).
    *   Based on number of concurrent instruction streams.
    *   Based on number of concurrent data streams.

---

### The Four Classes (Write in Exam):

1.  **SISD (Single Instruction, Single Data)**:
    *   *Operation*: 1 instruction stream processes 1 data stream sequentially.
    *   *Examples*: Traditional single-core computers.
2.  **SIMD (Single Instruction, Multiple Data)**:
    *   *Operation*: 1 instruction controls multiple execution units.
    *   *Operation*: Each processes different data in parallel.
    *   *Examples*: GPUs, vector processors.
3.  **MISD (Multiple Instruction, Single Data)**:
    *   *Operation*: Multiple instructions process same data stream.
    *   *Examples*: Space Shuttle flight computers (redundancy).
4.  **MIMD (Multiple Instruction, Multiple Data)**:
    *   *Operation*: Multiple CPUs run different instruction/data streams.
    *   *Examples*: Modern multi-core PCs, compute clusters.

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
| **SISD** | 1 | 1 | Sequential | Single-core PC |
| **SIMD** | 1 | Multiple | Parallel | GPU |
| **MISD** | Multiple | 1 | Redundant | Flight controls |
| **MIMD** | Multiple | Multiple | Parallel | Multi-core CPU |

---
---

## Q24. Explain UMA vs NUMA architectures. (8 Marks)

---

### Core Concepts (Write in Exam):
*   **UMA (Uniform Memory Access)**:
    *   Shared-memory multiprocessor.
    *   All CPUs connect to centralized memory.
    *   Access time to RAM is equal for all CPUs.
*   **NUMA (Non-Uniform Memory Access)**:
    *   Shared-memory multiprocessor.
    *   Memory is physically distributed close to each CPU.
    *   Local memory access is fast; remote memory access is slow.

---

### Key Differences (Write in Exam):

*   **Access Time**:
    *   *UMA*: Equal access time for all addresses.
    *   *NUMA*: Varying access times (local is fast, remote is slow).
*   **Scalability**:
    *   *UMA*: Low scalability; shared bus gets overloaded.
    *   *NUMA*: High scalability; adding nodes adds local memory.
*   **Cache Consistency Mechanism**:
    *   *UMA*: Uses Bus Snooping (like MESI).
    *   *NUMA*: Uses Directory-Based consistency.
*   **Programming Complexity**:
    *   *UMA*: Simple; memory locations are uniform.
    *   *NUMA*: High; must optimize code for data locality.

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
| **Consistency Method**| Bus Snooping (MESI) | Directory-based |

---
---

## Q25. Compare RISC and CISC architectures. (7 Marks)

---

### Core Concepts (Write in Exam):
*   **RISC**:
    *   Reduced Instruction Set Computer.
    *   Uses small set of simple, single-cycle instructions.
    *   Relies on compiler optimization.
*   **CISC**:
    *   Complex Instruction Set Computer.
    *   Uses large set of multi-cycle instructions.
    *   Performs complex multi-step operations in single instruction.

---

### Key Differences (Write in Exam):

*   **Instruction Size**:
    *   *RISC*: Fixed size (typically 32-bit); fast decoding.
    *   *CISC*: Variable size (1 to 15 bytes); complex decoding.
*   **Execution Time (CPI)**:
    *   *RISC*: Almost all instructions run in 1 cycle (CPI ≈ 1).
    *   *CISC*: Instructions take multiple cycles (CPI 2 to 20+).
*   **Memory Access**:
    *   *RISC*: Load-store model (only LOAD/STORE access memory).
    *   *CISC*: Direct memory access in any instruction.
*   **Registers**:
    *   *RISC*: Large register file (typically 32+ registers).
    *   *CISC*: Small register file (typically 8 to 16).
*   **Control Unit Design**:
    *   *RISC*: Hardwired control unit (combinational logic).
    *   *CISC*: Microprogrammed control unit (microcode ROM).
*   **Pipelining**:
    *   *RISC*: Easy to pipeline due to fixed sizes.
    *   *CISC*: Hard to pipeline due to variable times/sizes.

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
| **Examples** | ARM, RISC-V | Intel x86, AMD |
