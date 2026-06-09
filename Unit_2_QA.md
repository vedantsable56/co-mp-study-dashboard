# CO & MP: Unit II — Memory Management (Q&A)

---

## Q6. Explain the Difference Between Write-Through and Write-Back Policies (6 Marks)

*   **Problem**: When the CPU writes data, it modifies the cache. We must decide **when to update the main memory**.
*   The two policies are **Write-Through** and **Write-Back**.

---

### Write-Through Policy (Write in Exam):
*   **Action**: Cache and main memory are updated **simultaneously** on every write.
*   **Consistency**: Memory is always up-to-date (no stale data).
*   **Complexity**: Simple to build, no tracking bits needed.
*   **Drawbacks**: Slower because CPU must wait for slow main memory on every write. High bus traffic.

---

### Write-Back Policy (Write in Exam):
*   **Action**: Only the cache is updated. Main memory is updated **later**, only when the modified cache block is evicted.
*   **Tracking**: Uses a **Dirty Bit** (1 = modified, 0 = unmodified) in the cache line.
*   **Consistency**: Memory can hold stale data temporarily.
*   **Advantages**: Very fast (runs at cache speed). Low bus traffic since multiple writes to the same block only trigger one memory update.
*   **Drawbacks**: Complex to build. Requires cache coherence management.

---

### Comparison:

| Feature | Write-Through | Write-Back |
| :--- | :--- | :--- |
| **Memory Update** | Instant (on every write) | Delayed (only on eviction) |
| **Speed** | Slower | Faster (Cache speed) |
| **Bus Traffic** | High | Low |
| **Dirty Bit?** | Not needed | Required |
| **Data Safety** | High (no data lost on crash) | Lower (data in cache may be lost) |

---
---

## Q7. Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative (7 Marks)

*   **Cache Mapping**: The method used to determine where a memory block will sit inside the cache.

---

### The Three Mapping Methods (Write in Exam):

*   **Direct Mapping**:
    *   *Rule*: A memory block can go to **exactly one specific line** in the cache.
    *   *Formula*: Cache Line = (Memory Block) mod (Total Lines).
    *   *Pros*: Simplest hardware, fast lookup (only 1 comparator needed).
    *   *Cons*: High **conflict misses**. If two popular blocks map to the same line, they keep evicting each other (**thrashing**).
*   **Fully Associative Mapping**:
    *   *Rule*: A memory block can go to **any line** in the cache.
    *   *Pros*: No conflict misses.
    *   *Cons*: Complex, very expensive hardware. Requires parallel search of all lines using **Content Addressable Memory (CAM)**.
*   **Set-Associative Mapping**:
    *   *Rule*: Cache is split into **sets** of K lines (e.g., 2-way, 4-way). A memory block maps to a specific set, but can sit in **any of the K lines** in that set.
    *   *Pros*: Best compromise. Reduces conflict misses with reasonable hardware complexity.

---

### Address Formats:

```
  Direct Mapped:      [ TAG (Variable) ] [ LINE INDEX ] [ WORD OFFSET ]
  Fully Associative:  [ TAG (Large)                    ] [ WORD OFFSET ]
  Set-Associative:    [ TAG (Variable) ] [ SET INDEX  ] [ WORD OFFSET ]
```

---

### Comparison:

| Feature | Direct Mapping | Fully Associative | Set-Associative |
| :--- | :--- | :--- | :--- |
| **Block Location** | 1 fixed line | Any line | Any line in 1 set |
| **Conflict Misses** | Highest | Zero | Low |
| **Comparators** | 1 | N (Total lines) | K (Set size) |
| **Cost** | Lowest | Highest | Moderate |
| **Replacement Rule** | Not needed | Needed | Needed |

---
---

## Q8. Write a Note on RAID and Its Levels in Detail with Diagram (7 Marks)

*   **RAID**: Combines multiple physical hard disks into one logical drive to improve speed, data safety, or both.

---

### Core RAID Levels (Write in Exam):

*   **RAID 0 (Striping)**:
    *   *How it works*: Data blocks are split and written across all disks in parallel.
    *   *Pros*: Fastest read/write speed. 100% space efficiency (no storage wasted).
    *   *Cons*: No safety. **0 fault tolerance**. If 1 disk dies, all data is lost.
