# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Closely Coupled and Loosely Coupled Multiprocessor Systems (6 Marks)

### Introduction:
*   Multiprocessor systems contain two or more processors (CPUs) that operate in parallel to execute programs.
*   Based on how the processors share memory and communicate, these systems are classified into **Closely Coupled Systems** and **Loosely Coupled Systems**.

---

### Core Theory (Write in Exam):
*   **Bus Access Control**: In closely coupled systems, multiple CPUs share a single system bus to access the central memory. A hardware arbitrator or bus controller resolves conflicts when multiple CPUs try to use the bus at the same time, ensuring fair access.
*   **Interconnection Networks**: Loosely coupled systems connect independent computer nodes using communication networks. These networks route data packets between nodes using topologies like mesh, ring, or hypercube layouts.

---

### Key Concepts:

*   **Closely Coupled System**:
    *   **Shared Memory**: All processors share a common, centralized main memory space.
    *   **Communication**: CPUs communicate directly with each other by writing and reading shared variables in the common RAM.
    *   **Operating System**: Runs under the control of a single, centralized operating system that manages all hardware.
    *   **Speed**: Offers high-speed communication due to direct memory access, but has low scalability because the shared bus becomes a bottleneck.
*   **Loosely Coupled System**:
    *   **Distributed Memory**: Each processor has its own private, local memory and dedicated I/O channels.
    *   **Communication**: CPUs communicate by passing message packets to each other over a network.
    *   **Operating System**: Each individual node runs its own local copy of the operating system.
    *   **Scalability**: Highly scalable and offers excellent fault tolerance, as the failure of one node does not crash the entire system.

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

| Comparison Point | Closely Coupled System | Loosely Coupled System |
| :--- | :--- | :--- |
| **1. Memory Structure** | Shared centralized memory pool. | Private local memory for each CPU node. |
| **2. Communication** | Through shared variables in common memory. | Through message packets sent over a network. |
| **3. Operating System** | Single centralized OS controls all CPUs. | Each CPU node runs its own independent OS. |
| **4. Scalability** | Low (adding too many CPUs bottlenecks bus). | High (can add thousands of independent nodes). |
| **5. Fault Tolerance** | Lower (shared memory failure crashes system). | Higher (failed node can be isolated easily). |
| **6. Data Transfer Rate**| Extremely high (limited only by RAM speed). | Moderate to low (limited by network bandwidth). |
| **7. Connection Distance**| Very short (within a single chassis/board). | Can be long (distributed across network). |
| **8. Synchronization** | Hardwired or via shared memory semaphores. | Software-driven message-passing protocols. |
| **9. Bus Access Control**| Required to manage shared bus access. | Not required (nodes use private buses). |

---
---

## Q22. Explain SMP Organization (7 Marks)

### Definition:
*   SMP (Symmetric Multiprocessing) is a multiprocessor hardware architecture where two or more identical processors connect to a single, shared main memory and shared I/O devices.
*   It is "symmetric" because all processors have equal rights to access resources, and no processor acts as a master while others act as slaves.

---

### Features:
*   **Identical Processors**: All CPUs in the system have the same processing capabilities and architecture.
*   **Shared Memory**: A single physical address space is shared by all processors.
*   **Shared I/O**: All processors share access to the same input and output channels.
*   **Single Operating System**: One OS kernel runs and manages the execution of threads across all CPUs.
*   **Equal Access**: All CPUs share equal memory access delays.

---

### Core Theory of Cache Consistency (Write in Detail):

In an SMP system, each processor has its own private L1/L2 cache. This creates a data consistency problem: if CPU 1 modifies a variable in its cache, CPU 2 might read stale (old) data from its own cache. SMP systems solve this using two mechanisms:

1.  **Bus Snooping**:
    *   Each CPU's cache controller continuously watches ("snoops") the shared system bus.
    *   If a CPU detects that another processor is writing to a memory address that it currently holds in its own cache, the snooping controller automatically invalidates its local copy or updates it.

2.  **MESI Protocol**:
    *   To keep data consistent, each cache line is marked with one of four states:
        *   **M (Modified)**: The cache line has been changed by the local CPU and is different from main memory. This is the only valid copy in the system.
        *   **E (Exclusive)**: The cache line matches main memory and is present *only* in the local CPU's cache.
        *   **S (Shared)**: The cache line matches main memory and is present in other CPU caches.
        *   **I (Invalid)**: The cache line contains old, out-of-date data and must be re-read from memory before use.

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
*   **Higher Throughput**: Parallel execution allows multiple tasks or threads to run at the same time, speeding up heavy workloads.
*   **Dynamic Scheduling**: The operating system can balance workloads by dynamically assigning tasks to idle processors.
*   **System Reliability**: If one processor fails, the operating system can disable it and continue running tasks on the remaining CPUs.
*   **Simplicity**: The programmer sees a single large memory pool, making it easier to write multi-threaded applications compared to distributed memory systems.

