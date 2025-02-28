import { useState, useEffect } from 'react'
import { admin } from 'api'

const useLevels = () => {
  const [levels, setLevels] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const response = await admin.loadMasterdata()
      setLevels(response.data.levels)
    }

    loadData()
  }, [])

  return levels
}

export default useLevels