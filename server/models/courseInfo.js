import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  courseID: { 
    type: String,
    required: [true, 'Course ID is required']  
  },
  image_introduce: { type: String },

  //Điền thêm các thuộc tính khác nếu cần
  video_introduce: { type: String },
  keywords: [{ type: String }],
  targets: [{ type: String }],
  requirements: [{ type: String }],
  chapters: [
    {
      chapter_name: { type: String },
      lectures: [
        {
          id: { type: Number },
          name: { type: String },
          description: { type: String },
          type: { type: String },
          source: { type: String },
          QnA: [
            {
              questionerID: { type: String },
              question: { type: String },
              date: { type: Date },
              responses: [
                {
                  responseID: { type: String },
                  response: { type: String },
                  date: { type: Date }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

const Course = mongoose.model('course', courseSchema, 'course_structure')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến courseID trong model này thì sẽ gọi bằng: course.courseID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default Course
