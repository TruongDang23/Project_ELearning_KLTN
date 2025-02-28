import { useState, useEffect } from 'react'
import { admin } from 'api'

const useCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const response = await admin.loadMasterdata()
      setCategories(response.data.categories)
    }

    loadData()
  }, [])

  return categories
}

export default useCategories