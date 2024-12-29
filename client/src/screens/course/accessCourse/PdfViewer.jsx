import { useState } from "react"
import styled from "styled-components"

const PdfViewer = ({ pdfUrl, setProgress }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const handleClick = () => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      percent: 100
    }))
    alert('Done')
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
      <IframeOverlay isVisible={isButtonHovered} />
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