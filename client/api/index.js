import { StudentClient } from './studentClient'
import { AdminClient } from './adminClient'
import { InstructorClient } from './instructorClient'
import { AnonymousClient } from './anonymousClient'
import { CourseClient } from './courseClient'
import { NotifyClient } from './notifyClient'
import { ModelClient } from './modelClient'
import { socket } from './socketClient'

const student = new StudentClient()
const admin = new AdminClient()
const instructor = new InstructorClient()
const anonymous = new AnonymousClient()
const course = new CourseClient()
const notify = new NotifyClient()
const model = new ModelClient()

export { student, admin, instructor, anonymous, course, notify, model, socket }