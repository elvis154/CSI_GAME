const questions = [
  {
    question: "Create a table named 'students'.",
    correctAnswer: ["CREATE", "TABLE", "students", ";"],
    extraWords: ["ALTER", "DROP", "DELETE", "RENAME"],
    incompleteQuery: ["CREATE", "TABLE", "_____", ";"], // Missing one word
  },
  {
    question: "Select all records from the 'users' table.",
    correctAnswer: ["SELECT", "*", "FROM", "users", ";"],
    extraWords: ["INSERT", "DELETE", "UPDATE", "TABLE"],
    incompleteQuery: ["SELECT", "*", "FROM", "_____", ";"], // Missing one word
  },
  {
    question: "Insert a new record into the 'customers' table.",
    correctAnswer: ["INSERT", "INTO", "customers", "VALUES", "(", ")", ";"],
    extraWords: ["SELECT", "UPDATE", "DROP", "ALTER"],
    incompleteQuery: ["INSERT", "_____", "customers", "_____", "(", ")", ";"], // Missing two words
  },
  {
    question: "Delete all data from the 'orders' table.",
    correctAnswer: ["DELETE", "FROM", "orders", ";"],
    extraWords: ["DROP", "UPDATE", "ALTER", "RENAME"],
    incompleteQuery: ["DELETE", "_____", "orders", ";"], // Missing one word
  },
  {
    question: "Change the name of 'employees' table to 'staff'.",
    correctAnswer: ["ALTER", "TABLE", "employees", "RENAME", "TO", "staff", ";"],
    extraWords: ["DELETE", "UPDATE", "DROP", "CREATE"],
    incompleteQuery: ["ALTER", "TABLE", "_____", "RENAME", "TO", "_____", ";"], // Missing two words
  },
  {
    question: "Add a column 'email' to the 'users' table.",
    correctAnswer: ["ALTER", "TABLE", "users", "ADD", "email", "VARCHAR(100)", ";"],
    extraWords: ["SELECT", "DROP", "DELETE", "RENAME"],
    incompleteQuery: ["ALTER", "TABLE", "_____", "ADD", "email", "VARCHAR(100)", ";"], // Missing one word
  },
  {
    question: "Find the total number of records in 'orders' table.",
    correctAnswer: ["SELECT", "COUNT", "(", "*", ")", "FROM", "orders", ";"],
    extraWords: ["DELETE", "UPDATE", "DROP", "ALTER"],
    incompleteQuery: ["SELECT", "COUNT", "(", "*", ")", "FROM", "_____", ";"], // Missing one word
  },
  {
    question: "Retrieve the names of all students from 'students' table.",
    correctAnswer: ["SELECT", "name", "FROM", "students", ";"],
    extraWords: ["INSERT", "DELETE", "DROP", "ALTER"],
    incompleteQuery: ["SELECT", "name", "FROM", "_____", ";"], // Missing one word
  },
  {
    question: "Remove the 'temp_data' table from the database.",
    correctAnswer: ["DROP", "TABLE", "temp_data", ";"],
    extraWords: ["DELETE", "UPDATE", "ALTER", "RENAME"],
    incompleteQuery: ["DROP", "TABLE", "_____", ";"], // Missing one word
  },
  {
    question: "Update the age of all employees to 30.",
    correctAnswer: ["UPDATE", "employees", "SET", "age", "=", "30", ";"],
    extraWords: ["DROP", "ALTER", "TABLE", "RENAME"],
    incompleteQuery: ["UPDATE", "_____", "SET", "age", "=", "_____", ";"], // Missing two words
  },
];

export default questions;
