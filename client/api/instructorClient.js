import axios from 'axios'
import { ApiClient } from './apiClient'
import { CourseClient } from './courseClient'
import { ModelClient } from './modelClient'
import { NotifyClient } from './notifyClient'

export class InstructorClient extends ApiClient {
  constructor() {
    super("instructor")
    this.course = new CourseClient()
    this.model = new ModelClient()
    this.notify = new NotifyClient()
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

  async sendApproveCourse(courseID) {
    try {
      const response = await axios.put(`${this.domain}/sendapprove/${courseID}`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async createCourse(data, formData) {
    const res_files = await this.course.uploadFileMedia(formData)
    //Upload file lên GCS thành công
    if (res_files.status === 201)
      //Tạo khóa học
      return this.course.createDataCourse(data)
    //Upload file lên GCS thất bại
    else
      //return lỗi
      return res_files
  }

  async updateCourse(courseID, newdata) {
    return this.course.update(courseID, newdata)
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