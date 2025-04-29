import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Snackbar } from '~/components/general'
import EmbeddingTable from './embedding/EmbeddingTable'
import { VoucherDashboardWrapper } from '../voucher/VoucherStyles'
import { admin } from 'api'
import { useRef } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'

function EmbeddedDashboard() {
  const [isloading, setIsLoading] = useState(false)
  const [datas, setData] = useState([])
  const [openSuccess, setOpenSuccess] = useState({ status: false, message: '' })
  const [openError, setOpenError] = useState({ status: false, message: '' })
  const fileInputRef = useRef(null)

  const fetchData = async () => {
    const response = await admin.getListEmbeddedCourse()
    if (response.status === 200) {
      setData(response.data)
    } else {
      setOpenError({ status: true, message: 'Failed to fetch data' })
      setTimeout(() => {
        setOpenError({ status: false, message: '' })
      }, 3000)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEmbedded = async() => {
    setIsLoading(true)
    const response = await admin.embedded()
    if (response.status === 200) {
      setOpenSuccess({ status: true, message: 'Embedded course successfully' })
      setIsLoading(false)
      fetchData()
      setTimeout(() => {
        setOpenSuccess({ status: false, message: '' })
      }, 3000)
    } else {
      setOpenError({ status: true, message: 'Failed to embedded course' })
      setIsLoading(false)
      setTimeout(() => {
        setOpenError({ status: false, message: '' })
      }, 3000)
    }
  }

  const handleFileChange = async(event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const response = await admin.addFileEmbedded(formData)
      if (response.status === 201) {
        setOpenSuccess({ status: true, message: 'Add file successfully' })
        fetchData()
        setTimeout(() => {
          setOpenSuccess({ status: false, message: '' })
        }, 3000)
      } else {
        setOpenError({ status: true, message: 'Failed to add course knowledge' })
        setIsLoading(false)
        setTimeout(() => {
          setOpenError({ status: false, message: '' })
        }, 3000)
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <VoucherDashboardWrapper>
      <h3>Courses Embedding</h3>

      <div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button
          startIcon={<UploadFileIcon />}
          variant="contained"
          onClick={handleButtonClick}
          style={{ marginBottom: '2rem', backgroundColor: 'rgb(52, 71, 103)' }}
        >
        Add File
        </Button>
      </div>
      <EmbeddingTable
        onEmbedded={handleEmbedded}
        isLoading={isloading}
        datas={datas}
      />

      {openSuccess.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="success"
          message={openSuccess.message}
        />
      )}
      {openError.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="error"
          message={openError.message}
        />
      )}
    </VoucherDashboardWrapper>
  )
}

export default EmbeddedDashboard
