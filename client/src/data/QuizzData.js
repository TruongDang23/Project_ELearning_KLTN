const QuizzData = {
  name: "Quizz about Introduction",
  description: "Test your knowledge",
  type: "quizz",
  passpoint: 5,
  during_time: 1,
  title: "Introduction to Database",
  questions: [
    {
      questionID: 1,
      question: "What is a database?",
      answers: [
        "A collection of data",
        "A collection of tables",
        "A collection of files"
      ],
      key: 0
    },
    {
      questionID: 2,
      question: "What is a DBMS?",
      answers: [
        "Database Management System",
        "Database Management Software",
        "Database Management Server"
      ],
      key: 0
    },
    {
      // questionID: 3,
      question: "What is the purpose of a DBMS?",
      answers: [
        "To manage databases",
        "To create databases",
        "To delete databases"
      ],
      key: 0
    },
    {
      // questionID: 4,
      question: "What is the difference between a database and a spreadsheet?",
      answers: [
        "A database can handle more complex queries and is more scalable.",
        "A spreadsheet can handle more complex queries and is more scalable.",
        "A database can handle more complex queries and is less scalable."
      ],
      key: 0
    },
    {
      // questionID: 5,
      question: "What is SQL?",
      answers: [
        "Structured Query Language",
        "Standard Query Language",
        "System Query Language"
      ],
      key: 0
    },
    {
      // questionID: 6,
      question: "What is a primary key?",
      answers: [
        "A unique identifier for a record in a table",
        "A foreign key in a table",
        "A unique identifier for a database"
      ],
      key: 0
    },
    {
      // questionID: 7,
      question: "What is a foreign key?",
      answers: [
        "A field in one table that uniquely identifies a row in another table",
        "A unique identifier for a record in a table",
        "A field in one table that uniquely identifies a database"
      ],
      key: 0
    },
    {
      // questionID: 8,
      question: "What is a SQL JOIN?",
      answers: [
        "A SQL operation to combine rows from two or more tables",
        "A SQL operation to delete rows from a table",
        "A SQL operation to create a new table"
      ],
      key: 0
    },
    {
      // questionID: 9,
      question: "What does ACID stand for in databases?",
      answers: [
        "Atomicity, Consistency, Isolation, Durability",
        "Atomicity, Concurrency, Isolation, Durability",
        "Atomicity, Consistency, Integrity, Durability"
      ],
      key: 0
    },
    {
      // questionID: 10,
      question: "What is normalization in databases?",
      answers: [
        "The process of organizing data to reduce redundancy",
        "The process of combining tables",
        "The process of deleting tables"
      ],
      key: 0
    }
  ]
};

export default QuizzData;