---
---

## Q23. Explain Flynn's Taxonomy (7 Marks)

### Definition:
*   Flynn's Taxonomy is a classification system proposed by Michael J. Flynn in 1966 that categorizes computer architectures based on the number of concurrent **Instruction Streams** and **Data Streams** active in the processor.

---

### Core Elements (Write in Exam):
*   **Control Unit (CU)**: The hardware unit that fetches and decodes the instruction stream.
*   **Processing Element (PE)**: The arithmetic and logic unit (ALU) that executes the operations on the data stream.
*   **Memory Module (MM)**: The memory unit storing the instruction code and data values.

---

### Detailed Flynn's Taxonomy Classes:

#### 1. SISD (Single Instruction, Single Data):
*   **Description**: A standard sequential computer system where a single processor executes one instruction at a time on a single data stream.
*   **Hardware Setup**: Contains 1 Control Unit, 1 Processing Element, and 1 Memory Module.
*   **Example**: Classic single-core PCs and older microcontrollers.
*   **Diagram**:
    ```
    ┌──────────┐  Inst.  ┌──────────┐  Data  ┌──────────┐
    │ Memory   ├────────►│ Control  ├───────►│Processor │◄══► Data Memory
    │ (Code)   │  Stream │  Unit    │ Stream │ Element  │
    └──────────┘         └──────────┘        └──────────┘
    ```

#### 2. SIMD (Single Instruction, Multiple Data):
*   **Description**: A parallel architecture where a single control unit broadcasts a single instruction to multiple processing elements. Each processing element executes the same instruction on its own distinct data.
*   **Hardware Setup**: Contains 1 Control Unit, multiple Processing Elements, and multiple Data Memory modules. All PEs operate in lockstep.
*   **Example**: GPUs (Graphics Processing Units) and vector processors.
*   **Diagram**:
    ```
                      ┌─────────┐
                      │ Control │
                      │  Unit   │
                      └────┬────┘
                           │ Instruction Stream (Broadcast)
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
        ┌─────────┐   ┌─────────┐   ┌─────────┐
        │  PE 1   │   │  PE 2   │   │  PE n   │
        └────▲────┘   └────▲────┘   └────▲────┘
             │ Data 1      │ Data 2      │ Data n
        ┌────┴────┐   ┌────┴────┐   ┌────┴────┐
        │  Mem 1  │   │  Mem 2  │   │  Mem n  │
        └─────────┘   └─────────┘   └─────────┘
    ```

#### 3. MISD (Multiple Instruction, Single Data):
*   **Description**: A theoretical parallel architecture where multiple processing elements execute different instructions simultaneously on the same single data stream.
*   **Hardware Setup**: Multiple Control Units feed instructions to multiple Processing Elements, which process data from a shared memory.
*   **Example**: Rare in practice; used mainly for fault-tolerant redundant systems (like space shuttle backup computers).
*   **Diagram**:
    ```
        ┌─────────┐     ┌─────────┐     ┌─────────┐
        │  CU 1   │     │  CU 2   │     │  CU n   │
        └────┬────┘     └────┬────┘     └────┬────┘
             │ Inst 1        │ Inst 2        │ Inst n
             ▼               ▼               ▼
        ┌─────────┐     ┌─────────┐     ┌─────────┐
   ─────►│  PE 1   ├────►│  PE 2   ├────►│  PE n   ├─────►
  Data   └─────────┘     └─────────┘     └─────────┘
  Stream
    ```

#### 4. MIMD (Multiple Instruction, Multiple Data):
*   **Description**: A parallel architecture where multiple independent processors execute different instructions on different data streams.
*   **Hardware Setup**: Contains multiple independent Control Units and Processing Elements (fully autonomous CPU cores) accessing shared or distributed memory.
*   **Example**: Modern multi-core laptops, servers, and supercomputer clusters.
*   **Diagram**:
    ```
     ┌───────────┐     ┌───────────┐     ┌───────────┐
     │  Node 1   │     │  Node 2   │     │  Node n   │
     │ ┌───┐┌───┐│     │ ┌───┐┌───┐│     │ ┌───┐┌───┐│
     │ │CU ││PE ││     │ │CU ││PE ││     │ │CU ││PE ││
     │ └───┘└───┘│     │ └───┘└───┘│     │ └───┘└───┘│
     └─────┬─────┘     └─────┬─────┘     └─────┬─────┘
           └─────────────────┼─────────────────┘
                             ▼
                   Interconnection Network
    ```

---

### Comparison Table:

