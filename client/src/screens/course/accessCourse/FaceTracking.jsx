import React, { useEffect, useState, useRef } from 'react'
import * as faceapi from 'face-api.js'
import styled from 'styled-components'

const FaceTracking = ({ onFocusChange, isEnabled = true }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isFocused, setIsFocused] = useState(true)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const checkIntervalRef = useRef(null)

  // 1. Load models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models/face' // Đặt folder models trong public/
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        setIsInitialized(true)
      } catch (err) {
        setError('Lỗi khi tải mô hình nhận diện.')
        console.error(err)
      }
    }

    loadModels()
  }, [])

  // 2. Lấy camera
  useEffect(() => {
    if (!isInitialized || !isEnabled) return

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        setError('Không thể truy cập camera.')
        console.error(err)
      }
    }

    startVideo()
  }, [isInitialized, isEnabled])

  // 3. Detect face liên tục
  useEffect(() => {
    if (!videoRef.current || !isInitialized) return

    const detectFace = async () => {
      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas || video.readyState !== 4) return

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight
      }

      faceapi.matchDimensions(canvas, displaySize)

      const detection = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions()
      )

      const resizedDetections = detection
        ? faceapi.resizeResults(detection, displaySize)
        : null

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (resizedDetections) {
        if (resizedDetections && ctx) {
          const { box, score } = resizedDetections

          // Vẽ khung mặt
          ctx.strokeStyle = '#a5d8ff'
          ctx.lineWidth = 5
          ctx.strokeRect(box.x, box.y, box.width, box.height)

          // Hiển thị nhãn với nội dung rõ ràng hơn
          const label = `🖋️Focus: ${(score * 100).toFixed(1)}%`
          ctx.fillStyle = '#a5d8ff'
          ctx.font = '16px Inter'
          ctx.fillText(label, box.x, box.y > 20 ? box.y - 5 : box.y + 15)
        }

        if (!isFocused) {
          setIsFocused(true)
          onFocusChange?.(true)
        }
      } else if (isFocused) {
        setIsFocused(false)
        onFocusChange?.(false)
      }
    }

    checkIntervalRef.current = setInterval(detectFace, 500)

    return () => clearInterval(checkIntervalRef.current)
  }, [isInitialized, isFocused, onFocusChange])

  return (
    <FaceTrackingWrapper>
      <div className="webcam-container">
        <video ref={videoRef} autoPlay playsInline muted />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
      {!isInitialized && (
        <div className="calibration-message">Đang tải mô hình nhận diện...</div>
      )}
      {error && <div className="calibration-message">{error}</div>}
    </FaceTrackingWrapper>
  )
}

const FaceTrackingWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  height: 280px;
  z-index: 9999;
  pointer-events: none;

  .webcam-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #187bce;
    border-radius: 5px;
    overflow: hidden;
    pointer-events: auto;
    background: #000;
  }

  .calibration-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.2rem;
    z-index: 1002;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 80px;
    bottom: 10px;
    left: 10px;

    .webcam-container {
      width: 120px;
      height: 80px;
    }
  }
`

export default FaceTracking
