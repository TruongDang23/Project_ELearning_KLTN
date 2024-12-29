import { createContext, useState } from 'react'

export const DesignCourseContext = createContext()

export function DesignCourseProvider({ children }) {
  const [completedSections, setCompletedSections] = useState({
    general: false,
    categories: false,
    intendedLearners: false,
    courseStructure: false,
    introduceCourse: false
  })

  const markSectionAsCompleted = (section) => {
    setCompletedSections((prev) => ({ ...prev, [section]: true }))
  }

  return (
    <DesignCourseContext.Provider
      value={{ completedSections, markSectionAsCompleted }}
    >
      {children}
    </DesignCourseContext.Provider>
  )
}