| Comparison Point | SISD | SIMD | MISD | MIMD |
| :--- | :--- | :--- | :--- | :--- |
| **1. Inst. Streams** | Single. | Single. | Multiple. | Multiple. |
| **2. Data Streams** | Single. | Multiple. | Single. | Multiple. |
| **3. Control Units** | One CU. | One CU. | Multiple CUs. | Multiple CUs. |
| **4. ALU/PEs** | One PE. | Multiple PEs. | Multiple PEs. | Multiple PEs. |
| **5. Processing Type** | Sequential. | Synchronous parallel. | Redundant parallel. | Asynchronous parallel. |
| **6. Programming** | Simple. | Hard (requires vectors). | Hard. | Hard (needs thread sync). |
| **7. Scalability** | None. | High for data tasks. | Low. | High for general tasks. |
| **8. Typical Example** | Single-core PC. | GPU. | Backup flight system. | Multi-core CPU. |

---
---

## Q24. Compare UMA and NUMA Architectures (8 Marks)

### Core Theory (Write in Exam):
*   **Memory Delay Uniformity**: In multiprocessor systems, physical memory access speed depends on layout. UMA provides constant delays, whereas NUMA optimizes local access.
*   **Directory-based Cache Consistency**: NUMA systems scale past the limits of bus snooping because snooping generates too much bus traffic. Instead, they use a directory-based protocol where a central directory tracks the state and sharing of all cache blocks.

---

### Definitions:
*   **UMA (Uniform Memory Access)**: A shared memory architecture where all processors access any location in main memory with equal delay.
*   **NUMA (Non-Uniform Memory Access)**: A shared memory architecture where memory access delays vary depending on the physical location of the memory relative to the processor.

---

### Comparison Table:

| Comparison Point | UMA Architecture | NUMA Architecture |
| :--- | :--- | :--- |
| **1. Memory Layout** | Centralized memory pool shared by all. | Distributed memory next to each CPU. |
| **2. Memory Access Delay**| Uniform (constant delay). | Non-uniform (fast local, slow remote). |
| **3. Scalability** | Low (limited by bus, < 32 CPUs). | High (can scale to thousands of CPUs). |
| **4. Interconnection** | System bus, crossbar, or multistage. | High-speed network/router links. |
| **5. Cache Consistency** | Bus snooping (MESI protocol). | Directory-based consistency protocol. |
| **6. Complexity** | Simpler hardware and software design. | Complex hardware and memory mapping. |
| **7. Bottleneck Location** | Centralized system bus or memory. | Interconnection network switches. |
| **8. Memory Bandwidth** | Low (shared bus limits simultaneous access). | High (each CPU has private memory bus). |
| **9. Typical Application** | Personal computers, small servers. | Enterprise servers, cluster computing. |

---

### Conclusion:
*   UMA is simple to design and ideal for small, general-purpose systems, while NUMA provides the scaling needed for large-scale enterprise servers and supercomputers by reducing bus bottlenecks.

---
---

## Q25. Compare RISC and CISC Architectures (7 Marks)

### Core Theory (Write in Exam):
*   **Load-Store Architecture**: In RISC, instructions are not allowed to modify memory directly. All mathematical operations must take place between registers. The processor uses separate `LOAD` and `STORE` instructions to transfer data between memory and registers.
*   **Microprogramming**: CISC processors use a microprogram ROM. A complex assembly instruction is decoded into a sequence of simpler micro-operations stored in the internal ROM, allowing execution of complex, multi-cycle instructions.

---

### Comparison Table:

| Comparison Point | RISC Architecture | CISC Architecture |
| :--- | :--- | :--- |
| **1. Full Form** | Reduced Instruction Set Computer. | Complex Instruction Set Computer. |
| **2. Instruction Set** | Small set of simple, single-cycle instructions. | Large set of complex, multi-cycle instructions. |
| **3. Instruction Length** | Fixed size (typically 32-bit) for easy decoding. | Variable size (1 to 15 bytes) requiring complex decoders. |
| **4. Execution Time** | Faster (most instructions run in 1 clock cycle). | Slower (instructions take multiple clock cycles). |
| **5. Registers** | Large register file (typically 32+ registers). | Fewer registers (typically 8 to 16 general registers). |
| **6. Control Unit** | Hardwired using fast combinational logic gates. | Microprogrammed using complex microcode ROM. |
| **7. Pipelining** | Easy and highly efficient due to fixed size. | Difficult due to variable lengths and execution times. |
| **8. Assembly Focus** | Software-focused (compilers optimize register use). | Hardware-focused (single commands do complex tasks). |
| **9. Memory Access** | Load-Store design (only LOAD/STORE access memory). | Memory-to-memory design (operations work on RAM). |
| **10. Typical Examples** | ARM (mobile chips), RISC-V, MIPS. | Intel x86, AMD, Motorola 68k. |

---

### Conclusion:
*   RISC focuses on hardware simplicity and fast single-cycle execution, delegating optimization to compilers, whereas CISC focuses on complex instructions that simplify assembly programming at the cost of hardware complexity.
