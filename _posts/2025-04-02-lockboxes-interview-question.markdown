---
layout: post
title: "LockBoxes Algorithm"
date: 2025-04-02
categories: [technology]
tags: [interview]
header_image: /assets/images/defaultpost.jpg
excerpt: "A brief summary of your post."
---

# 0x01. Lockboxes

## Project Overview

The **Lockboxes** project is an algorithmic challenge that involves determining if all locked boxes can be opened given a set of keys contained in those boxes. Each box is numbered and may contain keys to other boxes, and the goal is to find a solution that efficiently opens all boxes.

## Key Concepts

To successfully complete this project, you will need a solid understanding of the following concepts:

- **Lists and List Manipulation**: Understanding how to work with lists, including accessing elements, iterating, and modifying lists dynamically.
  - [Python Lists (Official Documentation)](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists)

- **Graph Theory Basics**: Knowledge of traversal algorithms such as Depth-First Search (DFS) or Breadth-First Search (BFS) can be helpful as boxes and keys can be modeled as nodes and edges in a graph.
  - [Graph Theory (Khan Academy)](https://www.khanacademy.org/math/discrete-math/graph-theory)

- **Algorithmic Complexity**: Understanding time and space complexity is important for writing efficient algorithms.
  - [Big O Notation (GeeksforGeeks)](https://www.geeksforgeeks.org/analysis-of-algorithms-big-oh-notation/)

- **Recursion**: Some solutions may require a recursive approach to navigate through boxes and keys.
  - [Recursion in Python (Real Python)](https://realpython.com/python-recursion/)

- **Queue and Stack**: Familiarity with queues and stacks is essential for implementing BFS or DFS algorithms.
  - [Python Queue and Stack (GeeksforGeeks)](https://www.geeksforgeeks.org/queue-in-python/)

- **Set Operations**: Using sets to track visited boxes and available keys can optimize the search process.
  - [Python Sets (Official Documentation)](https://docs.python.org/3/tutorial/datastructures.html#sets)

## Requirements

- **General**:
  - Allowed editors: `vi`, `vim`, `emacs`
  - All files will be interpreted/compiled on **Ubuntu 20.04 LTS** using **python3** (version 3.4.3)
  - All files should end with a new line.
  - The first line of all files should be exactly `#!/usr/bin/python3`
  - A `README.md` file is mandatory at the root of the project folder.
  - Code must be documented and adhere to **PEP 8** style (version 1.7.x).
  - All files must be executable.

## Tasks

### 0. Lockboxes (Mandatory)

You have `n` number of locked boxes in front of you. Each box is numbered sequentially from `0` to `n - 1` and may contain keys to other boxes.

**Write a method** that determines if all the boxes can be opened.

**Prototype**: `def canUnlockAll(boxes)`

**Parameters**:
- `boxes`: a list of lists where each list contains keys for the corresponding box.
- A key with the same number as a box opens that box. 
- Assume all keys will be positive integers.
- The first box, `boxes[0]`, is unlocked.

**Returns**:
- `True` if all boxes can be opened, else return `False`.

### Example

```python
#!/usr/bin/python3

canUnlockAll = __import__('0-lockboxes').canUnlockAll

boxes = [[1], [2], [3], [4], []]
print(canUnlockAll(boxes))  # True

boxes = [[1, 4, 6], [2], [0, 4, 1], [5, 6, 2], [3], [4, 1], [6]]
print(canUnlockAll(boxes))  # True

boxes = [[1, 4], [2], [0, 4, 1], [3], [], [4, 1], [5, 6]]
print(canUnlockAll(boxes))  # False
```

Repository

GitHub repository: alx-interview

Directory: 0x01-lockboxes

File: 0-lockboxes.py


Acknowledgments

Copyright © 2024 ALX, All rights reserved.
