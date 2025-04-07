---
layout: project
title: "Simple Shell"
date: 2023-05-20
technologies: [C]
github_link: https://github.com/Nadira3/simple_shell
header_image: /assets/images/shell.webp
excerpt: "A brief description of your project."
---
# Simple Shell

**A UNIX Command Interpreter in C**

---

## Overview

Simple Shell is a custom UNIX command interpreter written in C. This project was developed as a personal challenge to deepen my understanding of system programming concepts including process creation, command parsing, and environment manipulation. The shell replicates core functionalities of popular UNIX shells by handling user input, executing commands, and providing several built-in features.

---

## Features

### Core Functionality
- **Prompt & Input Handling:**  
  - Displays a custom prompt and waits for user input.
  - Supports reading command lines (ending with a new line) interactively and via file input (non-interactive mode).
  
- **Command Parsing & Execution:**  
  - Implements a custom `getline` function using buffered input with static variables, minimizing system calls.
  - Tokenizes input without using `strtok`, ensuring flexibility and control.
  - Handles command lines with arguments and supports the PATH environment variable for command lookup.
  - Executes commands using the `execve` system call; `fork` is only invoked if the command exists.

### Built-in Commands
- **`exit`**  
  - Terminates the shell.  
  - Supports both no-argument usage and an optional numeric argument to set the exit status.
  
- **`env`**  
  - Displays the current environment variables.

- **`cd`**  
  - Changes the current working directory.

- **`setenv` & `unsetenv`**  
  - `setenv VARIABLE VALUE`: Creates or updates an environment variable.
  - `unsetenv VARIABLE`: Removes an environment variable.
  - Both commands include error handling, with error messages printed to stderr upon failure.

- **`alias`**  
  - Implements command aliasing for ease of use.

### Advanced Shell Features
- **Command Separators & Logical Operators:**  
  - Handles command separators (e.g., `;`) to execute multiple commands sequentially.
  - Supports logical operators (`&&` and `||`) to allow conditional command execution.

- **Variable Replacement:**  
  - Replaces shell variables with their corresponding values before execution.

- **Comment Handling:**  
  - Ignores any text following a `#` symbol, allowing for inline comments.

- **File Input Mode:**  
  - Accepts a file as a command line argument, executing each line as a command.

---

## Technical Details

- **Error Handling:**  
  - Provides clear error messages when commands are not found or when execution fails.
  - Gracefully handles EOF (Ctrl+D) to exit the shell without causing crashes.

- **Memory Management:**  
  - Carefully manages dynamic memory allocation and deallocation to avoid memory leaks.

- **Coding Standards:**  
  - All source code adheres to strict style guidelines (Betty style).
  - Compiled using GCC with the following flags:
    ```bash
    gcc -Wall -Werror -Wextra -pedantic -std=gnu89 *.c -o hsh
    ```

---

## Repository Structure

```
simple_shell/
├── .gitignore           # Specifies files and directories to ignore
├── AUTHORS              # Lists the contributors
├── README.md            # This documentation file
├── execute.c            # Contains the command execution logic
├── exit_test            # Test file for exit functionality
├── hsh                  # Compiled shell executable
├── interpret.c          # Main interpreter functions
├── main.h               # Header file with function prototypes and macros
├── more_strings.c       # Additional string manipulation functions
├── parse.c              # Input parsing and tokenization
├── putchar.c            # Basic output functions
├── shell.c              # Core shell loop and logic
├── strings.c            # Custom string handling routines
└── words.c              # Functions to split input into words/tokens
```

---

## Usage

### Compilation

To compile the shell, navigate to the project directory and run:

```bash
gcc -Wall -Werror -Wextra -pedantic -std=gnu89 *.c -o hsh
```

### Running the Shell

#### Interactive Mode

Start the shell and enter commands at the prompt:

```bash
$ ./hsh
($) /bin/ls
main.c  shell.c  hsh  README.md
($) exit
$
```

#### Non-Interactive Mode

Pipe commands from a file or echo command into the shell:

```bash
$ echo "/bin/ls" | ./hsh
main.c  shell.c  hsh  README.md
$
```

Or execute a file containing commands:

```bash
$ cat commands.txt
/bin/ls
$ cat commands.txt | ./hsh
main.c  shell.c  hsh  README.md
$
```

---

## Learning Outcomes

Working on Simple Shell has strengthened my understanding of:
- UNIX process management, including `fork`, `execve`, and `wait`.
- Low-level I/O operations and buffering techniques.
- Environment variable manipulation and custom command parsing.
- Implementing advanced shell features such as command separators, logical operators, and aliasing.
- Writing clean, maintainable code under strict coding standards.

---

## Final Thoughts

Developing this shell has been an enriching experience that pushed me to master core concepts of systems programming and sharpen my problem-solving skills. The project serves as a testament to my proficiency in C and my dedication to producing robust, high-quality software.

---
