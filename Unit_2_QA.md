# CO & MP: Unit II — Memory Management (Q&A)

---

## Q6. Explain the Difference Between Write-Through and Write-Back Policies (6 Marks)

*   **The Cache Consistency Problem**: Because the cache is a fast, temporary copy of the main memory, any write or update command from the CPU must be handled carefully. If the CPU updates only the cache, the main memory will contain old (stale) data. We must choose **when to update the slower main memory** to keep data consistent.
*   The two primary cache update policies are **Write-Through** and **Write-Back**.

---

### Write-Through Policy (Write in Exam):

*   **Operation**: Every time the CPU performs a write operation, the data is **instantly written to both the cache and the main memory** at the same time.
*   **Write Buffer**: Since writing to main memory is slow, a hardware queue called a **Write Buffer** is used. The CPU writes to the cache and the write buffer, and then immediately continues execution. The memory controller empties the write buffer into RAM in the background. If the write buffer becomes full, the CPU must stall.
*   **Data Consistency**: Excellent. Cache and main memory are always identical (no stale data).
*   **Design Complexity**: Very simple. No complex tracking bits or states are required.
*   **Performance Penalty**: Slower. If the CPU performs consecutive writes, the write buffer fills up, and the CPU must wait for the slow main memory bus to clear.
*   **Bus Traffic**: Very high. Every single write operation generates traffic on the system bus.
*   **Data Safety**: High. If the system crashes or loses power, no data is lost since memory is already updated.
*   **Coherence**: Highly useful in multi-processor systems because other processors can see the updated data in main memory immediately.

---

### Write-Back Policy (Write in Exam):

*   **Operation**: The CPU updates **only the cache line**. Main memory is **not** updated immediately. The main memory is updated later, only when that modified cache block is evicted (replaced by new data).
*   **Bookkeeping (Dirty Bit)**: To track which lines have been modified, each cache line has a status flag called the **Dirty Bit** (or Modified Bit):
    *   *Dirty Bit = 1*: The cache block was modified by the CPU. It must be written back to RAM when evicted.
    *   *Dirty Bit = 0*: Unmodified block (identical to RAM). It can be simply overwritten (no write-back needed).
*   **Data Consistency**: Temporary inconsistency (RAM holds old/stale data while cache holds the correct data).
*   **Performance Advantage**: Extremely fast. Writes execute at cache speed (no CPU write stalls).
*   **Bus Traffic**: Very low. Multiple writes to the same cache block only trigger one memory bus transfer upon eviction.
*   **Design Complexity**: High. Requires extra tracking bits, control logic, and cache coherence protocols (like MESI) in multi-processor environments.

---

### Comparison Table:

| Feature | Write-Through | Write-Back |
| :--- | :--- | :--- |
| **Memory Update** | Instant (on every write) | Delayed (only on eviction) |
| **Write Speed** | Slower (runs at memory speed) | Faster (runs at cache speed) |
| **System Bus Traffic** | High | Low |
| **Dirty Bit?** | Not required | Required (tracks modified lines) |
| **Implementation** | Simple | Complex |
| **Crash Protection** | High (no data lost) | Lower (cached updates lost on crash) |

---
---

## Q7. Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative (7 Marks)

*   **Cache Mapping**: The set of rules that defines where a main memory block can sit inside the smaller cache memory.
*   The three mapping methods are **Direct**, **Fully Associative**, and **Set-Associative**.

---

### The Three Mapping Methods (Write in Exam):

*   **Direct Mapping**:
    *   *Rule*: Each memory block maps to **exactly one specific cache line**.
    *   *Formula*: Cache Line = (Memory Block) mod (Total Lines in Cache).
    *   *Address Division*: The physical address is divided into three fields:
        *   *Tag*: Identifies which memory block is currently in that line.
        *   *Line Index*: Identifies the specific cache line.
        *   *Word Offset*: Identifies the specific byte or word within the block.
    *   *Lookup*: CPU checks only one specific line using the Line Index. If the Tag matches, it's a hit.
    *   *Pros*: Simple hardware, fast lookup (requires only 1 tag comparator).
    *   *Cons*: High **conflict misses**. If two popular blocks map to the same line, they keep evicting each other (**thrashing**), reducing the hit rate.
*   **Fully Associative Mapping**:
    *   *Rule*: A memory block can be placed in **any line** in the cache.
    *   *Address Division*: The physical address is divided into two fields:
        *   *Tag*: Identifies the memory block (very large).
        *   *Word Offset*: Identifies the byte within the block.
    *   *Lookup*: CPU must search all cache tags in parallel to find a match.
    *   *Pros*: No conflict misses. A block is only evicted when the cache is completely full.
    *   *Cons*: Very expensive hardware. Requires **Content Addressable Memory (CAM)** to perform parallel searches across all lines (requires N tag comparators).
*   **Set-Associative Mapping**:
    *   *Rule*: Cache is divided into **sets** of K lines (e.g., 2-way, 4-way). A memory block maps to a specific set, but can sit in **any of the K lines** in that set.
    *   *Address Division*: The physical address is divided into three fields:
        *   *Tag*: Identifies the block.
        *   *Set Index*: Identifies the specific set.
        *   *Word Offset*: Identifies the byte within the block.
    *   *Lookup*: CPU finds the set via the Set Index, then searches the K lines in parallel (requires K comparators).
    *   *Pros*: Best compromise. Reduces conflict misses with reasonable hardware cost.

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
| **Block Location** | 1 fixed line | Any line in cache | Any line in a specific set |
| **Conflict Misses** | Highest | Zero | Low |
| **Tag Comparators** | 1 | N (Total lines) | K (Set size) |
| **Hardware Cost** | Lowest | Highest (CAM needed) | Moderate |
| **Replacement Rule** | Not needed | Needed (LRU, FIFO) | Needed (LRU, FIFO) |
| **Common Use** | L1 cache (simple designs) | Translation Buffers (TLBs) | L1, L2, L3 in modern CPUs |

