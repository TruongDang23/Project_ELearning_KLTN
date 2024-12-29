import styled, { keyframes } from "styled-components";

function StartScreen({ numberOfQuestions, passpoint, during_time, dispatch }) {
  const percentage = Math.round((passpoint / numberOfQuestions) * 100);
  return (
    <StartScreenWrapper>
      <h3>Instructions:</h3>
      <ul>
        <li>There are {numberOfQuestions} questions in total.</li>
        <li>You need to do at least {percentage}% to pass.</li>
        <li>You have {during_time} minutes to answer all questions.</li>
      </ul>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start
      </button>
    </StartScreenWrapper>
  );
}

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const StartScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.4rem;
  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 2.4rem;
    text-align: center;
  }
  ul {
    list-style: none;
    max-width: 600px;
    text-align: center;
    margin: 0 auto;
    li {
      font-size: 1.6rem;
      margin-bottom: 1.3rem;
    }
  }

  .btn {
    padding: 1rem 2rem;
    margin: 2rem 20rem;
    font-size: 2rem;
    color: #fff;
    border: 2px solid #fff;
    background-color: #495057;
    cursor: pointer;
    border-radius: 100px;
    transition: all 0.3s ease-in-out;
    animation: ${pulse} 2s infinite;
    &:hover {
      background-color: #6c757d;
      border-color: #6c757d;
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.95);
    }
  }
`;

export default StartScreen;
