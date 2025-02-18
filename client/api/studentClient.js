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

  async updateAvatar(id, formData) {
    try {
      const response = await axios.put(`${this.domain}/avatar/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async updateProgress(courseID, lectureID, percent) {
    try {
      const response = await axios.post(`${this.domain}/${courseID}/${lectureID}/updateprogress`, {
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

  async QnA(courseID, lectureID, content, url) {
    try {
      const response = await axios.post(`${this.domain}/${courseID}/${lectureID}/QA`, { data: content, url: url })
      return response
    }
    catch (error) {
      return error
    }
  }

  async getQnA(courseID, lectureID) {
    return this.course.getLectureQnA(courseID, lectureID)
  }

  async ratingsCourse(courseID, content) {
    try {
      const response = await axios.post(`${this.domain}/${courseID}/ratings`, {
        data: content
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async buyCourse(courseID) {
    try {
      const response = await axios.post(`${this.domain}/buy/${courseID}`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async payment(courseID, cancel_url, return_url) {
    try {
      const response = await axios.post(`${this.domain}/pay/${courseID}`,
        {
          cancel_url,
          return_url
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