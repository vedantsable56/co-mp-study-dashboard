# CO & MP: Unit II — Memory Management (Q&A)

---

## Q6. Explain the Difference Between Write-Through and Write-Back Policies (6 Marks)

### Introduction:
*   Write-through cache writes data to cache and main memory at the same time.
*   Write-back cache writes data to cache first and updates memory later.

### Comparison Table:

| Comparison Point | Write-Through | Write-Back |
| :--- | :--- | :--- |
| **1. Memory Update** | Simultaneous | Delayed |
| **2. Write Speed** | Slower | Faster |
| **3. Bus Traffic** | Higher | Lower |
| **4. RAM Consistency** | Matches cache | May differ |
| **5. Dirty Bit** | Not required | Required |
| **6. Design Cost** | Lower | Higher |
| **7. Risk of Data Loss** | Lower | Higher |
| **8. Write Buffer** | Required | Not required |

---
---

## Q7. Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative (7 Marks)

### Introduction:
*   Direct mapping maps each memory block to a single cache line.
*   Associative mapping maps a memory block to any cache line.
*   Set-associative mapping maps a block to a specific set of cache lines.

### Comparison Table:

| Comparison Point | Direct Mapping | Fully Associative | Set-Associative |
| :--- | :--- | :--- | :--- |
| **1. Block Placement** | Fixed line | Any line | Any set line |
| **2. Address Fields** | Tag, Line, Offset | Tag, Offset | Tag, Set, Offset |
| **3. Tag Comparators** | One | All | Limited |
| **4. Conflict Misses** | Highest | Lowest | Moderate |
| **5. Access Speed** | Fastest | Slower | Moderate |
| **6. Design Cost** | Lowest | Highest | Moderate |
| **7. Replacement Policy** | Not needed | Required | Required |
| **8. Design Complexity** | Simple | Complex | Moderate |

---
---

## Q8. Write a Note on RAID and Its Levels in Detail with Diagram (7 Marks)

### Introduction / Definition:
*   RAID combines multiple physical hard drives into a single logical unit.
*   It distributes data across drives to achieve redundancy and speed.
*   This setup protects data against individual drive failures.

### Diagram:
```
  ┌──────────────────────────────────┐
  │         RAID Controller          │
  └──────┬────────────┬────────────┬─┘
         ▼            ▼            ▼
    ┌─────────┐  ┌─────────┐  ┌─────────┐
    │ Disk 0  │  │ Disk 1  │  │ Disk 2  │
    └─────────┘  └─────────┘  └─────────┘
```

### Key Points / Core Theory:
*   **RAID zero** stripes data blocks across drives for maximum speed.
*   **RAID one** mirrors identical data to secondary backup storage drives.
*   **RAID five** uses distributed parity blocks to survive disk failures.
*   **RAID six** writes dual parity blocks to survive two failures.

### Simple Real-World Example:
*   A business owner keeps copies of tax records in two safes.
*   If one safe burns down, the backup records are safe.

### Advantages / Applications:
*   Protects critical data from single hard drive hardware failures.
*   Increases read and write speeds using multi-channel transfers.
*   Combines multiple small physical disks into one large volume.

### Conclusion:
*   RAID provides data safety and storage speed in computer systems.
*   It is widely used in enterprise server database setups.

---
---

## Q9. Describe LRU, FIFO, and LFU Replacement Algorithms (7 Marks)

### Introduction:
*   FIFO removes the block that entered the cache first.
*   LRU removes the block that was not accessed for the longest time.
*   LFU removes the block with the lowest total hit count.

### Comparison Table:

| Comparison Point | FIFO | LRU | LFU |
| :--- | :--- | :--- | :--- |
| **1. Removal Rule** | Oldest block | Least recently used | Lowest frequency |
| **2. Hardware Overhead** | Lowest | Highest | Moderate |
| **3. Belady's Anomaly** | Possible | None | None |
| **4. Hit Rate** | Average | Highest | Average |
| **5. Tracking Needs** | Load time | Access time | Access frequency |
| **6. Implementation** | Simple queue | Complex stack | Counter registers |
| **7. Cache Pollution** | Possible | None | High risk |
| **8. Main Focus** | Entry age | Recency | Popularity |

---
---

## Q10. Physical Components of a Hard Disk and Define Access Time, Seek Time, Rotational Delay (8 Marks)

### Introduction / Definition:
*   Hard disk drives store data on spinning magnetic platters.
*   Read and write heads move across tracks to access sectors.
*   Access time measures the delay before data transfer begins.

### Diagram:
```
     ┌──────────────┐
     │ Actuator Arm │
     └──────┬───────┘
            ▼
    ○─────[Head]   (Spindle Motor Center)
  Platter Surface
```

### Key Points / Core Theory:
*   **Seek time** is the delay to move actuator arms.
*   **Rotational delay** is the time for sectors to spin.
*   **Transfer time** is the duration of actual data movement.
*   **Tracks** are concentric circular paths on the platter surface.
*   **Sectors** are the smallest unit of disk storage space.

### Simple Real-World Example:
*   A record player arm moves to a specific music track.
*   The listener waits for the song to rotate under needles.

### Advantages / Applications:
*   Provides high capacity storage at very low hardware cost.
*   Retains data when power is completely turned off.
*   Used for long term system backup and data archiving.

### Conclusion:
*   Magnetic hard drives offer cheap storage for large system files.
*   Their mechanical nature makes them slower than solid state drives.
