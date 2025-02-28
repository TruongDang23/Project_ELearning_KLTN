import { useState, useEffect } from 'react'
import { admin } from 'api'
const useLanguages = () => {
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const response = await admin.loadMasterdata()
      setLanguages(response.data.languages)
    }

    loadData()
  }, [])

  return languages
}

export default useLanguages