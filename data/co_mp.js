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
          "answer": "### Introduction:\n*   Von Neumann architecture uses a single shared memory block for instructions and data.\n*   Harvard architecture uses separate, independent memory units for instructions and data.\n\n### Comparison Table:\n\n| Comparison Point | Von Neumann | Harvard |\n| :--- | :--- | :--- |\n| **1. Memory Space** | Shared | Separate |\n| **2. Bus System** | Single | Dual |\n| **3. Pipelining** | Difficult | Simple |\n| **4. CPU Pin Count** | Lower | Higher |\n| **5. Execution Speed** | Slower | Faster |\n| **6. System Cost** | Lower | Higher |\n| **7. Memory Conflict** | Possible | None |\n| **8. Target Device** | General computers | Small microcontrollers |"
        },
        {
          "id": "co_mp_q2",
          "number": 2,
          "question": "Draw and Explain the Hardware Implementation of Booth's Algorithm",
          "marks": 6,
          "answer": "### Introduction / Definition:\n*   Booth's algorithm is used to multiply signed binary numbers.\n*   It handles negative numbers directly in two's complement format.\n*   This logic avoids the need for separate sign checks.\n\n### Diagram:\n```\n   ┌─────────┐    ┌─────────┐\n   │ Reg M   │    │ Reg A   │◄─── ASHR (Shift)\n   └────┬────┘    └────┬────┘\n        │   ┌─────┐    │\n        └──►│ ALU │◄───┘\n            └─────┘\n```\n\n### Key Points / Core Theory:\n*   **Register M** stores the multiplicand value in signed binary.\n*   **Register Q** stores the multiplier value to be processed.\n*   **Register A** holds partial product bits during execution steps.\n*   **Flip-flop Q-1** helps detect bit transitions in multiplier values.\n*   **Control logic** checks Q0 and Q-1 to decide actions.\n*   **Arithmetic shifts** preserve the sign bit during right shifts.\n*   **Sequence counter** counts down remaining step iterations to zero.\n\n### Simple Real-World Example:\n*   A chef multiplies a recipe size using quick scaling steps.\n*   Instead of adding repeatedly, they use fast shifting logic.\n\n### Advantages / Applications:\n*   Faster than standard shift-and-add multiplication methods.\n*   Simplifies arithmetic unit design in computer processors.\n*   Operates on positive and negative numbers uniformly.\n\n### Conclusion:\n*   Booth's algorithm provides a fast hardware method for signed binary multiplication.\n*   It decreases processor delay and hardware overhead."
        },
        {
          "id": "co_mp_q3",
          "number": 3,
          "question": "Discuss the Limitation of a Ripple Carry Adder and Explain How a Carry Look-Ahead (CLA) Adder Improves Speed",
          "marks": 7,
          "answer": "### Introduction:\n*   Ripple Carry Adders propagate carries sequentially through each full adder stage.\n*   Carry Look-Ahead Adders compute carries in parallel using logic equations.\n\n### Comparison Table:\n\n| Comparison Point | Ripple Carry Adder | Carry Look-Ahead |\n| :--- | :--- | :--- |\n| **1. Carry Generation** | Sequential | Parallel |\n| **2. Operating Speed** | Slower | Faster |\n| **3. Hardware Complexity** | Low | High |\n| **4. Delay Type** | Linear delay | Constant delay |\n| **5. Gate Count** | Fewer gates | More gates |\n| **6. System Cost** | Lower | Higher |\n| **7. Ideal Use** | Slow devices | Fast processors |\n| **8. Bit Scaling** | Low scaling | Hard scaling |"
        },
        {
          "id": "co_mp_q4",
          "number": 4,
          "question": "Multiply Using Booth's Algorithm: Multiplicand = +3, Multiplier = -4",
          "marks": 8,
          "answer": "### Introduction / Definition:\n*   Signed multiplication of plus three and minus four using binary logic.\n*   The algorithm runs through four iterations to produce the result.\n\n### Diagram:\n```\n  A = 0000, Q = 1100, Q-1 = 0, M = 0011\n```\n\n### Key Points / Core Theory:\n*   **Multiplicand value** is plus three represented as zero zero one one.\n*   **Two's complement** of multiplicand is one one zero one.\n*   **Multiplier value** is minus four represented as one one zero zero.\n*   **Initial state** sets accumulator and flip-flop to zero.\n*   **Shift operation** moves all bits right by one position.\n\n### Simple Real-World Example:\n```\nTrace table for +3 times -4:\nCycle | Reg A | Reg Q | Q-1 | Action\nInit  | 0000  | 1100  | 0   | Initialize\nC1    | 0000  | 0110  | 0   | Shift\nC2    | 0000  | 0011  | 0   | Shift\nC3    | 1101  | 0011  | 0   | Sub M\n      | 1110  | 1001  | 1   | Shift\nC4    | 1111  | 0100  | 1   | Shift\nResult: 11110100 in binary, which is -12 in decimal.\n```\n\n### Advantages / Applications:\n*   Verifies hardware multiplication step accuracy for signed values.\n*   Eliminates separate binary addition and subtraction overflow logic.\n*   Simplifies compiler math checks for basic operations.\n\n### Conclusion:\n*   The trace confirms that the final result equals decimal minus twelve.\n*   It shows the efficiency of hardware shift operations."
        },
        {
          "id": "co_mp_q5",
          "number": 5,
          "question": "Define the Structure of a System Bus. Explain Data Bus, Address Bus, and Control Bus",
          "marks": 7,
          "answer": "### Introduction / Definition:\n*   A system bus connects the processor, memory, and input devices.\n*   It serves as a shared pathway for digital signal transfers.\n*   The bus organizes communication to prevent signal conflicts.\n\n### Diagram:\n```\n  ┌────────┐     ┌────────┐\n  │  CPU   │◄═══►│ Memory │\n  └──────┬─┘     └─┬──────┘\n         ▼         ▼\n  ═══════╧═════════╧══════ System Bus\n```\n\n### Key Points / Core Theory:\n*   **Address bus** carries memory location addresses from CPU to RAM.\n*   **Data bus** transfers actual instruction bytes and data values.\n*   **Control bus** carries read and write commands to memory.\n*   **Bus width** determines the maximum memory capacity of processors.\n*   **Data width** determines how many bits transfer in parallel.\n\n### Simple Real-World Example:\n*   A highway system connects different cities in a country.\n*   Cars represent data travelling along the designated lanes.\n\n### Advantages / Applications:\n*   Decreases system complexity by sharing physical wiring pathways.\n*   Standardizes connection layouts for external device compatibility.\n*   Simplifies motherboard design for modern computer architectures.\n\n### Conclusion:\n*   The system bus provides the primary physical link between computer parts.\n*   It coordinates data transfers through dedicated control lines."
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
          "answer": "### Introduction:\n*   Write-through cache writes data to cache and main memory at the same time.\n*   Write-back cache writes data to cache first and updates memory later.\n\n### Comparison Table:\n\n| Comparison Point | Write-Through | Write-Back |\n| :--- | :--- | :--- |\n| **1. Memory Update** | Simultaneous | Delayed |\n| **2. Write Speed** | Slower | Faster |\n| **3. Bus Traffic** | Higher | Lower |\n| **4. RAM Consistency** | Matches cache | May differ |\n| **5. Dirty Bit** | Not required | Required |\n| **6. Design Cost** | Lower | Higher |\n| **7. Risk of Data Loss** | Lower | Higher |\n| **8. Write Buffer** | Required | Not required |"
        },
        {
          "id": "co_mp_q7",
          "number": 7,
          "question": "Compare the Three Cache Mapping Techniques: Direct, Associative, and Set-Associative",
          "marks": 7,
          "answer": "### Introduction:\n*   Direct mapping maps each memory block to a single cache line.\n*   Associative mapping maps a memory block to any cache line.\n*   Set-associative mapping maps a block to a specific set of cache lines.\n\n### Comparison Table:\n\n| Comparison Point | Direct Mapping | Fully Associative | Set-Associative |\n| :--- | :--- | :--- | :--- |\n| **1. Block Placement** | Fixed line | Any line | Any set line |\n| **2. Address Fields** | Tag, Line, Offset | Tag, Offset | Tag, Set, Offset |\n| **3. Tag Comparators** | One | All | Limited |\n| **4. Conflict Misses** | Highest | Lowest | Moderate |\n| **5. Access Speed** | Fastest | Slower | Moderate |\n| **6. Design Cost** | Lowest | Highest | Moderate |\n| **7. Replacement Policy** | Not needed | Required | Required |\n| **8. Design Complexity** | Simple | Complex | Moderate |"
        },
        {
          "id": "co_mp_q8",
          "number": 8,
          "question": "Write a Note on RAID and Its Levels in Detail with Diagram",
          "marks": 7,
          "answer": "### Introduction / Definition:\n*   RAID combines multiple physical hard drives into a single logical unit.\n*   It distributes data across drives to achieve redundancy and speed.\n*   This setup protects data against individual drive failures.\n\n### Diagram:\n```\n  ┌──────────────────────────────────┐\n  │         RAID Controller          │\n  └──────┬────────────┬────────────┬─┘\n         ▼            ▼            ▼\n    ┌─────────┐  ┌─────────┐  ┌─────────┐\n    │ Disk 0  │  │ Disk 1  │  │ Disk 2  │\n    └─────────┘  └─────────┘  └─────────┘\n```\n\n### Key Points / Core Theory:\n*   **RAID zero** stripes data blocks across drives for maximum speed.\n*   **RAID one** mirrors identical data to secondary backup storage drives.\n*   **RAID five** uses distributed parity blocks to survive disk failures.\n*   **RAID six** writes dual parity blocks to survive two failures.\n\n### Simple Real-World Example:\n*   A business owner keeps copies of tax records in two safes.\n*   If one safe burns down, the backup records are safe.\n\n### Advantages / Applications:\n*   Protects critical data from single hard drive hardware failures.\n*   Increases read and write speeds using multi-channel transfers.\n*   Combines multiple small physical disks into one large volume.\n\n### Conclusion:\n*   RAID provides data safety and storage speed in computer systems.\n*   It is widely used in enterprise server database setups."
        },
        {
          "id": "co_mp_q9",
          "number": 9,
          "question": "Describe LRU, FIFO, and LFU Replacement Algorithms",
          "marks": 7,
          "answer": "### Introduction:\n*   FIFO removes the block that entered the cache first.\n*   LRU removes the block that was not accessed for the longest time.\n*   LFU removes the block with the lowest total hit count.\n\n### Comparison Table:\n\n| Comparison Point | FIFO | LRU | LFU |\n| :--- | :--- | :--- | :--- |\n| **1. Removal Rule** | Oldest block | Least recently used | Lowest frequency |\n| **2. Hardware Overhead** | Lowest | Highest | Moderate |\n| **3. Belady's Anomaly** | Possible | None | None |\n| **4. Hit Rate** | Average | Highest | Average |\n| **5. Tracking Needs** | Load time | Access time | Access frequency |\n| **6. Implementation** | Simple queue | Complex stack | Counter registers |\n| **7. Cache Pollution** | Possible | None | High risk |\n| **8. Main Focus** | Entry age | Recency | Popularity |"
        },
        {
          "id": "co_mp_q10",
          "number": 10,
          "question": "Physical Components of a Hard Disk and Define Access Time, Seek Time, Rotational Delay",
          "marks": 8,
          "answer": "### Introduction / Definition:\n*   Hard disk drives store data on spinning magnetic platters.\n*   Read and write heads move across tracks to access sectors.\n*   Access time measures the delay before data transfer begins.\n\n### Diagram:\n```\n     ┌──────────────┐\n     │ Actuator Arm │\n     └──────┬───────┘\n            ▼\n    ○─────[Head]   (Spindle Motor Center)\n  Platter Surface\n```\n\n### Key Points / Core Theory:\n*   **Seek time** is the delay to move actuator arms.\n*   **Rotational delay** is the time for sectors to spin.\n*   **Transfer time** is the duration of actual data movement.\n*   **Tracks** are concentric circular paths on the platter surface.\n*   **Sectors** are the smallest unit of disk storage space.\n\n### Simple Real-World Example:\n*   A record player arm moves to a specific music track.\n*   The listener waits for the song to rotate under needles.\n\n### Advantages / Applications:\n*   Provides high capacity storage at very low hardware cost.\n*   Retains data when power is completely turned off.\n*   Used for long term system backup and data archiving.\n\n### Conclusion:\n*   Magnetic hard drives offer cheap storage for large system files.\n*   Their mechanical nature makes them slower than solid state drives."
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
          "answer": "### Introduction / Definition:\n*   The 8086 is a 16-bit microprocessor with forty physical pins.\n*   It uses multiplexed lines to share address and data signals.\n*   This sharing reduces the physical pin count of the processor.\n\n### Diagram:\n```\n          ┌────────────┐\n     GND  │1        40│ VCC\n     AD15 │2   8086 39│ AD0\n     ALE  │25  CPU  29│ WR̅\n     DEN̅  │26       27│ DT/R̅\n          └────────────┘\n```\n\n### Key Points / Core Theory:\n*   **Address latch enable** separates multiplexed address and data bus lines.\n*   **Write signal** goes low to indicate active memory write operations.\n*   **Data enable** activates external transceiver buffers for bus safety.\n*   **Data transmit receive** sets the direction of bus data flow.\n*   **Multiplexed lines** save physical package pins on the CPU chip.\n\n### Simple Real-World Example:\n*   A single water pipe brings clean water or drains waste.\n*   Valves control which way the water flows at different times.\n\n### Advantages / Applications:\n*   Decreases chip size requirements by sharing physical connection pins.\n*   Signals control external latches to keep memory addressing stable.\n*   Simplifies data direction control during read and write processes.\n\n### Conclusion:\n*   The 8086 pins coordinate critical address latching and transfer timing.\n*   They ensure clean communication with memory and input devices."
        },
        {
          "id": "co_mp_q12",
          "number": 12,
          "question": "Explain Architecture of 8086",
          "marks": 7,
          "answer": "### Introduction / Definition:\n*   The 8086 architecture consists of two main processing units.\n*   The Bus Interface Unit handles external system bus transfers.\n*   The Execution Unit decodes and runs instruction opcodes internally.\n\n### Diagram:\n```\n  ┌─────────────────┐       ┌─────────────────┐\n  │  Bus Interface  │       │ Execution Unit  │\n  │   Unit (BIU)    ├──────►│     (EU)        │\n  └─────────────────┘ Queue └─────────────────┘\n```\n\n### Key Points / Core Theory:\n*   **Bus Interface Unit** fetches instruction bytes from memory locations.\n*   **Instruction queue** stores up to six bytes of fetched code.\n*   **Execution Unit** decodes and executes instructions from the queue.\n*   **Pipelining** allows fetching and executing operations at the same time.\n*   **Address adder** calculates the physical memory address in hardware.\n\n### Simple Real-World Example:\n*   An assembly line worker packages boxes while another worker labels.\n*   Neither worker waits idle for the other to finish tasks.\n\n### Advantages / Applications:\n*   Speed up instruction throughput by fetching code during execution.\n*   Lowers bus idle time by prefetching instructions in advance.\n*   Separates system memory access logic from internal calculation hardware.\n\n### Conclusion:\n*   Parallel operation of BIU and EU represents basic processor pipelining.\n*   It results in faster program execution and high performance."
        },
        {
          "id": "co_mp_q13",
          "number": 13,
          "question": "Explain Programmer's Model (Register Organization) of 8086",
          "marks": 7,
          "answer": "### Introduction / Definition:\n*   Registers are high speed storage locations inside the processor.\n*   The 8086 contains fourteen user-accessible 16-bit register files.\n*   They are grouped by function like segment, pointer, or general.\n\n### Diagram:\n```\n  ┌───────────────────────────────────────────────┐\n  │ AX, BX, CX, DX  (General Purpose Registers)   │\n  ├───────────────────────────────────────────────┤\n  │ CS, DS, SS, ES  (Segment Base Registers)      │\n  └───────────────────────────────────────────────┘\n```\n\n### Key Points / Core Theory:\n*   **General purpose registers** store calculation data and address offsets.\n*   **Segment registers** hold the base addresses of memory blocks.\n*   **Pointer registers** track active stack addresses and index values.\n*   **Flag register** holds status bits representing arithmetic operation results.\n*   **Instruction pointer** holds the offset of the next instruction.\n\n### Simple Real-World Example:\n*   A carpenter keeps frequently used tools in pocket holsters.\n*   Large, heavy material remains in the main storage shed.\n\n### Advantages / Applications:\n*   Accessing internal registers is much faster than reading memory.\n*   Dedicated registers simplify specific instructions like loops and shifts.\n*   Segment registers allow easy management of different program blocks.\n\n### Conclusion:\n*   Register organization provides fast access to variables and stack pointers.\n*   It forms the programmer's view of the microprocessor architecture."
        },
        {
          "id": "co_mp_q14",
          "number": 14,
          "question": "Explain Immediate, Register, Direct and Indirect Addressing Modes",
          "marks": 7,
          "answer": "### Introduction:\n*   Addressing modes define how the CPU locates instructions and data.\n*   The 8086 uses different modes for registers, memory, and constants.\n\n### Comparison Table:\n\n| Comparison Point | Immediate | Register | Direct | Indirect |\n| :--- | :--- | :--- | :--- | :--- |\n| **1. Data Location** | Instruction code | CPU register | RAM memory | RAM memory |\n| **2. Address Source** | None | Register name | Instruction offset | Pointer register |\n| **3. Memory Cycles** | Zero | Zero | One cycle | One cycle |\n| **4. Execution Speed** | Fastest | Fastest | Slower | Slower |\n| **5. Register Needs** | None | Required | None | Required |\n| **6. Segment Default** | None | None | Data segment | Data segment |\n| **7. Ideal Use** | Setting constants | Register math | Global variables | Array loops |\n| **8. Code Example** | `MOV AX, 5` | `MOV AX, BX` | `MOV AX, [50]` | `MOV AX, [SI]` |"
        },
        {
          "id": "co_mp_q15",
          "number": 15,
          "question": "How is 8086 Instruction Set Classified? Explain Any Two Categories",
          "marks": 6,
          "answer": "### Introduction / Definition:\n*   The 8086 instruction set contains all native processor commands.\n*   These commands are classified into groups based on their function.\n*   Key categories include data transfer, arithmetic, and logic operations.\n\n### Diagram:\n```\n  ┌──────────────────────────────────────────────┐\n  │                 Instruction                  │\n  ├──────────────┬──────────────┬────────────────┤\n  │   Transfer   │  Arithmetic  │    Logical     │\n  └──────────────┴──────────────┴────────────────┘\n```\n\n### Key Points / Core Theory:\n*   **Data transfer instructions** copy bytes between registers and memory.\n*   **Arithmetic instructions** perform binary calculations like addition and subtraction.\n*   **Logical instructions** perform Boolean operations like AND, OR, XOR.\n*   **Program control instructions** change instruction execution paths via jumps.\n*   **Processor control instructions** modify flag states and timing status.\n\n### Simple Real-World Example:\n*   A cookbook contains instructions to gather, chop, and mix.\n*   Each instruction type performs a distinct role in cooking.\n\n### Advantages / Applications:\n*   Provides a versatile set of controls for software developers.\n*   Allows writing complex mathematical programs using simple hardware commands.\n*   Optimizes memory access using targeted data movement instructions.\n\n### Conclusion:\n*   The 8086 instruction set is grouped into six distinct categories.\n*   These commands control data movement, math, and program logic."
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
          "answer": "### Introduction / Definition:\n*   The 8086 memory is split into even and odd banks.\n*   Each bank stores 512 KB of physical byte addresses.\n*   This layout allows accessing 16-bit words in one cycle.\n\n### Diagram:\n```\n  ┌───────────┐    ┌───────────┐\n  │ Even Bank │    │ Odd Bank  │\n  │  (D0-D7)  │    │ (D8-D15)  │\n  └─────▲─────┘    └─────▲─────┘\n        │ A0=0           │ BHE̅=0\n```\n\n### Key Points / Core Theory:\n*   **Even bank** stores bytes at even memory address locations.\n*   **Odd bank** stores bytes at odd memory address locations.\n*   **Bus high enable** select line activates the upper memory bank.\n*   **Address line zero** low state selects the lower memory bank.\n*   **Aligned word transfers** read both memory banks in one cycle.\n\n### Simple Real-World Example:\n*   A double door entrance allows two people inside at once.\n*   Opening only one door limits entrance to one person.\n\n### Advantages / Applications:\n*   Increases byte reading efficiency using dual bank line transfers.\n*   Speeds up word execution by fetching sixteen bits at once.\n*   Maintains compatibility with older eight bit hardware device controllers.\n\n### Conclusion:\n*   Memory banking allows the 8086 to perform fast word reads.\n*   It divides memory into two physical byte channels."
        },
        {
          "id": "co_mp_q17",
          "number": 17,
          "question": "Read and Write Timing Diagram of 8086",
          "marks": 7,
          "answer": "### Introduction / Definition:\n*   A bus cycle defines the timing steps for memory access.\n*   Each read or write cycle consists of four T-states.\n*   The clock determines the transition of address and data signals.\n\n### Diagram:\n```\nCLK  _┌─┐_┌─┐_┌─┐_┌─┐_\nALE  __┌─┐___________\nAD   __Address__Data_\n```\n\n### Key Points / Core Theory:\n*   **State T1** places the physical memory address on the bus.\n*   **State T2** turns the multiplexed bus lines around for reading.\n*   **State T3** performs the actual byte or word transfer steps.\n*   **State T4** disables control signals and ends the bus cycle.\n*   **Wait states** delay operations when slow memory devices are read.\n\n### Simple Real-World Example:\n*   A mail carrier stops, opens the box, and drops letters.\n*   Each action takes a predefined amount of time.\n\n### Advantages / Applications:\n*   Coordinates precise synchronization between the CPU and memory chips.\n*   Allows connecting slow external devices using hardware ready lines.\n*   Prevents data corruption by holding control signals stable during transfers.\n\n### Conclusion:\n*   Timing diagrams define the exact electrical states of bus lines.\n*   They verify that address and data transfers remain stable."
        },
        {
          "id": "co_mp_q18",
          "number": 18,
          "question": "Compare Memory-Mapped I/O and I/O-Mapped I/O",
          "marks": 8,
          "answer": "### Introduction:\n*   Memory-mapped I/O treats hardware ports as normal memory locations.\n*   I/O-mapped I/O uses a separate address space for hardware ports.\n\n### Comparison Table:\n\n| Comparison Point | Memory-Mapped I/O | I/O-Mapped I/O |\n| :--- | :--- | :--- |\n| **1. Address Space** | Shared | Separate |\n| **2. Address Range** | 1 MB | 64 KB |\n| **3. Commands Used** | Any memory command | IN and OUT |\n| **4. Registers Used** | Any register | Accumulator only |\n| **5. Memory Impact** | Reduces RAM space | No impact |\n| **6. Hardware Logic** | Complex decoding | Simple decoding |\n| **7. Transfer Speed** | Faster | Slower |\n| **8. Code Flexibility** | Higher | Lower |"
        },
        {
          "id": "co_mp_q19",
          "number": 19,
          "question": "Calculate Physical Address",
          "marks": 4,
          "answer": "### Introduction / Definition:\n*   The 8086 uses a 20-bit address for physical memory.\n*   Internal registers store segment bases and offsets as 16-bit values.\n*   The CPU shifts segment values to build physical addresses.\n\n### Diagram:\n```\n  (Segment Address x 10H) + Offset = Physical Address\n```\n\n### Key Points / Core Theory:\n*   **Segment address** defines the base of the memory block.\n*   **Offset address** defines the distance from the segment start.\n*   **Left shift** multiplies the segment base by sixteen.\n*   **Physical address** is a twenty bit memory reference value.\n*   **Overlap** occurs when segments start at sixteen byte intervals.\n\n### Simple Real-World Example:\n*   **Given**: CS = 2000H, IP = 1234H.\n*   **Step 1**: Segment x 10H -> 20000H.\n*   **Step 2**: Add Offset -> 20000H + 1234H = 21234H.\n*   **Result**: Physical Address = 21234H.\n\n### Advantages / Applications:\n*   Allows a 16-bit processor to address 1 MB of memory.\n*   Supports relocatable code by changing only segment register values.\n*   Separates code, data, and stack segments for safety.\n\n### Conclusion:\n*   Segmented addressing constructs 20-bit addresses from 16-bit registers.\n*   It provides flexible memory organization for running programs."
        },
        {
          "id": "co_mp_q20",
          "number": 20,
          "question": "Explain Interrupt Handling Mechanism and IVT",
          "marks": 6,
          "answer": "### Introduction / Definition:\n*   An interrupt stops the current program to handle an event.\n*   The CPU runs an Interrupt Service Routine to handle it.\n*   The Interrupt Vector Table stores the addresses of these routines.\n\n### Diagram:\n```\n[Interrupt Trigger] ──► PUSH Flags/CS/IP ──► Load New CS:IP ──► ISR\n```\n\n### Key Points / Core Theory:\n*   **Interrupt table** occupies the first one kilobyte of memory.\n*   **Vector entries** contain segment and offset addresses for ISRs.\n*   **Stack operations** save the return address and flag status.\n*   **Interrupt return** restores saved registers and resumes main code.\n*   **Hardware interrupts** use external CPU pins to trigger routines.\n\n### Simple Real-World Example:\n*   A phone rings while a student is reading a book.\n*   They bookmark the page, answer, and resume reading.\n\n### Advantages / Applications:\n*   Allows the CPU to handle urgent external events immediately.\n*   Prevents wasting CPU cycles on constant device polling.\n*   Handles runtime software errors like division by zero.\n\n### Conclusion:\n*   Interrupts provide a fast method to respond to hardware events.\n*   The vector table coordinates jumping to correct service routines."
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
          "answer": "### Introduction:\n*   Closely coupled systems share a common centralized main memory block.\n*   Loosely coupled systems use distributed memory blocks for each processor.\n\n### Comparison Table:\n\n| Comparison Point | Closely Coupled | Loosely Coupled |\n| :--- | :--- | :--- |\n| **1. Memory Layout** | Shared memory | Distributed memory |\n| **2. Data Transfer** | Shared RAM | Message passing |\n| **3. Operating System** | Single OS | Multiple OS copies |\n| **4. System Scaling** | Lower scaling | Higher scaling |\n| **5. Fault Impact** | High risk | Isolated nodes |\n| **6. Connection Delay** | Lowest delay | Higher delay |\n| **7. Physical Link** | System bus | Communication network |\n| **8. Synchronization** | Shared variables | Software messages |"
        },
        {
          "id": "co_mp_q22",
          "number": 22,
          "question": "Explain SMP Organization",
          "marks": 7,
          "answer": "### Introduction / Definition:\n*   Symmetric Multiprocessing uses two or more identical processors in parallel.\n*   All processors share the same memory and input output devices.\n*   They have equal access rights under a single operating system.\n\n### Diagram:\n```\n  ┌──────┐    ┌──────┐\n  │ CPU1 │    │ CPU2 │\n  └───┬──┘    └───┬──┘\n  ════╧═══════════╧═════ System Bus ◄══► Shared RAM\n```\n\n### Key Points / Core Theory:\n*   **Identical processors** run duplicate tasks in parallel on the bus.\n*   **Shared memory** provides one physical address space for all CPUs.\n*   **Single kernel** manages all tasks and schedules threads dynamically.\n*   **Cache consistency** ensures all private caches hold matching data values.\n*   **Bus snooping** monitors bus transactions to invalidate old cache lines.\n\n### Simple Real-World Example:\n*   Multiple cooks share the same kitchen table and raw ingredients.\n*   They prepare different dishes independently without a master supervisor.\n\n### Advantages / Applications:\n*   Speeds up processor throughput by executing multiple threads simultaneously.\n*   Increases reliability because other CPUs run if one fails.\n*   Dynamically schedules task assignments based on current processor load.\n\n### Conclusion:\n*   SMP organization offers high execution speeds for multi-threaded applications.\n*   It shares memory resources equally to simplify parallel programming."
        },
        {
          "id": "co_mp_q23",
          "number": 23,
          "question": "Explain Flynn's Taxonomy",
          "marks": 7,
          "answer": "### Introduction:\n*   Flynn's Taxonomy classifies computer architectures by instruction and data streams.\n*   It divides computers into SISD, SIMD, MISD, and MIMD classes.\n\n### Comparison Table:\n\n| Comparison Point | SISD | SIMD | MISD | MIMD |\n| :--- | :--- | :--- | :--- | :--- |\n| **1. Instruction Stream** | Single | Single | Multiple | Multiple |\n| **2. Data Stream** | Single | Multiple | Single | Multiple |\n| **3. Control Units** | One CU | One CU | Multiple CUs | Multiple CUs |\n| **4. ALU Count** | One ALU | Multiple ALUs | Multiple ALUs | Multiple ALUs |\n| **5. Execution Mode** | Sequential | Lockstep parallel | Redundant parallel | Independent parallel |\n| **6. Code Complexity** | Lowest | Higher | Higher | Highest |\n| **7. Ideal Task** | Standard software | Vector processing | Fault tolerance | Distributed apps |\n| **8. Device Example** | Old single-core | GPU chips | Flight controllers | Modern multi-core |"
        },
        {
          "id": "co_mp_q24",
          "number": 24,
          "question": "Compare UMA and NUMA Architectures",
          "marks": 8,
          "answer": "### Introduction:\n*   UMA provides uniform memory access delay for all physical addresses.\n*   NUMA access delay depends on the memory block's physical distance.\n\n### Comparison Table:\n\n| Comparison Point | UMA | NUMA |\n| :--- | :--- | :--- |\n| **1. Memory Layout** | Centralized | Distributed |\n| **2. Access Delay** | Uniform | Non-uniform |\n| **3. System Scaling** | Lower | Higher |\n| **4. Interconnection** | System bus | Network routing |\n| **5. Cache Consistency** | Bus snooping | Directory protocols |\n| **6. Controller Design** | Simple | Complex |\n| **7. Memory Bandwidth** | Shared limit | High local bandwidth |\n| **8. Target System** | Small servers | Large supercomputers |"
        },
        {
          "id": "co_mp_q25",
          "number": 25,
          "question": "Compare RISC and CISC Architectures",
          "marks": 7,
          "answer": "### Introduction:\n*   RISC utilizes a reduced set of simple, single-cycle instructions.\n*   CISC utilizes a complex set of multi-cycle instructions in hardware.\n\n### Comparison Table:\n\n| Comparison Point | RISC | CISC |\n| :--- | :--- | :--- |\n| **1. Command Length** | Fixed size | Variable size |\n| **2. Execution Cycle** | Single cycle | Multi-cycle |\n| **3. Register File** | Large file | Small file |\n| **4. Control Design** | Hardwired logic | Microprogrammed ROM |\n| **5. Memory Reference** | Load and store | Direct operations |\n| **6. Pipelining** | Simple | Complex |\n| **7. Compiler Role** | High optimization | Low optimization |\n| **8. Target Chip** | ARM chips | Intel x86 |"
        }
      ]
    }
  ]
};
