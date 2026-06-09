# CO & MP: Unit II — Memory Management (Q&A)

---

## Q6. Explain the Difference Between Write-Through and Write-Back Policies (6 Marks)

### Short Definition & Core Concept:
*   **The Cache Write Problem**: When the CPU writes or updates data, it changes it in the fast cache. We must choose when to update the slower main memory (RAM) to keep data matching.
*   **Write-Through Policy**: Updates both the cache and the RAM at the same time on every single write.
*   **Write-Back Policy**: Updates only the cache line immediately. RAM is updated later, only when that cache line is removed to make space.

---

### Comparison Table (Write in Exam):

| Point / Feature | Write-Through Policy | Write-Back Policy |
| :--- | :--- | :--- |
| **1. Update Timing** | Instant (on every single write). | Delayed (only when block is removed). |
| **2. Write Speed** | Slower (runs at slow RAM speed). | Faster (runs at fast cache speed). |
| **3. Bus Traffic** | High (every write uses the system bus). | Low (only block removal uses the bus). |
| **4. CPU Stalls** | Yes (happens if write buffer gets full). | No (CPU never waits for slow RAM). |
| **5. Dirty Bit** | Not required. | Required (tracks if cache block changed). |
| **6. Design Complexity** | Simple. | Highly complex. |
| **7. Crash Safety** | High (no data is lost on sudden crash). | Lower (unsaved cache changes are lost). |
| **8. Multi-CPU Consistency** | Simple (other CPUs see RAM updates instantly).| Complex (needs consistency tracking). |
| **9. Hardware Component** | Uses a Write Buffer. | Uses a Cache Controller. |
| **10. Storage Overhead** | No extra bits needed. | Requires dirty bit per cache line. |

---
---

## Q7. Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative (7 Marks)

### Short Definition & Core Concept:
*   **Cache Mapping**: Rules that define where a main memory block is placed inside the smaller cache memory.
*   **Direct Mapping**: Each memory block maps to exactly one specific cache line.
*   **Fully Associative Mapping**: A memory block can be placed in any cache line.
*   **Set-Associative Mapping**: Cache is split into sets; block maps to a set, and can sit in any line within that set.

---

### Address Formats:

```
  Direct Mapped:      [ TAG (Variable) ] [ LINE INDEX ] [ WORD OFFSET ]
  Fully Associative:  [ TAG (Large)                    ] [ WORD OFFSET ]
  Set-Associative:    [ TAG (Variable) ] [ SET INDEX  ] [ WORD OFFSET ]
```

---

### Comparison Table (Write in Exam):

| Point / Feature | Direct Mapping | Fully Associative Mapping | Set-Associative Mapping |
| :--- | :--- | :--- | :--- |
| **1. Block Location** | Only 1 fixed cache line. | Any line in the cache. | Any line within a specific set. |
| **2. Address Fields** | Tag, Line Index, Word Offset. | Tag, Word Offset. | Tag, Set Index, Word Offset. |
| **3. Tag Comparators**| Only 1 comparator. | N comparators (one for every line). | K comparators (one for each line in set). |
| **4. Conflict Misses**| Highest (very frequent swaps). | Zero (no conflicts). | Low. |
| **5. Lookup Speed** | Fastest (checks only 1 line index).| Slower (checks all lines in parallel).| Moderate (checks lines in 1 set). |
| **6. Hardware Cost** | Lowest. | Highest (needs CAM memory). | Moderate. |
| **7. Replacement Rule**| Not needed. | Needed (LRU, FIFO, etc.). | Needed (LRU, FIFO, etc.). |
| **8. Swapping (Thrashing)**| High (frequent cache line overwrites).| None. | Low. |
| **9. Design Complexity**| Very simple. | Very complex. | Moderate. |
| **10. Typical Use** | L1 cache (simple devices). | Translation Buffers (TLBs). | L1, L2, L3 in modern CPUs. |

---
---

## Q8. Write a Note on RAID and Its Levels in Detail with Diagram (7 Marks)

*   **RAID**:
    *   Redundant Array of Independent Disks.
    *   Combines physical disks into one logical drive.
    *   Improves speed and data safety.

---

### Core RAID Levels (Write in Exam):

*   **RAID 0 (Striping)**:
    *   *Data distribution*: Blocks split and written across disks.
    *   *Pros*: Fastest read and write speeds.
    *   *Pros*: 100% space efficiency (no storage lost).
    *   *Cons*: No fault tolerance; 1 disk failure loses all data.
    *   *Min. Disks*: 2
*   **RAID 1 (Mirroring)**:
    *   *Data distribution*: Exact data duplicated on backup disks.
    *   *Pros*: High safety; survives single disk failure.
    *   *Cons*: High cost; only 50% space efficiency.
    *   *Min. Disks*: 2
*   **RAID 5 (Distributed Parity)**:
    *   *Data distribution*: Blocks striped; parity backup rotated.
    *   *Pros*: Good balance; survives 1 disk failure.
    *   *Pros*: More efficient than RAID 1.
    *   *Cons*: Slow writes due to parity calculations.
    *   *Min. Disks*: 3
*   **RAID 6 (Dual Distributed Parity)**:
    *   *Data distribution*: Like RAID 5, but writes two parity blocks.
    *   *Pros*: High safety; survives 2 disk failures.
    *   *Cons*: Slowest writes due to double parity math.
    *   *Min. Disks*: 4

---

### Other RAID Levels (Briefly Mention in Exam):
*   **RAID 2**: Bit-level striping with Hamming code parity.
*   **RAID 3**: Byte-level striping with a single parity disk.
*   **RAID 4**: Block-level striping with a single parity disk.

