import { useEffect, useState } from 'react'
import { globalFlag } from '~/context/GlobalFlag'

const SummaryLecture = ({ isOpen }) => {
  const text = globalFlag((state) => state.summaryText)
  const [animate, setAnimate] = useState(false);
  const openPopup = globalFlag((state) => state.setOpenPopupSummary)
  const [htmlContent, setHtmlContent] = useState("")
  const onClose = () => {
    openPopup()
  }

  console.log('summary', text)
  const regexHTML = (html) => {
    const bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i
    const match = html.match(bodyRegex)
    if (match && match[1]) {
      return match[1].trim()
    }
    return null
  }

  useEffect(() => {
    console.log('open popup')
    if (isOpen) {
      setHtmlContent(regexHTML(text))
      // Trigger animation after component mounts
      setTimeout(() => setAnimate(true), 100);
    } else {
      setAnimate(false);
    }
  }, []);

  if (!isOpen) return null;

  // Colorful gradient border for light mode
  const glowBorder = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '20px',
    padding: '6px', // Thicker border
    background: 'linear-gradient(45deg, #FF416C, #FF4B2B, #2196f3, #00c6ff, #0072ff, #00c853, #6200ea)',
    backgroundSize: '400% 400%',
    animation: 'gradientFlow 8s ease infinite',
    zIndex: -1,
    boxShadow: '0 0 20px rgba(120, 150, 255, 0.5), inset 0 0 10px rgba(120, 80, 255, 0.2)'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(240, 245, 255, 0.6)', // Lighter background
    backdropFilter: 'blur(8px)', // Reduced blur effect (from 12px to 8px)
    WebkitBackdropFilter: 'blur(8px)', // For Safari
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    pointerEvents: 'all' // Ensures clicks on the overlay are captured
  };

  const modalContentStyle = {
    position: 'relative',
    backgroundColor: 'rgba(250, 252, 255, 0.9)',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(100, 150, 255, 0.25), 0 8px 20px rgba(100, 150, 255, 0.15), 0 0 0 1px rgba(100, 150, 255, 0.1)',
    width: '850px',
    maxWidth: '92%',
    maxHeight: '88vh',
    overflow: 'hidden',
    zIndex: 1001,
    transform: animate ? 'scale(1)' : 'scale(0.9)',
    opacity: animate ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
  };

  const innerContentStyle = {
    backgroundColor: 'rgba(252, 253, 255, 0.95)',
    borderRadius: '12px',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '18px',
    right: '18px',
    background: 'rgba(100, 150, 255, 0.15)',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    color: '#3c78d8',
    zIndex: 1003,
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px rgba(120, 180, 255, 0.2)'
  };

  const headerStyle = {
    padding: '25px 30px',
    background: 'linear-gradient(to right, rgba(240, 245, 255, 0.95), rgba(230, 240, 255, 0.95))',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderBottom: '2px solid rgba(100, 150, 255, 0.25)',
    position: 'relative',
    textAlign: 'center'
  };

  const contentStyle = {
    padding: '30px 35px',
    maxHeight: 'calc(88vh - 95px)', // Account for header
    overflowY: 'auto',
    fontSize: '18px', // Larger font size
    color: '#2c3e50', // Dark blue-gray text for better readability in light mode
    lineHeight: '1.7'
  };

  // Override styles for the HTML content in light mode
  const contentOverrides = `
    .summary-content h1 {
      font-size: 32px !important;
      color: #3c78d8 !important;
      margin-bottom: 24px !important;
      text-align: center !important;
      font-weight: 600 !important;
      letter-spacing: 0.5px !important;
      text-shadow: 0 0 15px rgba(80, 120, 255, 0.15) !important;
    }
    
    .summary-content h2 {
      font-size: 26px !important;
      border-bottom: 2px solid rgba(100, 150, 255, 0.3) !important;
      padding-bottom: 10px !important;
      margin-top: 30px !important;
      margin-bottom: 20px !important;
      font-weight: 500 !important;
      background: linear-gradient(45deg, #0072ff, #2196f3) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
    }
    
    .summary-content ul {
      padding-left: 35px !important;
      margin-bottom: 25px !important;
    }
    
    .summary-content li {
      margin-bottom: 12px !important;
      font-size: 18px !important;
      position: relative !important;
      list-style-type: none !important;
      padding-left: 8px !important;
      color: #34495e !important;
    }
    
    .summary-content li:before {
      content: '→' !important;
      position: absolute !important;
      left: -25px !important;
      color: #3c78d8 !important;
      font-weight: bold !important;
    }
    
    .summary-content li:hover {
      transform: translateX(5px) !important;
      transition: transform 0.3s ease !important;
      color: #1a5fb4 !important;
    }
    
    /* Custom scrollbar - light version */
    .content-area::-webkit-scrollbar {
      width: 10px;
      background-color: rgba(240, 245, 255, 0.6);
      border-radius: 5px;
    }
    
    .content-area::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #3c78d8, #0072ff);
      border-radius: 5px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }
    
    .content-area::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #0072ff, #6200ea);
    }
    
    /* Animations */
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(100, 150, 255, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(100, 150, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(100, 150, 255, 0); }
    }
    
    @keyframes floatAnimation {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    .title-glow {
      animation: pulse 2s infinite;
    }
    
    .floating-icon {
      animation: floatAnimation 3s ease-in-out infinite;
    }
    
    /* Added backdrop animation */
    @keyframes backdropFadeIn {
      from { background-color: rgba(240, 245, 255, 0); backdrop-filter: blur(0px); }
      to { background-color: rgba(240, 245, 255, 0.6); backdrop-filter: blur(8px); }
    }
    
    .modal-overlay {
      animation: backdropFadeIn 0.3s ease forwards;
    }
  `;

  // Create a decorative tech element for futuristic feel - light version
  const TechDecoration = () => (
    <div className="floating-icon" style={{
      position: 'absolute',
      bottom: '25px',
      right: '25px',
      width: '60px',
      height: '60px',
      opacity: 0.6,
      zIndex: 1002,
      pointerEvents: 'none'
    }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(60, 120, 216, 0.7)" strokeWidth="2" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(60, 120, 216, 0.4)" strokeWidth="1" strokeDasharray="8 4" />
        <path d="M50,20 L50,80" stroke="rgba(60, 120, 216, 0.6)" strokeWidth="1" />
        <path d="M20,50 L80,50" stroke="rgba(60, 120, 216, 0.6)" strokeWidth="1" />
        <circle cx="50" cy="50" r="5" fill="rgba(60, 120, 216, 0.8)" />
      </svg>
    </div>
  );

  // Function to handle overlay click - prevent propagation to modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div style={modalOverlayStyle} className="modal-overlay" onClick={handleOverlayClick}>
      <style>{contentOverrides}</style>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={glowBorder}></div>
        <div style={innerContentStyle}>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(100, 150, 255, 0.25)';
              e.target.style.transform = 'rotate(90deg)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(100, 150, 255, 0.15)';
              e.target.style.transform = 'rotate(0deg)';
            }}
          >
            ×
          </button>
          <div style={headerStyle}>
            <h2 className="title-glow" style={{
              margin: 0,
              fontSize: '28px',
              background: 'linear-gradient(45deg, #0072ff, #3c78d8, #8e2de2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 15px rgba(100, 150, 255, 0.3)',
              fontWeight: '600',
              display: 'inline-block'
            }}>
                    Nội dung được tạo bởi AI
            </h2>
          </div>
          <div style={contentStyle} className="content-area">
            <div className="summary-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
          <TechDecoration />
        </div>
      </div>
    </div>
  );
};

export default SummaryLecture;