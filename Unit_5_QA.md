# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Closely Coupled and Loosely Coupled Multiprocessor Systems (6 Marks)

| Comparison Parameter | Closely Coupled System | Loosely Coupled System |
| :--- | :--- | :--- |
| **1. Memory Structure** | Processors share a single centralized main memory block or common memory pool. | Each processor has its own private, distributed local memory block. |
| **2. Processor Communication** | Through shared variables and semaphores in the common memory. | Through message packets sent over a communication network. |
| **3. Data Transfer Rate** | Extremely high, limited only by the memory bus bandwidth. | Moderate to low, limited by network routing and link bandwidth. |
| **4. Operating System Layout** | A single operating system kernel controls all processors and hardware resources. | Each processor node runs its own independent copy of the OS. |
| **5. System Scaling Limits** | Low scalability because the shared memory bus becomes a bottleneck as processors are added. | High scalability since independent nodes can be added without bus conflicts. |
| **6. Hardware Fault Impact** | Lower fault tolerance; a failure in the shared memory or system bus crashes the entire system. | Higher fault tolerance; a failed node can be isolated without affecting others. |
| **7. Synchronization** | Relies on hardware locks or shared memory semaphores to coordinate access. | Uses software message-passing protocols to synchronize nodes. |
| **8. Physical Distance** | Very short, typically within a single backplane or chassis board. | Can be long, distributed across multiple rack units or network segments. |
| **9. Arbitration Controls** | Requires complex bus arbitration logic to manage shared memory bus access. | Not required since nodes access private memories over local buses. |
| **10. Typical Applications** | Symmetric multiprocessors (SMPs) and high-performance multi-core processors. | Cluster computing, grid computing, and distributed server farms. |

---
---

## Q22. Explain SMP Organization (7 Marks)

### Definition
Symmetric Multiprocessing (SMP) is a multiprocessor hardware architecture where two or more identical processors connect to a single, shared main memory and shared I/O devices. It is symmetric because all processors have equal rights to access resources, and no processor acts as a master while others act as slaves.

### Labelled Diagram
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

### Explanation of SMP Components
*   **Identical CPU Cores**: These are the physical execution units that run threads in parallel. They share the same instruction set and architecture, allowing the operating system to distribute tasks dynamically.
*   **Private Caches**: High-speed caches (L1/L2) associated with each processor to reduce bus accesses and memory read latency. They store copies of recently accessed main memory blocks.
*   **Shared System Bus**: The common address, data, and control bus that connects all processors, main memory, and I/O controllers.
*   **Shared RAM**: A single physical address space that is accessible by all processors. It holds the operating system code, active program data, and shared variables.
*   **Shared I/O Controllers**: Input/output controllers that are shared by all processors, allowing any processor to initiate disk or network transfers.

### Cache Consistency Working (Bus Snooping and MESI)
To prevent processors from reading stale data from their private caches, SMP systems use cache consistency protocols:
1. **Bus Snooping**: Cache controllers continuously monitor ("snoop") the shared system bus. If a processor writes to a memory location that exists in another processor's cache, the snooping controller invalidates or updates the local copy.
2. **MESI Protocol**: Each cache line is marked with one of four states:
   * *M (Modified)*: The cache line has been modified by the local CPU and is the only valid copy in the system (main memory is stale).
   * *E (Exclusive)*: The cache line matches main memory and is present only in the local cache.
   * *S (Shared)*: The cache line matches main memory and is present in other caches.
   * *I (Invalid)*: The cache line contains old data and must be re-read from memory.

### Key Features
*   **Load Balancing**: The operating system kernel schedules active threads across any available idle processor, maximizing throughput.
*   **Graceful Degradation**: If a processor fails, the system remains operational, disabling the failed core and continuing on the working ones.

---
---

## Q23. Explain Flynn's Taxonomy (7 Marks)

### Definition / Introduction
Flynn's Taxonomy is a classification system that categorizes computer architectures based on the number of concurrent **Instruction Streams** and **Data Streams** active in the processor. It divides computers into four classes: SISD, SIMD, MISD, and MIMD.

### Diagrams
```
  SISD:  [ Memory ] ──► [ Control Unit ] ──► [ Processor Element ]
  
  SIMD:                 ┌──────────────┐
                        │ Control Unit │
                        └──────┬───────┘
                               │ Instruction Stream (Broadcast)
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
            ┌─────────┐   ┌─────────┐   ┌─────────┐
            │  PE 1   │   │  PE 2   │   │  PE n   │
            └─────────┘   └─────────┘   └─────────┘

  MISD:     ┌─────────┐   ┌─────────┐   ┌─────────┐
            │  CU 1   │   │  CU 2   │   │  CU n   │
            └────┬────┘   └────┬────┘   └────┬────┘
                 ▼            ▼            ▼
   Data ──► ┌─────────┐ ──► ┌─────────┐ ──► ┌─────────┐ ──►
   Stream   │  PE 1   │     │  PE 2   │     │  PE n   │
            └─────────┘     └─────────┘     └─────────┘

  MIMD:      ┌─────────┐     ┌─────────┐     ┌─────────┐
             │  Node 1 │     │  Node 2 │     │  Node n │
             │ ┌───┐   │     │ ┌───┐   │     │ ┌───┐   │
             │ │CPU│   │     │ │CPU│   │     │ │CPU│   │
             │ └───┘   │     │ └───┘   │     │ └───┘   │
             └────┬────┘     └────┬────┘     └────┬────┘
                  └───────────────┼───────────────┘
                                  ▼
                        Interconnection Network
```

