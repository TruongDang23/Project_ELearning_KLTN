import axios from 'axios'
import { ApiClient } from './apiClient'
import { CourseClient } from './courseClient'
import { ModelClient } from './modelClient'
import { InstructorClient } from './instructorClient'
import { StudentClient } from './studentClient'

export class AdminClient extends ApiClient {
  constructor() {
    super("admin")
    this.course = new CourseClient()
    this.model = new ModelClient()
    this.instructor = new InstructorClient()
    this.student = new StudentClient()
  }

  async acceptCourse(id) {
    try {
      const response = await axios.put(`${this.domain}/accept/${id}`, {
        headers: {
          //authentication
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async rejectCourse(id) {
    try {
      const response = await axios.put(`${this.domain}/reject/${id}`, {
        headers: {
          //authentication
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async terminateCourse(id) {
    try {
      const response = await axios.put(`${this.domain}/terminate/${id}`, {
        headers: {
          //authentication
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async QnA(id, courseID, lectureID, content) {
    try {
      const response = await axios.post(`${this.domain}/${id}/${courseID}/${lectureID}/QA`, {
        headers: {
          //authentication
        },
        data: content
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async lockAccount(id) { 
    try {
      const response = await axios.put(`${this.domain}/locked/${id}`, {
        headers: {
          //authentication
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }
  async getCourseSummary(id) {
    return await this.course.loadSumaryInformation(id)
  }

  async getCourseDetails(id) {
    return await this.course.getInformation(id)
  }

  async loadListCourse() {
    return await this.course.getListInformation()
  }

  async loadListInstructor() {
    return await this.instructor.getListInformation()
  }

  async loadListStudent() {
    return await this.student.getListInformation()
  }

  async searchCourse(params) {
    return await this.course.searchCourse(params)
  }

  async chatBot(content) {
    return await this.model.chatBot(content)
  }

  async chatAI(content) {
    return await this.model.chatAI(content)
  }
}