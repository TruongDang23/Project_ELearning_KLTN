import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Circle } from 'lucide-react'
import { globalFlag } from '~/context/GlobalFlag'

// --- Các kiểu ---
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(240, 245, 255, 0.6)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  transition: 'all 0.3s ease',
  pointerEvents: 'all'
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
  transform: 'scale(1)',
  opacity: 1,
  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
};

const innerContentStyle = {
  backgroundColor: 'rgba(252, 253, 255, 0.95)',
  borderRadius: '12px',
  height: '100%',
  overflow: 'hidden',
  position: 'relative'
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
  maxHeight: 'calc(88vh - 95px)',
  overflowY: 'auto',
  fontSize: '18px',
  color: '#2c3e50',
  lineHeight: '1.7'
};

const questionTextStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '25px',
  color: '#34495e',
  textAlign: 'center',
  padding: '0 10px'
};

const answerButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '16px 24px',
  borderRadius: '12px',
  border: '2px solid rgba(100, 150, 255, 0.25)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: '#3498db',
  fontSize: '18px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginBottom: '16px',
  boxShadow: '0 4px 10px rgba(100, 150, 255, 0.1)',
  textAlign: 'left'
};

const correctButtonStyle = {
  backgroundColor: 'rgba(46, 204, 113, 0.2)',
  borderColor: '#2ecc71',
  color: '#2ecc71',
  boxShadow: '0 6px 15px rgba(46, 204, 113, 0.2)'
};

const incorrectButtonStyle = {
  backgroundColor: 'rgba(231, 76, 60, 0.2)',
  borderColor: '#e74c3c',
  color: '#e74c3c',
  boxShadow: '0 6px 15px rgba(231, 76, 60, 0.2)'
};

const answerTextStyles = {
  marginLeft: '12px'
};

// --- Các thành phần hỗ trợ ---

const GlowBorder = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '20px',
    padding: '6px',
    background: 'linear-gradient(45deg, #FF416C, #FF4B2B, #2196f3, #00c6ff, #0072ff, #00c853, #6200ea)',
    backgroundSize: '400% 400%',
    animation: 'gradientFlow 8s ease infinite',
    zIndex: -1,
    boxShadow: '0 0 20px rgba(120, 150, 255, 0.5), inset 0 0 10px rgba(120, 80, 255, 0.2)'
  }} />
);

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

const InteractiveQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState()
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)

  const interactQuestions = globalFlag((state) => state.interactQuestions)
  const openPopup = globalFlag((state) => state.openInteractiveVideo)
  const setOpenPopup = globalFlag((state) => state.setOpenInteractiveVideo)

  if (!openPopup)
    return null

  const handleAnswerSelection = (answerId) => {
    if (hasAnswered) return // Ngăn chọn nhiều lần

    setSelectedAnswer(answerId)
    const correct = interactQuestions.answers.find((ans) => ans._id === answerId)?.is_correct
    setIsAnswerCorrect(correct ?? false)
    setHasAnswered(true)
    if (correct) {
      setTimeout(() => {
        setOpenPopup(false)
      }, 2000)
    }
  };

  const getAnswerIcon = (answerId) => {
    if (selectedAnswer === null) {
      return <Circle className="w-6 h-6 text-gray-400" />
    }

    if (selectedAnswer === answerId) {
      return isAnswerCorrect ? (
        <CheckCircle className="w-6 h-6 text-green-500" />
      ) : (
        <XCircle className="w-6 h-6 text-red-500" />
      );
    }

    // Hiển thị dấu kiểm cho đáp án đúng ngay cả khi không được chọn.
    if (hasAnswered && interactQuestions.answers.find(a => a.id === answerId)?.is_correct) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    return <Circle className="w-6 h-6 text-gray-400" />;
  };

  const getAnswerButtonStyle = (answerId) => {
    if (selectedAnswer === null) {
      return answerButtonStyle;
    }

    if (selectedAnswer === answerId) {
      return isAnswerCorrect
        ? { ...answerButtonStyle, ...correctButtonStyle }
        : { ...answerButtonStyle, ...incorrectButtonStyle }
    }

    return answerButtonStyle
  }

  const resetQuiz = () => {
    setSelectedAnswer(null)
    setIsAnswerCorrect(null)
    setHasAnswered(false)
  }

  return (
    <div style={modalOverlayStyle} className="modal-overlay">
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <GlowBorder />
        <div style={innerContentStyle}>
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
                            Question
            </h2>
          </div>
          <div style={contentStyle} className="content-area">
            <p style={questionTextStyle}>{interactQuestions.question}</p>
            <div className="space-y-4">
              {interactQuestions.answers.map((answer) => {
                const buttonStyle = getAnswerButtonStyle(answer._id);
                return (
                  <motion.button
                    key={answer.id}
                    style={buttonStyle}
                    onClick={() => handleAnswerSelection(answer._id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={hasAnswered}
                    className={`transition-all duration-300 ${hasAnswered ? 'pointer-events-none' : ''}`}
                  >
                    {getAnswerIcon(answer._id)}
                    <span style={answerTextStyles}>{answer.answer}</span>
                  </motion.button>
                );
              })}
            </div>
            {hasAnswered && (
              <div className="mt-6 text-center">
                {!isAnswerCorrect && (
                  <button
                    onClick={resetQuiz}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor: '#3b82f6', // Màu xanh dương
                      '&:hover': {
                        backgroundColor: '#2563eb' // Màu xanh dương đậm hơn khi hover
                      },
                      color: '#ffffff', // Màu trắng
                      fontWeight: '600', // Đậm
                      padding: '0.5rem 1.5rem', // padding ngang dọc
                      borderRadius: '9999px', // bo tròn tối đa
                      transition: 'background-color 0.3s ease', // transition
                      marginTop: '1rem'
                    }}
                  >
                                        Try Again
                  </button>
                )}
              </div>
            )}
          </div>
          <TechDecoration />
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuestion;

