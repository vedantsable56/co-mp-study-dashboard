const co_mp_data = {
  "subjectId": "co_mp",
  "subjectName": "Computer Organization and Microprocessor",
  "units": [
    {
      "unitNum": 1,
      "unitTitle": "Computer Evolution and Performance",
      "questions": [
        {
          "id": "co_mp_q1",
          "number": 1,
          "question": "Difference between Von Neumann and Harvard Architecture",
          "marks": 7,
          "answer": "| Comparison Parameter | Von Neumann Architecture | Harvard Architecture |\n| :--- | :--- | :--- |\n| **1. Memory Space** | Unified memory for data and instructions. | Separate memory blocks for data and instructions. |\n| **2. Bus Configuration** | Shared system bus for data and code access. | Independent buses for data and code. |\n| **3. Execution Speed** | Slower due to bus bottlenecks (serializing access). | Faster due to parallel code and data fetches. |\n| **4. Pipelining** | Difficult to implement due to bus conflicts. | Simple and highly efficient pipelining support. |\n| **5. Hardware Complexity**| Simple CPU design with lower pin count. | Complex CPU design with double the bus pins. |\n| **6. System Cost** | Lower cost due to single memory block. | Higher cost due to dual memory and buses. |\n| **7. Security** | Lower as data can overwrite code. | Higher as code space is write-protected. |\n| **8. Memory Use** | Efficient as unused space is shared. | Rigid as program space cannot hold data. |\n| **9. Typical Device** | General-purpose desktops and laptops. | High-speed DSPs and microcontrollers. |"
        },
        {
          "id": "co_mp_q2",
          "number": 2,
          "question": "Draw and Explain the Hardware Implementation of Booth's Algorithm",
          "marks": 6,
          "answer": "### Definition\n Booth's hardware performs signed binary multiplication directly on two's complement numbers using registers, shift control logic, and an adder-subtractor unit.\n\n### Diagram\n```\n            ┌─────────┐  ┌──────────────┐\n            │Register │  │  n-Bit ALU   │\n            │   M     │─►│ (Add / Sub)  │\n            └─────────┘  └──────┬───────┘\n                                ▼\n                   ┌──────────────────┐   ┌─────────┐   ┌───────┐\n                   │   Register A     │──►│Register │──►│Flip-  │\n                   │  (Accumulator)   │   │  Q      │   │Flop   │\n                   └──────────────────┘   └─────────┘   └───────┘\n```\n\n### Components\n*   **Register M** : Stores the n-bit multiplicand value throughout the multiplication.\n*   **Register Q** : Stores the multiplier and performs right shifts during execution.\n*   **Register A** : Holds partial product bits and serves as the accumulator.\n*   **Flip-Flop Q_-1** : Stores the single bit shifted out from Q_0 to check transitions.\n*   **n-Bit ALU** : Performs addition or subtraction on Registers A and M.\n*   **Sequence Counter (SC)** : Tracks the number of arithmetic cycles remaining.\n\n### Working\n*   Initialize A = 0000, Q_-1 = 0, and load multiplicand into M and multiplier into Q.\n*   Inspect the least significant multiplier bit Q_0 and Flip-Flop Q_-1.\n*   Subtract M from A (A ← A - M) for bit state 10, or add M (A ← A + M) for 01.\n*   Do no arithmetic operation for states 00 or 11.\n*   Perform an Arithmetic Shift Right (ASHR) on combined [A, Q, Q_-1] and decrement SC.\n*   Stop the execution cycle when the counter (SC) reaches zero."
        },
        {
          "id": "co_mp_q3",
          "number": 3,
          "question": "Discuss the Limitation of a Ripple Carry Adder and Explain How a Carry Look-Ahead (CLA) Adder Improves Speed",
          "marks": 7,
          "answer": "### Definition\nA Ripple Carry Adder adds binary numbers using serial full adders, whereas a Carry Look-Ahead Adder computes all carry bits in parallel to eliminate sequential delay.\n\n### Diagram\n```\n  FA0 ──C1──► FA1 ──C2──► FA2 ──C3──► FA3 ──C4 (Ripple Carry Adder)\n  \n  [ Parallel Carry Logic Block ] ── C1, C2, C3, C4 (Carry Look-Ahead)\n```\n\n### Ripple Carry Adder Limitations\n*   **Propagation Delay**: The carry bit must propagate sequentially through every stage from LSB to MSB.\n*   **Linear Delay complexity**: The total delay increases linearly (O(n)) with the number of adder bits.\n*   **Speed Bottleneck**: Restricts the maximum clock frequency in large processing units.\n\n### Carry Look-Ahead Speed Improvement\n*   **Intermediate Signals**: Defines Carry Generate (G_i = A_i · B_i) and Propagate (P_i = A_i ⊕ B_i).\n*   **Carry Calculations**: Calculates all carries in parallel using Boolean expressions.\n*   *Carry Equations*:\n    *   C_1 = G_0 + P_0 · C_0\n    *   C_2 = G_1 + P_1 · G_0 + P_1 · P_0 · C_0\n    *   C_3 = G_2 + P_2 · G_1 + P_2 · P_1 · G_0 + P_2 · P_1 · P_0 · C_0\n*   **Constant Delay**: Reduces carry computation delay to a constant O(1) time."
        },
        {
          "id": "co_mp_q4",
          "number": 4,
          "question": "Multiply Using Booth's Algorithm: Multiplicand = +3, Multiplier = -4",
          "marks": 8,
          "answer": "### Definition\nSigned multiplication algorithm that operates directly on two's complement binary numbers using add, subtract, and shift steps.\n\n### Steps\n*   Load multiplicand (+3 = `0011`) into M, multiplier (-4 = `1100`) into Q.\n*   Clear A = `0000`, Q_-1 = `0`, and set SC = `4`.\n*   Check bits [Q_0, Q_-1] in each step to choose the operation.\n*   Perform A ← A - M (A + `1101`) for `10` or A ← A + M for `01`.\n*   Apply Arithmetic Shift Right (ASHR) on [A, Q, Q_-1] and decrement SC.\n*   Repeat until SC = 0, final output is stored in [A, Q].\n\n### Trace Table\n- Multiplicand (M) = `0011`, -M = `1101`, Multiplier (Q) = `1100`.\n\n| Cycle | Accumulator (A) | Multiplier (Q) | Q_-1 | Q_0, Q_-1 | Performed Operation | SC |\n| :--- | :---: | :---: | :---: | :---: | :--- | :---: |\n| **Init** | 0000 | 1100 | 0 | - | Clear A, Q_-1 and load registers | 4 |\n| **C1** | 0000 | 1100 | 0 | `00` | No arithmetic; perform ASHR | 4 |\n| **Shift** | 0000 | 0110 | 0 | - | ASHR [A, Q, Q_-1] | 3 |\n| **C2** | 0000 | 0110 | 0 | `00` | No arithmetic; perform ASHR | 3 |\n| **Shift** | 0000 | 0011 | 0 | - | ASHR [A, Q, Q_-1] | 2 |\n| **C3** | 1101 | 0011 | 0 | `10` | Subtract M: A ← A + (-M) | 2 |\n| **Shift** | 1110 | 1001 | 1 | - | ASHR [A, Q, Q_-1] | 1 |\n| **C4** | 1110 | 1001 | 1 | `11` | No arithmetic; perform ASHR | 1 |\n| **Shift** | 1111 | 0100 | 1 | - | ASHR [A, Q, Q_-1] | 0 |\n\nFinal product in [A, Q] is `11110100` (equal to decimal -12)."
        },
        {
          "id": "co_mp_q5",
          "number": 5,
          "question": "Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus",
          "marks": 7,
          "answer": "### Definition\nA system bus is a set of parallel physical wires that acts as a shared pathway to connect the CPU, memory, and peripheral devices.\n\n### Diagram\n```\n   ┌───────────┐         ┌──────────┐\n   │    CPU    │◄═══════►│  Memory  │\n   └─────┬─────┘         └────┬─────┘\n  ═══════╧════════════════════╧══════ System Bus (Address, Data, Control)\n```\n\n### Address Bus\n*   **Direction**: Unidirectional; carries signals from CPU to memory/IO.\n*   **Function**: Carries physical address bits to select target memory locations.\n*   **Capacity**: Width of the bus determines the maximum addressable memory space.\n\n### Data Bus\n*   **Direction**: Bidirectional; transfers signals between CPU and other units.\n*   **Function**: Carries machine instructions, constants, and variables.\n*   **Performance**: Width determines the number of bits transferred per bus cycle.\n\n### Control Bus\n*   **Direction**: Bidirectional; carries timing and commands.\n*   **Function**: Coordinates transfers and prevents data collisions on bus lines.\n*   **Signals**: Includes read/write requests, ready signals, and interrupts."
        }
      ]
    },
    {
      "unitNum": 2,
      "unitTitle": "Memory Management",
      "questions": [
        {
          "id": "co_mp_q6",
          "number": 6,
          "question": "Explain the Difference Between Write-Through and Write-Back Policies",
          "marks": 6,
          "answer": "| Comparison Parameter | Write-Through Policy | Write-Back Policy |\n| :--- | :--- | :--- |\n| **1. Memory Update** | Cache and main memory updated simultaneously. | Main memory updated only when block is evicted. |\n| **2. Write Performance** | Slower due to slower main memory write cycles. | Faster since write runs at cache speed. |\n| **3. Bus Traffic** | High bus traffic on every write operation. | Low bus traffic (only active on block eviction). |\n| **4. Hardware Complexity** | Simple design with no dirty bits needed. | Complex design requiring dirty bits and controllers. |\n| **5. Consistency** | Strict consistency; RAM always matches cache. | Temporarily inconsistent; RAM may hold stale data. |\n| **6. Write Buffer** | Requires write buffer to prevent CPU stalls. | Does not require write buffer for standard writes. |\n| **7. Directory Tag** | No dirty bit tag overhead in cache directory. | Requires one dirty bit overhead per cache line. |\n| **8. Reliability** | High reliability; power loss does not lose data. | Lower reliability; dirty data in cache is lost. |\n| **9. Multi-core Setup** | Simple cache consistency over shared bus. | Complex consistency protocol (MESI) required. |"
        },
        {
          "id": "co_mp_q7",
          "number": 7,
          "question": "Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative",
          "marks": 7,
          "answer": "| Comparison Parameter | Direct Mapping | Fully Associative | Set-Associative |\n| :--- | :--- | :--- | :--- |\n| **1. Placement Rule** | Mapped to one fixed cache line. | Mapped to any cache line. | Mapped to any line in a specific set. |\n| **2. Address Fields** | Tag, Line Index, Word Offset. | Tag, Word Offset only. | Tag, Set Index, Word Offset. |\n| **3. Tag Comparators** | Single comparator used. | Total cache lines comparators. | Set size comparators. |\n| **4. Conflict Misses** | Highest conflict miss rate. | Lowest conflict miss rate. | Moderate conflict miss rate. |\n| **5. Access Hit Time** | Fastest access speed. | Slower access speed. | Moderate access speed. |\n| **6. Hardware Cost** | Lowest hardware cost. | Highest hardware cost. | Moderate hardware cost. |\n| **7. Replacement** | Not needed (overwrites line). | Required (LRU, FIFO). | Required (LRU, FIFO). |\n| **8. Space Use** | Poor space utilization. | Maximum space utilization. | Good space utilization. |"
        },
        {
          "id": "co_mp_q8",
          "number": 8,
          "question": "Write a Note on RAID and Its Levels in Detail with Diagram",
          "marks": 7,
          "answer": "### Definition\nRAID (Redundant Array of Independent Disks) combines multiple physical drives into one logical unit to achieve data safety, speed, or both.\n\n### Diagram\n```\n              ┌──────────────────────────────────┐\n              │         RAID Controller          │\n              └──────┬────────────┬────────────┬─┘\n                     ▼            ▼            ▼\n                ┌─────────┐  ┌─────────┐  ┌─────────┐\n                │ Disk 0  │  │ Disk 1  │  │ Disk 2  │\n                └─────────┘  └─────────┘  └─────────┘\n```\n\n### RAID 0 and RAID 1\n*   **RAID 0 (Data Striping)**: Splits data blocks across drives for speed; lacks redundancy and has zero fault tolerance.\n*   **RAID 1 (Data Mirroring)**: Duplicates identical data to two or more backup disks, providing high fault tolerance.\n\n### RAID 5 and RAID 6\n*   **RAID 5 (Distributed Parity)**: Stripes data blocks and parity across three or more drives, surviving one drive failure.\n*   **RAID 6 (Dual Parity)**: Uses dual parity blocks distributed across at least four drives, surviving two failures.\n\n### RAID 2, 3, and 4\n*   **RAID 2**: Stripes data at bit level and uses Hamming code ECC for error correction.\n*   **RAID 3**: Stripes data at byte level and uses a single dedicated parity disk.\n*   **RAID 4**: Stripes data at block level and uses a single dedicated parity disk.\n\n### Advantages\n*   **Data Redundancy**: Prevents data loss during hard drive failures.\n*   **Higher speed**: Accesses multiple drives in parallel to increase transfer rates.\n*   **Capacity Aggregation**: Merges multiple physical disks into one large logical volume."
        },
        {
          "id": "co_mp_q9",
          "number": 9,
          "question": "Describe LRU, FIFO, and LFU Replacement Algorithms",
          "marks": 7,
          "answer": "### Definition\nCache replacement algorithms select which block to evict from the cache to make room for new blocks when the cache is full.\n\n### Diagram\n```\n  FIFO (Queue):     [New Block] ──► [ Tail ] ──► [ Head ] ──► [ Evict ]\n  LRU (Stack):      [Most Recent] ─────────────────► [Least Recent (Evict)]\n  LFU (Counters):   [Freq: 10] , [Freq: 8] , [Freq: 2 (Evicted Block)]\n```\n\n### FIFO Page Replacement\n*   **Logic**: Evicts the oldest block that has been in the cache the longest.\n*   **Implementation**: Uses a simple queue where new blocks enter the tail and evicts occur at the head.\n*   **Limitation**: Can suffer from Belady's anomaly where increasing cache size increases misses.\n\n### LRU Page Replacement\n*   **Logic**: Evicts the block that has not been accessed for the longest time.\n*   **Implementation**: Relies on temporal locality and updates timestamps or stack positions on every hit.\n*   **Performance**: High hit rate but requires hardware overhead to update status.\n\n### LFU Page Replacement\n*   **Logic**: Evicts the block with the lowest total access frequency.\n*   **Implementation**: Maintains counter registers for each cache line.\n*   **Limitation**: Old popular blocks accumulate high counts and cause cache pollution.\n\n### Features\n*   **Cache Tuning**: Choosing the correct algorithm optimizes the CPU cache hit rate.\n*   **Hardware Overhead**: FIFO has the lowest overhead, while LRU and LFU require extra storage bits."
        },
        {
          "id": "co_mp_q10",
          "number": 10,
          "question": "Physical Components of a Hard Disk and Define Access Time, Seek Time, Rotational Delay",
          "marks": 8,
          "answer": "### Definition\nA magnetic Hard Disk Drive stores binary data on rotating platters coated with a magnetic material using electromagnetic read/write heads.\n\n### Diagram\n```\n     Platter Layout                  Side View\n  ┌────────────────┐             ┌───────────────┐\n ╱                  ╲            │ Actuator Arm  │\n│     Tracks (O)     │           │  ┌──────────┐ │\n│    ┌──────────┐    │           │  ├─ R/W Head│ │──► Platter 0\n│    │Sector ▰  │    │           └─┬───────────┘\n│    └──────────┘    │             │\n└────────────────────┘           Spindle Motor\n```\n\n### Components\n*   **Magnetic Platters** : Circular disks coated with a magnetic material to store binary data.\n*   **Spindle Motor** : Rotates the platters at a constant speed (e.g., 7200 RPM).\n*   **Read/Write Heads** : Electromagnetic sensors that float above platter surfaces to access data.\n*   **Actuator Arm** : Moves the heads radially across platters to position them over tracks.\n*   **Tracks and Sectors** : Platters are divided into concentric circular tracks and radial sectors.\n\n### Working\n*   The actuator arm positions the head over the correct track, introducing **Seek Time**.\n*   The platter rotates to align the target sector under the head, introducing **Rotational Delay**.\n*   Data bits are read or written to the sector, introducing **Transfer Time**.\n*   Total access time is the sum: T_{access} = T_{seek} + T_{rotational} + T_{transfer}."
        }
      ]
    },
    {
      "unitNum": 3,
      "unitTitle": "Introduction to 8086 Microprocessor",
      "questions": [
        {
          "id": "co_mp_q11",
          "number": 11,
          "question": "Draw the Pin Diagram of 8086 and Explain ALE, WR̅, DEN̅ and DT/R̅",
          "marks": 6,
          "answer": "### Definition\nThe 8086 is a 40-pin Dual In-line Package microprocessor that uses multiplexed address and data bus lines to share pin paths.\n\n### Diagram\n```\n                     ┌────────────┐\n         GND  [1]  ──┤            ├──  [40] VCC (+5V)\n     AD15     [2]  ──┤            ├──  [39] AD0\n     ALE      [25] ──┤    8086    ├──  [29] WR̅\n     DEN̅      [26] ──┤    CPU     ├──  [27] DT/R̅\n     GND      [20] ──┤            └──────  [21] RESET\n                     └────────────┘\n```\n\n### Address and Write Control\n*   **ALE (Address Latch Enable)**: Output pin that pulses high during T1 state to signal external latches to store address bits.\n*   **WR̅ (Write)**: Active-low output pin that goes low during T2 to signal memory or I/O of valid data on the bus.\n\n### Data Flow Control\n*   **DEN̅ (Data Enable)**: Active-low output pin that goes low during T2 to enable external transceivers and protect the bus.\n*   **DT/R̅ (Data Transmit/Receive)**: Output pin that goes high for data transmission (write) and low for data receiving (read).\n\n### Auxiliary Control\n*   **BHE̅ (Bus High Enable)**: Active-low output signal that enables the upper memory bank for data lines D8–D15.\n*   **MN/MX̅ (Min/Max Mode)**: Input pin that selects Minimum Mode (single CPU) or Maximum Mode (multiprocessor layout).\n\n### Features\n*   **Bus Multiplexing**: Shares address and data lines to lower physical pin count.\n*   **Tristate Outputs**: Pins support high-impedance state for DMA bus takeover."
        },
        {
          "id": "co_mp_q12",
          "number": 12,
          "question": "Explain Architecture of 8086",
          "marks": 7,
          "answer": "### Definition\nThe 8086 architecture is divided into two autonomous blocks: the Bus Interface Unit (BIU) for memory bus transfers, and the Execution Unit (EU) for instruction decoding and execution.\n\n### Diagram\n```\n  ┌─────────────────────────┐        ┌─────────────────────────┐\n  │   Bus Interface Unit    │        │     Execution Unit      │\n  │  Segment Regs & IP      ├─Queue─►│  ALU, General Regs      │\n  └─────────────────────────┘        └─────────────────────────┘\n```\n\n### Components\n*   **Segment Registers (CS, DS, SS, ES)** : Hold 16-bit base addresses of active memory blocks.\n*   **Instruction Pointer (IP)** : Holds the 16-bit offset of the next instruction byte to be fetched.\n*   **Address Adder (Σ)** : Performs a left shift and add operation to generate 20-bit physical addresses.\n*   **Instruction Queue** : A 6-byte FIFO buffer that stores fetched instruction opcodes in advance.\n*   **ALU (Arithmetic Logic Unit)** : A 16-bit arithmetic and logic unit that executes math and logic operations.\n*   **General Purpose Registers** : 16-bit data registers (AX, BX, CX, DX) that can be split into 8-bit registers.\n*   **Pointer and Index Registers** : Store offset pointers for stack access (SP, BP) and string operations (SI, DI).\n*   **Instruction Decoder** : Decodes queue opcodes and generates internal CPU control signals.\n*   **Flag Register** : A 16-bit register holding 6 status flags and 3 control flags.\n\n### Working\n*   The BIU fetches instruction bytes using idle bus cycles and stores them in the 6-byte queue.\n*   The EU pops decoded instructions from the queue and executes them in the ALU.\n*   If data access is needed, the EU requests the BIU to perform memory read/write cycles.\n*   Pipelining occurs as the BIU fetches the next instruction while the EU executes the current one.\n*   When a branch instruction is executed, the EU flushes the queue, and the BIU fetches from the new address.\n\n### Key Features\n*   **Instruction Pipelining**: Prefetches up to six instruction bytes to minimize execution delays.\n*   **Segmented Memory**: Organizes memory into logical segments to support relocatable programs."
        },
        {
          "id": "co_mp_q13",
          "number": 13,
          "question": "Explain Programmer's Model (Register Organization) of 8086",
          "marks": 7,
          "answer": "### Definition\nThe 8086 programmer's model consists of 14 user-accessible 16-bit registers that manage data processing, segmentation, stack access, and status flags.\n\n### Diagram\n```\n  AX: [  AH  ][  AL  ]   (Accumulator)     CS: [   Code Segment   ]\n  BX: [  BH  ][  BL  ]   (Base Offset)     DS: [   Data Segment   ]\n  CX: [  CH  ][  CL  ]   (Count)           SS: [   Stack Segment  ]\n  DX: [  DH  ][  DL  ]   (Data)            ES: [   Extra Segment  ]\n```\n\n### Components\n*   **Accumulator Register (AX)** : Used in arithmetic, logic, I/O operations, and multiplication or division.\n*   **Base Register (BX)** : Holds base offset pointer addresses for indirect memory addressing.\n*   **Count Register (CX)** : Acts as a loop counter and a shift or rotate counter.\n*   **Data Register (DX)** : Holds I/O port addresses and high-order product bits during multiplication.\n*   **Code Segment (CS)** : Holds the 16-bit base address of program instruction memory.\n*   **Data Segment (DS)** : Points to the segment where variables and application data are stored.\n*   **Stack Segment (SS)** : Holds the base address of stack memory for subroutines.\n*   **Extra Segment (ES)** : Serves as a destination base segment for string manipulation operations.\n*   **Stack Pointer (SP)** : Points to the active top offset of the stack segment.\n*   **Base Pointer (BP)** : Accesses parameters passed onto the stack during subroutine calls.\n*   **Source/Destination Index (SI/DI)** : Store source and destination offset addresses during string operations.\n*   **Instruction Pointer (IP)** : Holds the offset address of the next instruction code byte.\n*   **Flag Register** : Holds 6 arithmetic status flags and 3 system control flags.\n\n### Working\n*   The programmer manipulates data within AX, BX, CX, DX, or pointer registers.\n*   The BIU combines segment registers and offsets to calculate physical memory addresses.\n*   Status flags are updated automatically after every ALU operation.\n*   Control flags define single-step, interrupt, and string direction states."
        },
        {
          "id": "co_mp_q14",
          "number": 14,
          "question": "Explain Immediate, Register, Direct and Indirect Addressing Modes",
          "marks": 7,
          "answer": "### Definition\nAddressing modes define the syntax and operational steps used by instructions to locate and fetch operand data.\n\n### Diagram\n```\n  Immediate ──► Operand inside instruction code\n  Register  ──► Operand inside CPU register\n  Direct    ──► Address offset written in instruction\n  Indirect  ──► Address offset stored in register (BX/SI/DI)\n```\n\n### Immediate and Register Modes\n*   **Immediate Mode**: The operand is a constant value located directly in the instruction code.\n    *   *Example*: `MOV AX, 1234H` (loads constant 1234H into AX register).\n*   **Register Mode**: The operand is stored in a CPU register, and no memory cycles are executed.\n    *   *Example*: `MOV AX, BX` (copies register BX contents into register AX).\n\n### Direct and Indirect Modes\n*   **Direct Mode**: The 16-bit offset address is written directly in the instruction brackets.\n    *   *Example*: `MOV AX, [5000H]` (PA is calculated as (DS x 10H) + 5000H).\n*   **Register Indirect Mode**: The offset address is stored in BX, BP, SI, or DI pointer registers.\n    *   *Example*: `MOV AX, [SI]` (PA is calculated as (DS x 10H) + SI).\n\n### Advantages\n*   **Array Support**: Register indirect modes simplify loops and index searches.\n*   **Saves Memory**: Immediate and register modes execute faster without referencing RAM."
        },
        {
          "id": "co_mp_q15",
          "number": 15,
          "question": "How is 8086 Instruction Set Classified? Explain Any Two Categories",
          "marks": 6,
          "answer": "### Definition\nThe 8086 instruction set consists of native CPU commands classified into six groups based on data, math, logic, branching, and control tasks.\n\n### Diagram\n```\n  [ Instruction Set ] ──► Transfer / Arithmetic / Logical / Branch / Control\n```\n\n### Data Transfer Instructions\n*   **Purpose**: Copy bytes or words between registers, memory, and I/O ports.\n*   **Flag Impact**: These instructions do not affect any status flags.\n*   **Examples**: `MOV AX, BX` (copies BX to AX) and `PUSH CX` (stores CX on stack).\n\n### Arithmetic Instructions\n*   **Purpose**: Perform mathematical calculations on binary or BCD data formats.\n*   **Flag Impact**: Update status flags (ZF, CF, SF, OF, AF, PF) based on the result.\n*   **Examples**: `ADD AX, BX` (sums BX and AX) and `CMP AL, 05H` (compares by subtraction).\n\n### Other Categories\n*   **Logical**: Performs Boolean operations (AND, OR, XOR) and shifts bits.\n*   **Program Control**: Controls program execution loops, conditional jumps, and subroutine calls.\n*   **Processor Control**: Modifies status flag bits (e.g., CLI) and syncs bus actions.\n\n### Features\n*   **Data Size Flex**: Supports both 8-bit byte and 16-bit word operations.\n*   **Instruction Set Class**: Divides instruction logic to optimize memory reads."
        }
      ]
    },
    {
      "unitNum": 4,
      "unitTitle": "Memory Organization and Interrupts",
      "questions": [
        {
          "id": "co_mp_q16",
          "number": 16,
          "question": "Explain Even and Odd Memory Banks of 8086",
          "marks": 7,
          "answer": "### Definition\nThe 8086 memory is split into Even and Odd Banks of 512 KB each to support both 8-bit byte access and 16-bit word access in a single cycle.\n\n### Diagram\n```\n                          8086 CPU\n               ┌─────────────────────────┐\n               │    16-bit Data Bus       │\n               │  D0-D7      D8-D15      │\n               └────┬────────────┬───────┘\n                    │            │\n            A0=0     │            │    BHE̅=0\n          (select)   │            │   (select)\n                    ▼            ▼\n          ┌──────────────┐ ┌──────────────┐\n          │  EVEN BANK   │ │  ODD BANK    │\n          │ (Lower Bank) │ │ (Upper Bank) │\n          └──────────────┘ └──────────────┘\n```\n\n### Components\n*   **Even Bank (Lower Bank)** : Stores bytes at even physical addresses and connects to lower data lines D0–D7.\n*   **Odd Bank (Upper Bank)** : Stores bytes at odd physical addresses and connects to upper data lines D8–D15.\n*   **Address Line A0** : Acts as the hardware chip-select signal for the Even Memory Bank (active low).\n*   **BHE̅ Pin (Bus High Enable)** : Acts as the hardware chip-select signal for the Odd Memory Bank (active low).\n\n### Working\n*   Aligned word access reads both banks simultaneously by driving A0 = 0 and BHE̅ = 0.\n*   Bytes at even addresses are read by driving A0 = 0 and BHE̅ = 1 over D0–D7 lines.\n*   Bytes at odd addresses are read by driving A0 = 1 and BHE̅ = 0 over D8–D15 lines.\n*   Unaligned word access at odd addresses requires two successive bus cycles to complete.\n*   Cycle 1 of unaligned access reads the odd byte, and Cycle 2 reads the next even byte."
        },
        {
          "id": "co_mp_q17",
          "number": 17,
          "question": "Read and Write Timing Diagram of 8086",
          "marks": 7,
          "answer": "### Definition\nA bus cycle defines the timing phases used by the 8086 CPU to read or write memory, consisting of T1, T2, T3, and T4 clock periods.\n\n### Diagram\n```\nCLK  _┌─┐_┌─┐_┌─┐_┌─┐_\nALE  __┌─┐___________\nAD   __Address__Data_\n```\n\n### Address Phase and Control Signal Activation\n*   **State T1 (Address Phase)**: CPU places physical address on AD0–AD15 and pulses ALE high to latch the address.\n*   **State T2 (Bus Turnaround)**: Bus goes high-impedance (read) or drives data (write). RD̅/WR̅ and DEN̅ go low.\n\n### Data Transfer and Completion\n*   **State T3 (Data Transfer)**: CPU reads or writes data bits and samples the READY pin to check for slow devices.\n*   **State T4 (Bus Cycle End)**: Control signals (RD̅/WR̅) and DEN̅ return high to disconnect transceivers.\n\n### Features\n*   **Wait States**: Introduces Tw cycles if READY is low to allow slow devices to respond.\n*   **Data Bus Safety**: Uses DEN̅ and DT/R̅ to enable transceivers and coordinate data direction."
        },
        {
          "id": "co_mp_q18",
          "number": 18,
          "question": "Compare Memory-Mapped I/O and I/O-Mapped I/O",
          "marks": 8,
          "answer": "| Comparison Parameter | Memory-Mapped I/O | I/O-Mapped I/O |\n| :--- | :--- | :--- |\n| **1. Address Space** | Shares address space with system RAM. | Occupies separate I/O address space. |\n| **2. Max Port Range** | Up to 1 MB (same limit as RAM). | Limited to a range of 64 KB. |\n| **3. Control Signals** | Relies on memory signals (MEMR̅/MEMW̅). | Uses I/O control signals (M/IO̅). |\n| **4. Instructions** | Can use any memory reference command. | Restricted to IN and OUT instructions. |\n| **5. Registers** | Allows transfer with any CPU register. | Restricts data transfers to AL or AX. |\n| **6. Decoder Complexity**| High complexity (decodes 20-bit address). | Low complexity (decodes 16-bit address). |\n| **7. Access Speed** | Faster due to memory instructions. | Slower due to port control instructions. |\n| **8. Memory Penalty** | Reduces RAM space reserved for ports. | Preserves entire memory space for RAM. |"
        },
        {
          "id": "co_mp_q19",
          "number": 19,
          "question": "Calculate Physical Address",
          "marks": 4,
          "answer": "### Definition\nThe 8086 shifts the segment address left by 4 bits and adds the offset address to generate a 20-bit physical address.\n\n### Formula\nPhysical Address = (Segment Address · 10H) + Offset Address\n\n### Examples\n*   **Code Segment Calculation (CS:IP)**: CS = `2000H`, IP = `1234H`.\n    *   Physical Address = (2000H · 10H) + 1234H = 20000H + 1234H = 21234H.\n*   **Data Segment Calculation (DS:SI)**: DS = `1500H`, SI = `0200H`.\n    *   Physical Address = (1500H · 10H) + 0200H = 15000H + 0200H = 15200H.\n*   **Stack Segment Calculation (SS:SP)**: SS = `3000H`, SP = `0100H`.\n    *   Physical Address = (3000H · 10H) + 0100H = 30000H + 0100H = 30100H.\n*   **Extra Segment Calculation (ES:DI)**: ES = `4000H`, DI = `00A0H`.\n    *   Physical Address = (4000H · 10H) + 00A0H = 40000H + 00A0H = 400A0H."
        },
        {
          "id": "co_mp_q20",
          "number": 20,
          "question": "Explain Interrupt Handling Mechanism and IVT",
          "marks": 6,
          "answer": "### Definition\nAn interrupt temporarily suspends execution of the main program to run an Interrupt Service Routine (ISR) located via the IVT.\n\n### Diagram\n```\n  [Interrupt Request] ──► PUSH Flags/CS/IP ──► Load New CS:IP ──► Execute ISR\n```\n\n### Interrupt Handling Steps\n*   **Step 1**: CPU finishes the current machine instruction.\n*   **Step 2**: Pushes Flag register, CS segment register, and IP offset register onto the stack.\n*   **Step 3**: Clears Interrupt Flag (IF) and Trap Flag (TF) to disable debug mode and maskable interrupts.\n*   **Step 4**: Multiplies interrupt vector type `n` by 4 to get the vector table index address.\n*   **Step 5**: Loads target IP (offset) and CS (segment base) from calculated IVT address.\n*   **Step 6**: Executes ISR and returns to the main program using the `IRET` instruction.\n\n### Interrupt Vector Table (IVT)\n*   **Address Range**: Located in the lowest 1024 bytes of memory, from address `00000H` to `003FFH`.\n*   **Vector Size**: Supports 256 vector addresses, where each entry is 4 bytes (2 bytes for IP, 2 bytes for CS).\n*   **Predefined Types**: Includes Type 0 (Divide by Zero), Type 2 (NMI), and Type 3 (Breakpoint).\n\n### Features\n*   **Fast ISR lookup**: Reaches targeted subroutines using quick lookup math (n x 4).\n*   **Priority Rules**: Coordinates concurrent hardware and software interrupt requests."
        }
      ]
    },
    {
      "unitNum": 5,
      "unitTitle": "Parallel Organization",
      "questions": [
        {
          "id": "co_mp_q21",
          "number": 21,
          "question": "Closely Coupled and Loosely Coupled Multiprocessor Systems",
          "marks": 6,
          "answer": "| Comparison Parameter | Closely Coupled System | Loosely Coupled System |\n| :--- | :--- | :--- |\n| **1. Memory Structure** | Shared centralized memory pool. | Private distributed local memory. |\n| **2. Communication** | Through shared variables in RAM. | Through message passing over a network. |\n| **3. Transfer Rate** | Extremely high (limited by bus speed). | Moderate to low (limited by network). |\n| **4. Operating System** | Single centralized OS controls all. | Each processor node runs its own OS. |\n| **5. System Scaling** | Low scaling due to bus saturation. | High scaling (nodes are independent). |\n| **6. Fault Tolerance** | Lower (shared memory failure halts system). | Higher (failed node is isolated). |\n| **7. Synchronization** | Uses locks or shared semaphores. | Uses software message-passing. |\n| **8. Connection Distance**| Very short (within same board). | Long (distributed over network links). |"
        },
        {
          "id": "co_mp_q22",
          "number": 22,
          "question": "Explain SMP Organization",
          "marks": 7,
          "answer": "### Definition\nSymmetric Multiprocessing (SMP) is a multiprocessor architecture where two or more identical processors connect to shared main memory and I/O devices, sharing equal access rights under a single OS.\n\n### Diagram\n```\n  ┌──────┐    ┌──────┐\n  │ CPU1 │    │ CPU2 │\n  └───┬──┘    └───┬──┘\n  ════╧═══════════╧═════ System Bus ◄══► Shared RAM\n```\n\n### Components\n*   **Identical CPU Cores** : Execution units that run threads in parallel.\n*   **Private Caches** : High-speed local memory (L1/L2) that reduces bus accesses.\n*   **Shared System Bus** : Single pathway connecting all processors and memory.\n*   **Shared RAM** : Centralized main memory accessible by all processors.\n*   **Shared I/O Controllers** : Common ports allowing any CPU to launch transfers.\n\n### Working\n*   All CPU cores share the single centralized physical RAM.\n*   Cache controllers monitor the system bus via **Bus Snooping** to detect writes.\n*   **MESI Protocol** manages cache consistency using four states: Modified, Exclusive, Shared, Invalid.\n*   When a CPU writes to a shared cache line, other cache lines are marked Invalid.\n*   The single operating system schedules threads dynamically to balance CPU load.\n\n### Key Features\n*   **Load Balancing**: Coordinates execution to distribute active threads.\n*   **Fault Tolerance**: Continues operation using remaining CPUs if one fails."
        },
        {
          "id": "co_mp_q23",
          "number": 23,
          "question": "Explain Flynn's Taxonomy",
          "marks": 7,
          "answer": "### Definition\nFlynn's Taxonomy classifies computer architectures by the number of concurrent instruction streams and data streams active in the system.\n\n### Diagram\n```\n  SISD: [ Mem ] ──► [ CU ] ──► [ PE ]   SIMD: [ CU ] ──► [ PE 1, PE 2 ]\n  MISD: [ CU 1, CU 2 ] ──► [ PE ]        MIMD: [ CPU 1 ] , [ CPU 2 ] ──► [ Net ]\n```\n\n### SISD and SIMD Classes\n*   **SISD (Single Instruction, Single Data)**: Processes one instruction stream on a single data stream sequentially (e.g., single-core PC).\n*   **SIMD (Single Instruction, Multiple Data)**: Broadcasts one instruction to multiple execution units working on separate data streams in lockstep (e.g., GPUs).\n\n### MISD and MIMD Classes\n*   **MISD (Multiple Instruction, Single Data)**: Runs multiple instructions on a single data stream (rare; used for redundant fault-tolerant flight computers).\n*   **MIMD (Multiple Instruction, Multiple Data)**: Executing multiple instructions on multiple data streams asynchronously (e.g., multi-core CPUs).\n\n### Features\n*   **Parallelism Level**: Classifies architectures from sequential execution (SISD) to task-level parallelism (MIMD).\n*   **Hardware Design**: SIMD shares one instruction decoder, while MIMD duplicates all control and bus logic."
        },
        {
          "id": "co_mp_q24",
          "number": 24,
          "question": "Compare UMA and NUMA Architectures",
          "marks": 8,
          "answer": "| Comparison Parameter | UMA Architecture | NUMA Architecture |\n| :--- | :--- | :--- |\n| **1. Memory Layout** | Centralized memory pool. | Distributed memory next to each CPU. |\n| **2. Access Delay** | Uniform (constant delay). | Non-uniform (faster local, slower remote). |\n| **3. Interconnection** | System bus or crossbar switches. | Point-to-point networks and router links. |\n| **4. Scaling Limits** | Low scalability (< 32 processors). | High scalability (thousands of nodes). |\n| **5. Consistency** | Bus snooping (MESI protocol). | Directory-based consistency protocol. |\n| **6. Total Bandwidth** | Low (single shared memory bus). | High (private memory bus per node). |\n| **7. Design Cost** | Lower (simple memory controller). | Higher (complex routing and directories). |\n| **8. Performance Limit**| Bus saturation bottlenecks. | Remote memory access delays. |"
        },
        {
          "id": "co_mp_q25",
          "number": 25,
          "question": "Compare RISC and CISC Architectures",
          "marks": 7,
          "answer": "| Comparison Parameter | RISC Architecture | CISC Architecture |\n| :--- | :--- | :--- |\n| **1. Instruction Set** | Small set of simple commands. | Large set of complex, multi-cycle commands. |\n| **2. Word Length** | Fixed-size instructions (32-bit). | Variable-size instructions (1 to 15 bytes). |\n| **3. Registers** | Large register file (32+ registers). | Small register file (8 to 16 registers). |\n| **4. Control Design** | Hardwired logic using gates. | Microprogrammed control using ROM. |\n| **5. Memory Access** | Load-Store design (RAM access restricted). | Memory-to-memory design (RAM access allowed). |\n| **6. Pipelining** | Simple and highly efficient. | Complex due to variable cycle times. |\n| **7. Compiler Role** | High optimization to assign registers. | Simple compilation using hardware commands. |\n| **8. Target CPU** | ARM chips and RISC-V. | Intel x86 and AMD chips. |"
        }
      ]
    }
  ]
};
