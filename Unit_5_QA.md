# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Closely Coupled and Loosely Coupled Multiprocessor Systems (6 Marks)

### Core Theory (Write in Exam):
*   **Bus Arbitration**: In closely coupled systems, CPUs share a single bus. An arbitrator decides which CPU gets bus access (using daisy chaining or polling) to prevent bus conflicts.
*   **Interconnection Networks**: Loosely coupled systems connect nodes using networks (like mesh, ring, or hypercube topologies) to route message packets between nodes.

---

### Key Concepts:

*   **Closely Coupled System**:
    *   Processors share a common centralized main memory.
    *   CPUs communicate via shared memory variables.
    *   Runs a single operating system.
    *   Fast communication speeds but low scalability.
*   **Loosely Coupled System**:
    *   Each processor has its own private memory and I/O.
    *   CPUs communicate by passing message packets.
    *   Each processor runs its own copy of the OS.
    *   High scalability and better fault tolerance.

---

### Diagram (Draw in Exam):

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
| **Memory** | Shared centralized memory pool. | Private local memory for each CPU. |
| **Communication** | Through shared variables in common memory. | Through message passing over a network. |
| **OS** | Single OS controls all CPUs. | Each CPU runs its own local OS copy. |
| **Scalability** | Low due to bus and memory bottlenecks. | High since nodes are independent. |
| **Reliability** | Lower (shared memory failure crashes system). | Higher (node failure does not affect others). |

---
---

## Q22. Explain SMP Organization (7 Marks)

### Definition:
*   SMP (Symmetric Multiprocessing) is a multiprocessor system in which all processors share memory and I/O resources equally.

---

### Features:
*   Multiple identical processors.
*   Shared memory.
*   Shared I/O devices.
*   Single operating system.
*   Equal access rights to resources (no master-slave setup).

---

### Core Theory of Cache Consistency (Write in Exam):
*   **MESI Protocol**: Keeps data matching across private CPU caches using 4 states:
    *   *M (Modified)*: Cache line is changed; RAM holds old data.
    *   *E (Exclusive)*: Cache matches RAM and exists only in this cache.
    *   *S (Shared)*: Cache matches RAM and is present in other caches.
    *   *I (Invalid)*: Cache data is old and must be re-read.
*   **Bus Snooping**: Cache controllers watch the shared bus to invalidate or update their own lines when another CPU writes to a shared location.

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

### Advantages:
*   **Higher performance**: Parallel execution of multiple threads.
*   **Better resource utilization**: OS schedules tasks dynamically on idle CPUs.
*   **Increased reliability**: If one CPU fails, other CPUs keep running.
*   **Parallel processing**: Speeds up heavy scientific and database tasks.

---
---

## Q23. Explain Flynn's Taxonomy (7 Marks)

### Definition:
*   Flynn's Taxonomy classifies computer systems based on the number of instruction streams and data streams active in the processor.

---

### Core Theory of Flynn's Elements (Write in Exam):
*   **Control Unit (CU)**: Fetches and decodes instructions.
*   **Processing Element (PE)**: Performs arithmetic and logic operations.
*   **Memory Module (MM)**: Stores instructions and active data.

---

### The Four Classes:

*   **SISD (Single Instruction Single Data)**:
    *   1 instruction stream processes 1 data stream sequentially.
    *   Example: Older single-core PCs.
*   **SIMD (Single Instruction Multiple Data)**:
    *   1 control unit broadcasts 1 instruction to multiple execution units processing different data.
    *   Example: GPUs.
*   **MISD (Multiple Instruction Single Data)**:
    *   Multiple execution units process the same data using different instructions.
    *   Example: Redundant backup flight computers.
*   **MIMD (Multiple Instruction Multiple Data)**:
    *   Multiple independent CPUs run different instructions on different data.
    *   Example: Modern multi-core processors.

---

### Comparison Table:

| Type | Instruction Stream | Data Stream | Example |
| :--- | :--- | :--- | :--- |
| **SISD** | Single instruction stream. | Single data stream. | Single-core PC. |
| **SIMD** | Single instruction stream. | Multiple data streams. | GPU (Graphics Processing Unit). |
| **MISD** | Multiple instruction streams. | Single data stream. | Redundant flight systems. |
| **MIMD** | Multiple instruction streams. | Multiple data streams. | Multi-core CPU. |

---
---

## Q24. Compare UMA and NUMA Architectures (8 Marks)

### Core Theory (Write in Exam):
*   **Data Locality**: NUMA performance depends on placing program data in the physical RAM node closest to the executing CPU to minimize access delays.
*   **Directory Coherence**: NUMA systems use a directory protocol to keep track of block states in private caches because bus snooping does not scale across networks.

---

### Definitions:
*   **UMA**: Uniform Memory Access architecture where all processors access memory with equal delay.
*   **NUMA**: Non-Uniform Memory Access architecture where memory access time depends on memory location.

---

### Comparison Table:

| Feature | UMA | NUMA |
| :--- | :--- | :--- |
| **Memory Organization** | Centralized (one memory pool for all). | Distributed (RAM physically next to each CPU). |
| **Access Time** | Uniform (same delay for all addresses). | Non-uniform (local RAM is fast, remote is slow). |
| **Scalability** | Low (usually limited to < 32 CPUs). | High (can scale to thousands of CPUs). |
| **Performance** | Moderate (bottlenecks on shared bus). | Better (high local memory bandwidth). |
| **Interconnection** | Shared system bus or crossbar. | High-speed interconnection networks. |
| **Complexity** | Low hardware design complexity. | High design and programming complexity. |

---

### Conclusion:
*   NUMA offers better scalability for massive server systems, while UMA is simpler to implement.

---
---

## Q25. Compare RISC and CISC Architectures (7 Marks)

### Core Theory (Write in Exam):
*   **Load-Store Architecture**: In RISC, only `LOAD` and `STORE` instructions access memory. All arithmetic operations must take place between registers.
*   **Microprogramming**: CISC uses a microprogram ROM to break down complex instructions into a sequence of simple micro-operations inside the CPU.

---

### Comparison Table:

| Feature | RISC | CISC |
| :--- | :--- | :--- |
| **Full Form** | Reduced Instruction Set Computer. | Complex Instruction Set Computer. |
| **Instruction Set** | Small set of simple, single-cycle instructions. | Large set of complex, multi-cycle instructions. |
| **Instruction Length** | Fixed size (typically 32-bit) for easy decoding. | Variable size (1 to 15 bytes) requiring complex decoders. |
| **Execution Time** | Faster (most instructions run in 1 clock cycle). | Slower (instructions take multiple clock cycles). |
| **Registers** | Large register file (typically 32+ registers). | Fewer registers (typically 8 to 16 general registers). |
| **Control Unit** | Hardwired using fast combinational logic gates. | Microprogrammed using complex microcode ROM. |
| **Pipelining** | Easy and highly efficient due to fixed size. | Difficult due to variable lengths and execution times. |
| **Examples** | ARM (mobile chips), RISC-V. | Intel x86, AMD. |

---

### Conclusion:
*   RISC provides higher speed and simpler design, whereas CISC provides powerful and complex instructions with fewer program statements.