*   **RAID 1 (Mirroring)**:
    *   *How it works*: The exact same data is written to two or more disks.
    *   *Pros*: High safety. Can survive a disk failure.
    *   *Cons*: High cost. Only 50% space efficiency.
*   **RAID 5 (Distributed Parity)**:
    *   *How it works*: Data blocks are striped. Parity (error backup information) is calculated and rotated across all disks.
    *   *Pros*: Good speed, can survive **1 disk failure**. Wastes less space than RAID 1.
    *   *Cons*: Complex controller, slow writes due to parity recalculations.
*   **RAID 6 (Dual Distributed Parity)**:
    *   *How it works*: Like RAID 5, but calculates and stores two different parity blocks on all disks.
    *   *Pros*: Can survive **2 simultaneous disk failures**.

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
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

### Summary Table:

| Level | Key Feature | Fault Tolerance | Usable Space |
| :--- | :--- | :--- | :---: |
| **RAID 0** | Striping | 0 disk failures | 100\% |
| **RAID 1** | Mirroring | 1 disk failure | 50\% |
| **RAID 5** | Distributed Parity | 1 disk failure | (N-1)/N |
| **RAID 6** | Dual Parity | 2 disk failures | (N-2)/N |

---
---

## Q9. Describe LRU, FIFO, and LFU Replacement Algorithms (7 Marks)

*   **Problem**: When the cache is full and new data arrives, we must choose which old block to throw out (evict).
*   **Algorithms** are the rules used to pick the victim block.

---

### The Three Algorithms (Write in Exam):

1.  **FIFO (First-In, First-Out)**:
    *   *Rule*: Evicts the block that has been in the cache the **longest time** (the oldest).
    *   *Pros*: Simple, uses a queue structure, very low overhead.
    *   *Cons*: Poor hit rate; might throw out a heavily used block just because it was loaded early.
    *   *Anomalies*: Can suffer from **Belady's Anomaly** (adding cache lines increases misses).
2.  **LRU (Least Recently Used)**:
    *   *Rule*: Evicts the block that has **not been accessed for the longest time**.
    *   *Rationale*: Exploits **temporal locality** (recent access means likely future access).
    *   *Pros*: Best hit rates in practice; widely used in CPUs.
    *   *Cons*: Complex hardware. Needs counters or stacks updated on every clock cycle.
3.  **LFU (Least Frequently Used)**:
    *   *Rule*: Evicts the block with the **lowest hit count** (used the least number of times).
    *   *Pros*: Keeps popular blocks.
    *   *Cons*: **Cache Pollution**. Old blocks with high historical hits stay forever even if they are never accessed again.

---

### Comparison:

| Feature | FIFO | LRU | LFU |
| :--- | :--- | :--- | :--- |
| **Decision basis** | Age in cache | Time since last hit | Total hit count |
| **Complexity** | Lowest | Highest | Moderate |
| **Belady's Anomaly?**| Yes | No | No |
| **Typical hit rate** | Average | High (Best) | Average |

---
---

## Q10. Physical Components of a Hard Disk and Define Access Time, Seek Time, Rotational Delay (8 Marks)

---

### 1. Physical Components (Write in Exam):
*   **Platters**: Stacked circular magnetic disks that store the data.
*   **Spindle**: The central rotating shaft holding the platters.
*   **R/W Heads**: Sensors that read/write magnetic data on the platters.
*   **Actuator Arm**: Mechanical arm that moves the heads across the tracks.
*   **Tracks**: Concentric circular paths on the platter surface.
*   **Sectors**: Segments of a track. Smallest unit of data transfer (usually 512 bytes).
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

Total Access Time = Seek Time + Rotational Delay + Transfer Time

*   **Seek Time**:
    *   *Definition*: Time taken for the actuator arm to move the head to the correct track.
    *   *Key detail*: Slowest part of the process (3–15 ms).
*   **Rotational Delay (Latency)**:
    *   *Definition*: Time taken for the target sector to rotate under the R/W head.
    *   *Average*: Time for half a rotation.
        \text{Average Latational Delay} = 1/2 x \frac{60}{\text{RPM}}\text{ seconds}
    *   *Example*: At 7200 RPM, it is ≈ 4.17 ms.
*   **Transfer Time**:
    *   *Definition*: Time taken to read/write the actual data once the sector is aligned.
    *   *Key detail*: Extremely fast (microseconds).
