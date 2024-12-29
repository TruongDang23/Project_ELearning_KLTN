const CourseData = {
  //mysql
  courseID: 'C999', //Tự động sinh ID
  type_of_course: "Course", // Course | Quizz (Chưa phảt triển hình thức này)
  title: "Introduction to Database",
  method: "Self-directed study", // Self-directed study | Supervised by AI camera (Chưa phát triển hình thức này)
  language: "English", // Ngôn ngữ giảng dạy
  price: 0, // Decimal 0.00
  currency: "USD",
  program: "Knowledge", // Knowledge | Certificate | Degree
  category: "Database", // Database | Web development | Machine Learning
  course_for: "Beginner", // Beginner | Master | Middle
  status: "created", // Các khóa học đang khởi tạo sẽ mặc định là created
  num_lecture: 10, // num_lecture sẽ tự động tính toán khi gv tạo các lectures
  userID: 'I000', // ID của gv tạo khóa học này

  //mongoDB
  // Phải có: courseID: 'C999',
  image_introduce: 'image link', // Khi người dùng upload file thì hệ thống tự động up lên ggcloud và lấy link về
  video_introduce: 'video link', // Khi người dùng upload file thì hệ thống tự động up lên ggcloud và lấy link về
  keywords: ["Database", "SQL", "Beginner"],
  targets: [
    "Understand basic database concepts",
    "Write simple SQL queries",
    "Design a simple database"
  ],
  requirements: [
    "Basic understanding of computer science",
    "No prior knowledge of databases is required"
  ],
  chapters: [
    {
      chapter_name: "Introduction",
      lectures: [
        {
          id: 1, //id tự động tăng dần từ 1 --> n xuyên suốt khóa học này
          name: "What is a Database?",
          description: "Overview of databases",
          type: "video",
          source: "https://example.com/lecture1.mp4", // Khi người dùng upload file thì hệ thống tự động up lên ggcloud và lấy link về
          QnA: []
        },
        {
          id: 2,
          name: "Database Management Systems",
          description: "Introduction to DBMS",
          type: "file",
          source: "https://example.com/lecture2.pdf",
          QnA: []
        }
      ]
    },
    {
      chapter_name: "SQL",
      lectures: [
        {
          id: 3,
          name: "Introduction to SQL",
          description: "Overview of SQL",
          type: "video",
          source: "https://example.com/lecture3.mp4",
          QnA: []
        },
        {
          id: 4,
          name: "Basic SQL Queries",
          description: "Introduction to SQL queries",
          type: "file",
          source: "https://example.com/lecture4.pdf",
          QnA: []
        }
      ]
    },
    {
      chapter_name: "Database Design",
      lectures: [
        {
          id: 5,
          name: "Database Normalization",
          description: "Introduction to database normalization",
          type: "video",
          source: "https://example.com/lecture5.mp4",
          QnA: []
        },
        {
          id: 6,
          name: "Entity-Relationship Diagrams",
          description: "Introduction to ER diagrams",
          type: "file",
          source: "https://example.com/lecture6.pdf",
          QnA: []
        },
        {
          id: 7,
          name: "Database Design Project",
          description: "Design a simple database",
          type: "assignment",
          source: "https://example.com/project.pdf",
          QnA: []
        }
      ]
    }
  ]
}

export default CourseData