---

### Diagrams (Draw in Exam):

```
  RAID 0 (Striping)              RAID 1 (Mirroring)
  ┌──────────┐  ┌──────────┐     ┌──────────┐  ┌──────────┐
  │  Disk 0  │  │  Disk 1  │     │  Disk 0  │  │  Disk 1  │
  ├──────────┤  ├──────────┤     ├──────────┤  ├──────────┤
  │ Block A  │  │ Block B  │     │ Block A  │  │ Block A  │ (Copy)
  │ Block C  │  │ Block D  │     │ Block B  │  │ Block B  │ (Copy)
  └──────────┘  └──────────┘     └──────────┘  └──────────┘

  RAID 5 (Distributed Parity)
  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │  Disk 0  │  │  Disk 1  │  │  Disk 2  │  │  Disk 3  │
  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤
  │ Block A  │  │ Block B  │  │ Block C  │  │ Parity 1 │
  │ Block D  │  │ Block E  │  │ Parity 2 │  │ Block F  │
  │ Block G  │  │ Parity 3 │  │ Block H  │  │ Block I  │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

### Summary Table:

| Level | Strategy | Fault Tolerance | Usable Space | Performance |
| :--- | :--- | :--- | :---: | :--- |
| **RAID 0** | Striping | 0 disk failures | 100% | High Read, High Write |
| **RAID 1** | Mirroring | 1 disk failure | 50% | High Read, Normal Write |
| **RAID 5** | Distributed Parity | 1 disk failure | (N-1)/N | High Read, Slow Write |
| **RAID 6** | Dual Parity | 2 disk failures | (N-2)/N | High Read, Slower Write |

---
---

## Q9. Describe LRU, FIFO, and LFU Replacement Algorithms (7 Marks)

*   **The Cache Replacement Problem**:
    *   Cache memory has limited size.
    *   When full, old blocks must be removed to load new data.
    *   Algorithms decide which block to remove to avoid future misses.

---

### The Three Algorithms (Write in Exam):

1.  **FIFO (First-In, First-Out)**:
    *   *Rule*: Removes the block that has been in cache the longest.
    *   *Implementation*: Simple queue (new at tail, remove from head).
    *   *Pros*: Simple; very low overhead.
    *   *Cons*: Slower hit rate; may remove active blocks.
    *   *Anomaly*: Can suffer from Belady's Anomaly (more cache size, more misses).
2.  **LRU (Least Recently Used)**:
    *   *Rule*: Removes the block not accessed for the longest time.
    *   *Rationale*: Exploits temporal locality.
    *   *Implementation*: Needs counter or stack updated on every access.
    *   *Pros*: Best hit rate in practice.
    *   *Cons*: Complex hardware; updates on every clock cycle.
3.  **LFU (Least Frequently Used)**:
    *   *Rule*: Removes the block with the lowest hit counter.
    *   *Implementation*: Uses access counters for each line.
    *   *Pros*: Retains popular blocks.
    *   *Cons*: Cache pollution; old popular blocks never get removed.

---

### Comparison Table:

| Feature | FIFO | LRU | LFU |
| :--- | :--- | :--- | :--- |
| **Decision basis** | Age in cache | Time since last hit | Total hit count |
| **Complexity** | Lowest | Highest | Moderate |
| **Belady's Anomaly?**| Yes | No | No |
| **Typical hit rate** | Average | High (Best) | Average |
| **Hardware Needs** | Simple pointer | Counter/Stack per line | Counter per line |

---
---

## Q10. Physical Components of a Hard Disk and Define Access Time, Seek Time, Rotational Delay (8 Marks)

---

### 1. Physical Components (Write in Exam):

*   **Platters**: Stacked circular magnetic disks storing data.
*   **Spindle**: Central rotating shaft (speeds: 5400/7200 RPM).
*   **R/W Heads**: Sensors that read/write data on surfaces.
*   **Actuator Arm**: Mechanical arm moving heads across tracks.
*   **Tracks**: Concentric circular recording paths.
*   **Sectors**: Track segments (smallest unit of transfer, e.g., 512B).
*   **Cylinders**: Matching tracks across all platters.

```
       Platter Layout                      Side View
    ┌────────────────┐                 ┌───────────────┐
   ╱                  ╲                │ Actuator Arm  │
  │     Tracks (O)     │               │  ┌──────────┐ │
  │    ┌──────────┐    │               │  ├─ R/W Head│ │──► Platter 0
  │    │Sector ▰  │    │               │  ├─ R/W Head│ │──► Platter 1
  │    │   (●)    │    │               └─┬───────────┘
  │    │ Spindle  │    │                 │
  └────┴──────────┴────┘              Spindle Motor
```

---

### 2. Time Parameters (Write in Exam):

Total time to read or write data is **Access Time**:

Total Access Time = Seek Time + Rotational Delay + Transfer Time

*   **Seek Time**:
    *   *Definition*: Time to move head to correct track.
    *   *Key detail*: Slowest part (mechanical movement, 3-15 ms).
*   **Rotational Delay**:
    *   *Definition*: Time for target sector to rotate under head.
    *   *Average*: Time for half a rotation.
        Average Rotational Delay = 1/2 x 60/RPM seconds
    *   *Example*: At 7200 RPM, average delay is:
        1/2 x (60 / 7200) = 4.17 ms
*   **Transfer Time**:
    *   *Definition*: Time to transfer actual data bits.
    *   *Formula*: Transfer Time = Data Size / Transfer Rate (very fast).
