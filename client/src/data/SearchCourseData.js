const SearchCourseData = [
  {
    //mysql
    courseID: "C000",
    type_of_course: "Course",
    title: "Introduction to Database",
    method: "Self-directed study",
    language: "English",
    price: 0,
    currency: "USD",
    program: "Knowledge",
    category: "Database", // Thông tin này không cần hiển thị lên website (hidden). Chỉ phục vụ cho việc search
    course_for: "Beginner",
    num_lectures: 10, // Tổng lectures là bao gồm: Video, Quizz, File, Assignment.
    instructor: "Đặng Quang Trường",
    star: 4.5, // Star cắt 0.5 là được nha.
    num_reviews: 100,

    //mongoDB
    image_introduce:
      "https://png.pngtree.com/template/20220421/ourmid/pngtree-data-analysis-isometric-infographics-layout-with-microchip-wireless-modem-sync-of-image_1300762.jpg",
    keywords: ["Database", "SQL", "Beginner"], //FIND
    targets: [
      //Giống Udemy, khi hover vào item khóa học thì sẽ hiển thị kết quả đầu ra của của khóa học đó
      "Understand basic database concepts",
      "Write simple SQL queries",
      "Design a simple database"
    ]
  },
  {
    courseID: "C003",
    type_of_course: "Course",
    title: "Advanced MongoDB",
    method: "Self-directed study",
    language: "English",
    price: 49.99,
    currency: "USD",
    program: "Knowledge",
    category: "Database",
    course_for: "Intermediate",
    num_lectures: 15,
    instructor: "John Doe",
    star: 4.7,
    num_reviews: 150,
    image_introduce:
      "https://pbs.twimg.com/media/GSXtXFZWMAExEow?format=jpg&name=4096x4096",
    keywords: ["Database", "MongoDB", "Intermediate"],
    targets: [
      "Master advanced MongoDB techniques",
      "Optimize database performance",
      "Design complex data models"
    ]
  },
  {
    courseID: "C005",
    type_of_course: "Course",
    title: "Python for Data Science",
    method: "Self-directed study",
    language: "English",
    price: 79.99,
    currency: "USD",
    program: "Knowledge",
    category: "Programming",
    course_for: "All Levels",
    num_lectures: 20,
    instructor: "Jane Smith",
    star: 4.8,
    num_reviews: 200,
    image_introduce:
      "https://pbs.twimg.com/media/GQhQ6_7aQAA5IIp?format=jpg&name=4096x4096",
    keywords: ["Python", "Data Science", "All Levels"],
    targets: [
      "Learn Python from scratch",
      "Analyze data using Python libraries",
      "Build machine learning models"
    ]
  },
  {
    courseID: "C039",
    type_of_course: "Course",
    title: "JavaScript Essentials",
    method: "Self-directed study",
    language: "English",
    price: 29.99,
    currency: "USD",
    program: "Knowledge",
    category: "Programming",
    course_for: "Beginner",
    num_lectures: 12,
    instructor: "Emily Johnson",
    star: 4.6,
    num_reviews: 120,
    image_introduce:
      "https://staticg.sportskeeda.com/editor/2022/12/dd983-16699179979799-1920.jpg",
    keywords: ["JavaScript", "Programming", "Beginner"],
    targets: [
      "Understand JavaScript basics",
      "Write and debug JavaScript code",
      "Create dynamic web pages"
    ]
  }
];

export default SearchCourseData;
