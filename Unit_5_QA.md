# CO & MP: Unit V — Parallel Organization (Q&A)

---

## Q21. Closely Coupled and Loosely Coupled Multiprocessor Systems (6 Marks)

### Closely Coupled System:
*   Processors share common main memory.
*   Runs a single operating system.
*   Fast communication speeds.
*   Low scalability.

### Loosely Coupled System:
*   Each processor has its own local memory.
*   Communication happens through message passing.
*   High scalability.
*   Better fault tolerance.

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
| **Memory** | Shared. | Local. |
| **Communication** | Shared Memory. | Message Passing. |
| **OS** | Single. | Multiple. |
| **Scalability** | Low. | High. |
| **Reliability** | Lower. | Higher. |

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
*   Equal access rights to resources.

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
*   Higher performance.
*   Better resource utilization.
*   Increased reliability.
*   Supports parallel processing.

---

### Cache Consistency Concept (Other Theory):
*   Processors have private caches, which can lead to mismatching data.
*   MESI Protocol is used to keep data consistent (Modified, Exclusive, Shared, Invalid).

---
---

## Q23. Explain Flynn's Taxonomy (7 Marks)

### Definition:
*   Flynn's Taxonomy classifies computer systems based on instruction streams and data streams.

---

### Types:

*   **SISD (Single Instruction Single Data)**:
    *   Executes 1 instruction on 1 data stream at a time.
    *   Example: Single-core computer.
*   **SIMD (Single Instruction Multiple Data)**:
    *   Executes 1 instruction on multiple data streams.
    *   Example: GPU.
*   **MISD (Multiple Instruction Single Data)**:
    *   Executes multiple instructions on the same data.
    *   Example: Fault-tolerant flight systems.
*   **MIMD (Multiple Instruction Multiple Data)**:
    *   Executes multiple instructions on multiple data streams.
    *   Example: Multi-core processors.

---

### Comparison Table:

| Type | Instruction Stream | Data Stream | Example |
| :--- | :--- | :--- | :--- |
| **SISD** | Single | Single | Single-core PC |
| **SIMD** | Single | Multiple | GPU |
| **MISD** | Multiple | Single | Fault-tolerant systems |
| **MIMD** | Multiple | Multiple | Multi-core CPU |

---
---

## Q24. Compare UMA and NUMA Architectures (8 Marks)

### Definitions:
*   **UMA**: Uniform Memory Access architecture where all processors access memory with equal delay.
*   **NUMA**: Non-Uniform Memory Access architecture where memory access time depends on memory location.

---

### Comparison Table:

| Feature | UMA | NUMA |
| :--- | :--- | :--- |
| **Memory Organization** | Centralized | Distributed |
| **Access Time** | Uniform | Non-uniform |
| **Scalability** | Low | High |
| **Performance** | Moderate | Better |
| **Interconnection** | Shared Bus | High-Speed Network |
| **Complexity** | Low | High |

---

### Conclusion:
*   NUMA offers better scalability, while UMA is simpler to implement.

---
---

## Q25. Compare RISC and CISC Architectures (7 Marks)

### Comparison Table:

| Feature | RISC | CISC |
| :--- | :--- | :--- |
| **Full Form** | Reduced Instruction Set Computer | Complex Instruction Set Computer |
| **Instruction Set** | Small | Large |
| **Instruction Length** | Fixed | Variable |
| **Execution Time** | Faster | Slower |
| **Registers** | More | Fewer |
| **Control Unit** | Hardwired | Microprogrammed |
| **Pipelining** | Easy | Difficult |
| **Examples** | ARM, RISC-V | Intel x86 |

---

### Conclusion:
*   RISC provides higher speed and simpler design, whereas CISC provides powerful and complex instructions with fewer program statements.