### Detailed Explanation of Flynn's Classes
*   SISD (Single Instruction, Single Data):
    *   *Operation*: A single control unit fetches one instruction stream from memory and executes it on a single data stream using one processor element.
    *   *Characteristics*: Standard sequential computer architecture. Execution is serialized, and there is no hardware-level parallelism.
    *   *Example*: Older single-core PCs and microcontrollers.
*   SIMD (Single Instruction, Multiple Data):
    *   *Operation*: A single control unit fetches one instruction and broadcasts it to multiple processing elements. Each processing element executes the same instruction on its own distinct data.
    *   *Characteristics*: Synchronous parallel architecture where all processing units work in lockstep.
    *   *Example*: Graphics Processing Units (GPUs) and vector processors.
*   MISD (Multiple Instruction, Single Data):
    *   *Operation*: Multiple control units fetch different instructions, and multiple processing elements execute them simultaneously on the same single data stream.
    *   *Characteristics*: Theoretical architecture, rarely used in general computing. Mainly used for redundant, fault-tolerant configurations.
    *   *Example*: Space shuttle flight controllers and backup system computers.
*   MIMD (Multiple Instruction, Multiple Data):
    *   *Operation*: Multiple independent processors fetch their own instructions and execute them on their own data streams.
    *   *Characteristics*: Asynchronous parallel architecture. The processors can communicate via shared memory or message-passing networks.
    *   *Example*: Modern multi-core processors, supercomputers, and server clusters.

### Key Features
*   **Concurrency Levels**: Flynn's taxonomy classifies systems from zero hardware concurrency (SISD) to maximum task-level concurrency (MIMD).
*   **Hardware Complexity**: SIMD requires a single decoder but multiple ALUs, while MIMD requires duplicate control units, ALUs, and bus interfaces.

---
---

## Q24. Compare UMA and NUMA Architectures (8 Marks)

| Comparison Parameter | UMA Architecture | NUMA Architecture |
| :--- | :--- | :--- |
| **1. Memory Layout** | Centralized memory pool shared equally by all processors. | Distributed physical memory adjacent to each processor node. |
| **2. Memory Access Delay** | Uniform access time; delay is constant regardless of location. | Non-uniform access time; local memory is faster than remote memory. |
| **3. Interconnection** | Uses system bus, crossbar switch, or multistage network. | Relies on high-speed point-to-point networks or router links. |
| **4. System Scalability** | Low scalability, typically limited to fewer than 32 processors. | High scalability, scaling to thousands of processors. |
| **5. Cache Consistency** | Relies on bus snooping (e.g., MESI) over the shared bus. | Uses directory-based cache consistency to avoid bus traffic. |
| **6. Memory Bandwidth** | Low total bandwidth because all processors share a single bus. | High total bandwidth because each processor has a private bus. |
| **7. Controller Complexity** | Simpler memory controller design and standard memory mapping. | Highly complex directory and routing logic inside memory controllers. |
| **8. Performance Bottleneck** | Bus conflicts or memory controller bottlenecks. | Network delays and latency during remote memory access cycles. |
| **9. Typical Application** | Personal computers, workstation multi-core processors. | High-performance computing clusters and massive database servers. |

---
---

## Q25. Compare RISC and CISC Architectures (7 Marks)

| Comparison Parameter | RISC Architecture | CISC Architecture |
| :--- | :--- | :--- |
| **1. Instruction Set Type** | Small set of simple, single-cycle instructions. | Large set of complex, variable-cycle instructions. |
| **2. Instruction Word Length** | Fixed-size instruction words (typically 32 bits). | Variable-size instruction words (1 to 15 bytes). |
| **3. Internal Register File** | Large register file (typically 32 or more registers). | Small register file (typically 8 to 16 registers). |
| **4. Control Unit Design** | Hardwired control unit using combinational logic. | Microprogrammed control unit relying on microcode ROM. |
| **5. Memory Reference Model** | Strict Load-Store architecture; only LOAD/STORE access memory. | Memory-to-memory architecture; operations can directly access RAM. |
| **6. Pipelining Compatibility** | Highly compatible with deep pipelining. | Difficult to pipeline efficiently due to variable execution times. |
| **7. Compiler Responsibility** | High compiler optimization required to schedule registers. | Simpler compiler design since hardware implements complex operations. |
| **8. Addressing Modes** | Supports a limited number of simple addressing modes. | Features a wide variety of complex addressing modes. |
| **9. Physical Chip Area** | Saves chip area, leaving more space for registers. | Reserves significant chip area for microcode ROM. |
| **10. Typical Architecture** | ARM, RISC-V, MIPS. | Intel x86, AMD. |
