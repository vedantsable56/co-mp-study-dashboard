# CO & MP: Unit II — Memory Management (Q&A)

---

## Q6. Explain the Difference Between Write-Through and Write-Back Policies (6 Marks)

*   **The Cache Consistency Problem**:
    *   Cache is a fast, temporary copy of main memory.
    *   Writes from CPU must keep memory updated.
    *   If only cache updates, main memory gets old (stale) data.
    *   We must decide when to update main memory.

---

### Write-Through Policy (Write in Exam):

*   **Operation**:
    *   CPU writes data to both cache and RAM.
    *   This happens at the same time.
*   **Write Buffer**:
    *   Writing to memory is slow.
    *   CPU writes to a queue called a Write Buffer.
    *   CPU immediately continues execution.
    *   Controller writes buffer data to RAM in background.
    *   If buffer is full, CPU must wait.
*   **Data Consistency**:
    *   Excellent safety.
    *   Cache and memory are always matching.
*   **Design Complexity**:
    *   Very simple.
    *   No complex tracking states are needed.
*   **Performance Penalty**:
    *   Slower.
    *   Consecutive writes cause buffer to fill up.
*   **Bus Traffic**:
    *   Very high.
    *   Every write uses the system bus.
*   **Data Safety**:
    *   High.
    *   No data is lost on sudden crashes.
*   **Data Consistency in Multi-Processor**:
    *   Very easy.
    *   Other CPUs see memory updates immediately.

---

### Write-Back Policy (Write in Exam):

*   **Operation**:
    *   CPU updates only the cache line.
    *   RAM is not updated immediately.
    *   RAM updates only when the block is removed.
*   **Dirty Bit (Bookkeeping)**:
    *   Each cache line has a status flag.
    *   *Dirty Bit = 1*: Cache was changed; write to RAM on removal.
    *   *Dirty Bit = 0*: Cache matches RAM; discard on removal.
*   **Data Consistency**:
    *   Temporary mismatch.
    *   Memory holds old data until block removal.
*   **Performance Advantage**:
    *   Extremely fast.
    *   Writes run at cache speed.
*   **Bus Traffic**:
    *   Very low.
    *   Multiple writes to same block trigger only one RAM write.
*   **Design Complexity**:
    *   High.
    *   Requires extra tracking bits.
    *   Requires consistency protocols (like MESI) for multiple CPUs.

---

### Comparison Table:

| Feature | Write-Through | Write-Back |
| :--- | :--- | :--- |
| **Memory Update** | Instant (on write) | Delayed (on removal) |
| **Write Speed** | Slower | Faster |
| **System Bus Traffic** | High | Low |
| **Dirty Bit?** | Not required | Required (tracks changes) |
| **Implementation** | Simple | Complex |
| **Crash Protection** | High (no data lost) | Lower (unsaved cache data lost) |

---
---

## Q7. Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative (7 Marks)

*   **Cache Mapping**:
    *   Rules to place RAM blocks in smaller cache.
    *   Defines the index search method.

---

### The Three Mapping Methods (Write in Exam):

*   **Direct Mapping**:
    *   *Rule*: Each memory block maps to exactly one cache line.
    *   *Formula*: Cache Line = (Memory Block) mod (Total Lines in Cache).
    *   *Address fields*: Tag, Line Index, Word Offset.
    *   *Lookup*: CPU checks one specific line index.
    *   *Pros*: Simple hardware; only 1 tag comparator needed.
    *   *Cons*: High conflict misses; causes constant swapping.
*   **Fully Associative Mapping**:
    *   *Rule*: A memory block can sit in any cache line.
    *   *Address fields*: Tag, Word Offset.
    *   *Lookup*: CPU searches all tags in parallel.
    *   *Pros*: No conflict misses.
    *   *Pros*: Block only removed when cache is full.
    *   *Cons*: Expensive; requires content-search memory (CAM).
    *   *Cons*: Needs N tag comparators (one for each line).
*   **Set-Associative Mapping**:
    *   *Rule*: Cache is divided into sets of K lines.
    *   *Rule*: Block maps to set, sits in any line within set.
    *   *Address fields*: Tag, Set Index, Word Offset.
    *   *Lookup*: CPU checks set index, searches K lines in parallel.
    *   *Pros*: Best compromise; reduces misses with fair cost.

---

### Address Formats:

```
  Direct Mapped:      [ TAG (Variable) ] [ LINE INDEX ] [ WORD OFFSET ]
  Fully Associative:  [ TAG (Large)                    ] [ WORD OFFSET ]
  Set-Associative:    [ TAG (Variable) ] [ SET INDEX  ] [ WORD OFFSET ]
```

---

### Comparison Table:

| Feature | Direct Mapping | Fully Associative | Set-Associative (K-way) |
| :--- | :--- | :--- | :--- |
| **Block Location** | 1 fixed line | Any line | Any line in a set |
| **Conflict Misses** | Highest | Zero | Low |
| **Tag Comparators** | 1 | N (Total lines) | K (Set size) |
| **Hardware Cost** | Lowest | Highest (needs CAM) | Moderate |
| **Replacement Rule** | Not needed | Needed (LRU, FIFO) | Needed (LRU, FIFO) |
| **Common Use** | L1 cache | Translation Buffers (TLBs)| L1, L2, L3 in modern CPUs |

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