---
---

## Q8. Write a Note on RAID and Its Levels in Detail with Diagram (7 Marks)

*   **RAID**: Redundant Array of Independent Disks. It combines multiple physical hard disks into one logical drive to improve speed, data safety (redundancy), or both.

---

### Core RAID Levels (Write in Exam):

*   **RAID 0 (Striping)**:
    *   *Mechanism*: Data blocks are split and written across all disks in parallel.
    *   *Pros*: Fastest read/write speeds. 100% space efficiency (no storage wasted).
    *   *Cons*: **No fault tolerance**. If one disk fails, the whole array is destroyed.
    *   *Min. Disks*: 2
*   **RAID 1 (Mirroring)**:
    *   *Mechanism*: The exact same data is duplicated on two or more disks.
    *   *Pros*: High safety. Can survive a disk failure.
    *   *Cons*: High cost. Only 50% space efficiency (half the space is used for backups).
    *   *Min. Disks*: 2
*   **RAID 5 (Distributed Parity)**:
    *   *Mechanism*: Data blocks are striped. Parity (error backup info) is calculated and distributed across all disks in a rotating pattern.
    *   *Pros*: Good balance of speed and safety. Can survive **1 disk failure**. Less wasteful than RAID 1.
    *   *Cons*: Slow writes (parity must be calculated and written for every block).
    *   *Min. Disks*: 3
*   **RAID 6 (Dual Distributed Parity)**:
    *   *Mechanism*: Like RAID 5, but calculates and stores two different parity blocks on all disks.
    *   *Pros*: High safety. Can survive **2 simultaneous disk failures**.
    *   *Cons*: Slowest write speed due to double parity calculations.
    *   *Min. Disks*: 4

---

### Other RAID Levels (Briefly Mention in Exam):
*   **RAID 2**: Bit-level striping with Hamming code error correcting code (ECC) stored on dedicated parity disks. (Obsolete, complex).
*   **RAID 3**: Byte-level striping with a single dedicated parity disk. (Good for large sequential files).
*   **RAID 4**: Block-level striping with a single dedicated parity disk. (Creates write bottleneck on the parity disk).

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

*   **The Cache Replacement Problem**: When the cache is full and new data must be loaded, we must choose which old block to throw out (evict).
*   **Algorithms** are the rules used to pick the victim block to minimize future misses.

---

### The Three Algorithms (Write in Exam):

1.  **FIFO (First-In, First-Out)**:
    *   *Rule*: Evicts the block that has been in the cache the **longest time** (the oldest), regardless of how often it is used.
    *   *Implementation*: Uses a queue where new blocks are added to the tail and old blocks are evicted from the head.
    *   *Pros*: Simple to build, very low overhead.
    *   *Cons*: Poor hit rate; might throw out a heavily used block just because it was loaded early.
    *   *Anomalies*: Can suffer from **Belady's Anomaly** (where increasing cache size causes more cache misses).
2.  **LRU (Least Recently Used)**:
    *   *Rule*: Evicts the block that has **not been accessed for the longest time**.
    *   *Rationale*: Exploits **temporal locality** (recent access means likely future access).
    *   *Implementation*: Needs a hardware counter or stack that updates on every single cache access.
    *   *Pros*: High hit rates in practice; widely used in CPUs.
    *   *Cons*: Complex hardware. Needs counters or stacks updated on every clock cycle, causing overhead.
3.  **LFU (Least Frequently Used)**:
    *   *Rule*: Evicts the block with the **lowest hit count** (used the least number of times).
    *   *Implementation*: Each cache line has a frequency counter that increments on every hit.
    *   *Pros*: Keeps popular blocks.
    *   *Cons*: **Cache Pollution**. Old blocks with high historical hits stay forever even if they are never accessed again.

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

*   **Platters**: Stacked circular magnetic disks that store the data. Both sides of the platters are coated with magnetic material.
*   **Spindle**: The central rotating shaft holding the platters. It rotates at constant speeds (common speeds are 5400/7200 RPM).
*   **R/W Heads**: Electromagnetic sensors that read or write magnetic data on the platters. There is one head per platter surface.
*   **Actuator Arm**: Mechanical arm that moves the R/W heads across the platter tracks in unison.
*   **Tracks**: Concentric circular paths on the platter surface where data is recorded.
*   **Sectors**: Segments of a track. Smallest addressable unit of data transfer (usually 512 bytes or 4KB).
*   **Cylinders**: Set of matching tracks across all platters.

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

The total time to read or write data to a disk is called **Access Time**:

Total Access Time = Seek Time + Rotational Delay + Transfer Time

*   **Seek Time**:
    *   *Definition*: Time taken for the actuator arm to move the read/write head to the correct track.
    *   *Key detail*: Slowest part of the process because it involves mechanical movement (3–15 ms).
*   **Rotational Delay (Latency)**:
    *   *Definition*: Time taken for the target sector to rotate under the R/W head.
    *   *Average*: Time for half a rotation.
        Average Rotational Delay = 1/2 x 60/RPM seconds
    *   *Example*: At 7200 RPM, average delay is:
        1/2 x (60 / 7200) = 4.17 ms
*   **Transfer Time**:
    *   *Definition*: Time taken to read or write the actual data once the sector is aligned.
    *   *Formula*: Transfer Time = Data Size / Transfer Rate.
    *   *Key detail*: Extremely fast (microseconds).
