import axios from 'axios'
import { ApiClient } from './apiClient'
import { CourseClient } from './courseClient'
import { ModelClient } from './modelClient'
import { NotifyClient } from './notifyClient'

export class StudentClient extends ApiClient {
  constructor() {
    super("student")
    this.course = new CourseClient()
    this.model = new ModelClient()
    this.notify = new NotifyClient
  }

  async updateProgress(id, courseID, lectureID, percent) {
    try {
      const response = await axios.post(`${this.domain}/${id}/${courseID}/${lectureID}/updateprogress`, {
        headers: {
          //authentication
        },
        data: percent
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

  async ratingsCourse(id, courseID, star, content) {
    try {
      const response = await axios.post(`${this.domain}/${id}/${courseID}/ratings`, {
        headers: {
          //authentication
        },
        data: {
          star: star,
          content: content
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async buyCourse(id, courseID) {
    try {
      const response = await axios.post(`${this.domain}/${id}/buy/${courseID}`, {
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

  async searchCourse(params) {
    return await this.course.searchCourse(params)
  }

  async chatBot(content) {
    return await this.model.chatBot(content)
  }

  async chatAI(content) {
    return await this.model.chatAI(content)
  }

  async getListNotification(id) {
    return await this.notify.getInformation(id)
  }

  async updateUnreadNotify(id, notifyID) {
    return await this.notify.updateUnreadNotify(id, notifyID)
  }
}