import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

function UploadFile({ uniqueId, type, onFileChange }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (onFileChange) {
      onFileChange(selectedFile)
    }
  }, [selectedFile, onFileChange])

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const fileType = file.type.split('/')[0] // Lấy loại tệp (image hoặc video)

      if (fileType === type) {
        setSelectedFile(file)

        if (fileType === 'image') {
          const fileUrl = URL.createObjectURL(file)
          setPreviewUrl(fileUrl)
          setThumbnail(null) // Xóa thumbnail nếu có
        } else if (fileType === 'video') {
          const fileUrl = URL.createObjectURL(file)
          setPreviewUrl(fileUrl)
          generateThumbnail(fileUrl)
        }
      } else {
        alert(`Please upload a ${type} file.`)
        setSelectedFile(null)
        setPreviewUrl(null)
        setThumbnail(null)
      }
    }

    event.target.value = null
  }

  const generateThumbnail = (videoUrl) => {
    const video = document.createElement('video')
    video.src = videoUrl
    video.load()

    video.onloadeddata = () => {
      video.currentTime = 1
    }

    video.onseeked = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      setThumbnail(canvas.toDataURL('image/png'))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedFile) {
      console.log('File to upload:', selectedFile)
      // Thực hiện hành động upload tại đây
    } else {
      alert('Please select a file to upload.')
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setThumbnail(null)
  }

  const truncateFileName = (name, length) => {
    if (name.length > length) {
      return name.substring(0, length) + '...'
    }
    return name
  }

  return (
    <UploadFileWrapper>
      <form onSubmit={handleSubmit} className="upload-form">
        <InputWrapper>
          <input
            type="file"
            id={`file-upload-${uniqueId}`}
            onChange={handleFileChange}
          />
          <label htmlFor={`file-upload-${uniqueId}`}>
            {selectedFile ? (
              truncateFileName(selectedFile.name, 20) // Giới hạn 20 ký tự
            ) : (
              <>
                {'Choose File'}
                <span>
                  <CloudUploadIcon />
                </span>
              </>
            )}
          </label>
        </InputWrapper>
        <button id="btn-secondary" type="submit">
          Upload
        </button>
      </form>

      <div className="upload-detail">
        {selectedFile && (
          <div className="upload-file">
            <h4>File Details:</h4>
            <p>File Name: {selectedFile.name}</p>
            <p>File Type: {selectedFile.type}</p>
            <p>File Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            <button onClick={handleRemoveFile}>Remove File</button>
          </div>
        )}

        {previewUrl && (
          <div className="upload-preview">
            <h4>Preview:</h4>
            {type === 'image' ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: '200px', height: 'auto' }}
              />
            ) : type === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  src={previewUrl}
                  controls
                  style={{ width: '200px', height: 'auto' }}
                />
                {thumbnail && (
                  <div className="video-thumbnail">
                    <h4>Thumbnail:</h4>
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      style={{ width: '200px', height: 'auto' }}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </UploadFileWrapper>
  )
}
const InputWrapper = styled.div`
  margin-left: 20px;
  position: relative;
  display: inline-block;

  input[type='file'] {
    display: none; /* Ẩn input mặc định */
  }

  label {
    padding: 10px 20px;
    color: #187bce;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 700;
    white-space: nowrap; /* Không cho phép xuống dòng */
    overflow: hidden; /* Giới hạn phần tử trong vùng chứa */
    text-overflow: ellipsis; /* Hiển thị dấu ba chấm nếu text bị cắt */
    transition: all 0.3s ease;
    svg {
      font-size: 2rem;
      margin-left: 10px;
    }

    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px dashed #1971c2;
      border-radius: 5px;
      pointer-events: none; /* Đảm bảo không ảnh hưởng tới các sự kiện chuột */
    }

    &:hover {
      scale: 1.05;
      box-shadow: 0 0 0 2px #1971c2;
    }
  }
`

const UploadFileWrapper = styled.div`
  .upload-form {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
    margin-top: 20px;

    input {
      font-size: 1.6rem;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
    }

    button {
      background-color: #6c757d;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 1.6rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: 0.3s all ease;

      span svg {
        font-size: 1.6rem;
      }

      &:hover {
        background-color: #fff;
        color: #6c757d;
        box-shadow: 0 0 0 2px #6c757d;
      }
    }
  }

  .upload-detail {
    display: flex;
    gap: 20px;
    .upload-file {
      width: 50%;
      margin-bottom: 20px;
      p {
        font-size: 1.6rem;
        margin: 5px 0;
      }

      button {
        background-color: #f44336;
        color: white;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.4rem;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #d32f2f;
        }
      }
    }

    .upload-preview {
      width: 50%;
      img {
        border-radius: 5px;
      }
    }
  }
`

export default UploadFile
