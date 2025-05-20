import { useState, useEffect } from "react"
import styled from "styled-components"
import { TextToSpeech } from "tts-react"
import { model } from "api"

const PdfViewer = ({ pdfUrl, setProgress }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isSpeechHovered, setIsSpeechHovered] = useState(false)

  const [text, setText] = useState("")

  const extractPDF = async(url) => {
    const response = await model.extractText(url)
    if (response.status === 200)
      setText(response.data)
  }

  useEffect(() => {
    extractPDF(pdfUrl)
  }, [pdfUrl])

  const handleClick = () => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      percent: 100
    }))
  }
  return (
    <PdfViewerWrapper>
      <iframe src={pdfUrl} width="100%" height="100%" title="pdf"></iframe>
      <CompleteButton
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={handleClick}
      >
        Mark as Done
      </CompleteButton>

      <SpeechWrapper
        onMouseEnter={() => setIsSpeechHovered(true)}
        onMouseLeave={() => setIsSpeechHovered(false)}
      >
        <TextToSpeech key={text} lang="vi-VN">
          <p hidden="true">{text}</p>
        </TextToSpeech>
      </SpeechWrapper>

      <IframeOverlay isVisible={isButtonHovered || isSpeechHovered} />
    </PdfViewerWrapper>
  );
};

const PdfViewerWrapper = styled.div`
  position: relative;
  height: 52rem;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover button {
    display: block;
    opacity: 1;
  }

  iframe {
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease;
  }
`;

const CompleteButton = styled.button`
  display: none;
  position: absolute;
  bottom: 10px;
  right: 20px;
  padding: 10px 20px;
  background-color: #1971c2;
  color: #fff;
  font-size: 1.6rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease, display 0.3s ease;
  z-index: 2;

  &:hover {
    opacity: 0.7;
    background-color: #fff;
    font-weight: bold;
    color: #1971c2;
    outline: none;
    box-shadow: inset 0 0 0 2px #1971c2;
    transition: all 0.3s;
    transform: scale(1.05);
  }
`;

const SpeechWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 15px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;


const IframeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 11, 20, 0.8);
  backdrop-filter: blur(5px);
  pointer-events: none;
  z-index: 1;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default PdfViewer;
