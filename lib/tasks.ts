export interface Test {
  input: string;
  expectedOutput: string;
  type: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  tests: Test[];
}

export const tasks: Task[] = [
  {
    id: "task1",
    title: "Hello World",
    description: "Write a Python program that prints 'Hello, World!' to the console.",
    starterCode: "",
    tests: [
      {
        input: "",
        expectedOutput: "Hello, World!",
        type: "output"
      }
    ]
  },
  {
    id: "task2",
    title: "Add Two Numbers",
    description: "Create a function called `add_numbers` that takes two parameters and returns their sum.",
    starterCode: "def add_numbers(a, b):\n    # Your code here\n    pass",
    tests: [
      {
        input: "add_numbers(2, 3)",
        expectedOutput: "5",
        type: "return"
      },
      {
        input: "add_numbers(-1, 1)",
        expectedOutput: "0",
        type: "return"
      },
      {
        input: "add_numbers(0, 0)",
        expectedOutput: "0",
        type: "return"
      }
    ]
  },
  {
    id: "task3",
    title: "Sum of List",
    description: "Write a function called `sum_list` that takes a list of numbers and returns their total sum.",
    starterCode: "def sum_list(nums):\n    # Your code here\n    pass",
    tests: [
      {
        input: "sum_list([1, 2, 3, 4, 5])",
        expectedOutput: "15",
        type: "return"
      },
      {
        input: "sum_list([])",
        expectedOutput: "0",
        type: "return"
      },
      {
        input: "sum_list([10])",
        expectedOutput: "10",
        type: "return"
      }
    ]
  }
];