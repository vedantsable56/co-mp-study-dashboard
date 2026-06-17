# CO & MP: Unit II — Memory Management (Q&A)

---

## Q6. Explain the Difference Between Write-Through and Write-Back Policies (6 Marks)

| Comparison Parameter | Write-Through Policy | Write-Back Policy |
| :--- | :--- | :--- |
| **1. Memory Update** | Cache and main memory updated simultaneously. | Main memory updated only when block is evicted. |
| **2. Write Performance** | Slower due to slower main memory write cycles. | Faster since write runs at cache speed. |
| **3. Bus Traffic** | High bus traffic on every write operation. | Low bus traffic (only active on block eviction). |
| **4. Hardware Complexity** | Simple design with no dirty bits needed. | Complex design requiring dirty bits and controllers. |
| **5. Consistency** | Strict consistency; RAM always matches cache. | Temporarily inconsistent; RAM may hold stale data. |
| **6. Write Buffer** | Requires write buffer to prevent CPU stalls. | Does not require write buffer for standard writes. |
| **7. Directory Tag** | No dirty bit tag overhead in cache directory. | Requires one dirty bit overhead per cache line. |
| **8. Reliability** | High reliability; power loss does not lose data. | Lower reliability; dirty data in cache is lost. |
| **9. Multi-core Setup** | Simple cache consistency over shared bus. | Complex consistency protocol (MESI) required. |

---
---

## Q7. Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative (7 Marks)

| Comparison Parameter | Direct Mapping | Fully Associative | Set-Associative |
| :--- | :--- | :--- | :--- |
| **1. Placement Rule** | Mapped to one fixed cache line. | Mapped to any cache line. | Mapped to any line in a specific set. |
| **2. Address Fields** | Tag, Line Index, Word Offset. | Tag, Word Offset only. | Tag, Set Index, Word Offset. |
| **3. Tag Comparators** | Single comparator used. | Total cache lines comparators. | Set size comparators. |
| **4. Conflict Misses** | Highest conflict miss rate. | Lowest conflict miss rate. | Moderate conflict miss rate. |
| **5. Access Hit Time** | Fastest access speed. | Slower access speed. | Moderate access speed. |
| **6. Hardware Cost** | Lowest hardware cost. | Highest hardware cost. | Moderate hardware cost. |
| **7. Replacement** | Not needed (overwrites line). | Required (LRU, FIFO). | Required (LRU, FIFO). |
| **8. Space Use** | Poor space utilization. | Maximum space utilization. | Good space utilization. |

---
---

## Q8. Write a Note on RAID and Its Levels in Detail with Diagram (7 Marks)

### Definition
RAID (Redundant Array of Independent Disks) combines multiple physical drives into one logical unit to achieve data safety, speed, or both.

### Diagram
```
              ┌──────────────────────────────────┐
              │         RAID Controller          │
              └──────┬────────────┬────────────┬─┘
                     ▼            ▼            ▼
                ┌─────────┐  ┌─────────┐  ┌─────────┐
                │ Disk 0  │  │ Disk 1  │  │ Disk 2  │
                └─────────┘  └─────────┘  └─────────┘
```

### RAID 0 and RAID 1
*   **RAID 0 (Data Striping)**: Splits data blocks across drives for speed; lacks redundancy and has zero fault tolerance.
*   **RAID 1 (Data Mirroring)**: Duplicates identical data to two or more backup disks, providing high fault tolerance.

### RAID 5 and RAID 6
*   **RAID 5 (Distributed Parity)**: Stripes data blocks and parity across three or more drives, surviving one drive failure.
*   **RAID 6 (Dual Parity)**: Uses dual parity blocks distributed across at least four drives, surviving two failures.

### RAID 2, 3, and 4
*   **RAID 2**: Stripes data at bit level and uses Hamming code ECC for error correction.
*   **RAID 3**: Stripes data at byte level and uses a single dedicated parity disk.
*   **RAID 4**: Stripes data at block level and uses a single dedicated parity disk.

### Advantages
*   **Data Redundancy**: Prevents data loss during hard drive failures.
*   **Higher speed**: Accesses multiple drives in parallel to increase transfer rates.
*   **Capacity Aggregation**: Merges multiple physical disks into one large logical volume.

---
---

## Q9. Describe LRU, FIFO, and LFU Replacement Algorithms (7 Marks)

### Definition
Cache replacement algorithms select which block to evict from the cache to make room for new blocks when the cache is full.

### Diagram
```
  FIFO (Queue):     [New Block] ──► [ Tail ] ──► [ Head ] ──► [ Evict ]
  LRU (Stack):      [Most Recent] ─────────────────► [Least Recent (Evict)]
  LFU (Counters):   [Freq: 10] , [Freq: 8] , [Freq: 2 (Evicted Block)]
```

### FIFO Page Replacement
*   **Logic**: Evicts the oldest block that has been in the cache the longest.
*   **Implementation**: Uses a simple queue where new blocks enter the tail and evicts occur at the head.
*   **Limitation**: Can suffer from Belady's anomaly where increasing cache size increases misses.

### LRU Page Replacement
*   **Logic**: Evicts the block that has not been accessed for the longest time.
*   **Implementation**: Relies on temporal locality and updates timestamps or stack positions on every hit.
*   **Performance**: High hit rate but requires hardware overhead to update status.

### LFU Page Replacement
*   **Logic**: Evicts the block with the lowest total access frequency.
*   **Implementation**: Maintains counter registers for each cache line.
*   **Limitation**: Old popular blocks accumulate high counts and cause cache pollution.

### Features
*   **Cache Tuning**: Choosing the correct algorithm optimizes the CPU cache hit rate.
*   **Hardware Overhead**: FIFO has the lowest overhead, while LRU and LFU require extra storage bits.

---
---

## Q10. Physical Components of a Hard Disk and Define Access Time, Seek Time, Rotational Delay (8 Marks)

### Definition
A magnetic Hard Disk Drive stores binary data on rotating platters coated with a magnetic material using electromagnetic read/write heads.

### Diagram
```
     Platter Layout                  Side View
  ┌────────────────┐             ┌───────────────┐
 ╱                  ╲            │ Actuator Arm  │
│     Tracks (O)     │           │  ┌──────────┐ │
│    ┌──────────┐    │           │  ├─ R/W Head│ │──► Platter 0
│    │Sector ▰  │    │           └─┬───────────┘
│    └──────────┘    │             │
└────────────────────┘           Spindle Motor
```

### Components
*   **Magnetic Platters** : Circular disks coated with a magnetic material to store binary data.
*   **Spindle Motor** : Rotates the platters at a constant speed (e.g., 7200 RPM).
*   **Read/Write Heads** : Electromagnetic sensors that float above platter surfaces to access data.
*   **Actuator Arm** : Moves the heads radially across platters to position them over tracks.
*   **Tracks and Sectors** : Platters are divided into concentric circular tracks and radial sectors.

### Working
*   The actuator arm positions the head over the correct track, introducing **Seek Time**.
*   The platter rotates to align the target sector under the head, introducing **Rotational Delay**.
*   Data bits are read or written to the sector, introducing **Transfer Time**.
*   Total access time is the sum: T_{access} = T_{seek} + T_{rotational} + T_{transfer}.
