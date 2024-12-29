import styled from "styled-components";

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <OptionsWrapper>
      {question.answers.map((answers, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            // hasAnswered ? (index === question.key ? "correct" : "wrong") : ""
            hasAnswered ? (question.answers[index] === question.key[0] ? "correct" : "wrong") : ""
          }`}
          disabled={hasAnswered}
          key={answers}
          onClick={() => dispatch({ type: "newAnswer", payload: question.answers[index] })}
        >
          {answers}
        </button>
      ))}
    </OptionsWrapper>
  );
}

const OptionsWrapper = styled.div`
  display: grid;
  ${"" /* chia làm hai cột */}
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 3.2rem;
  .btn {
    padding: 1rem 2rem;
    font-size: 2rem;
    color: #fff;
    border: 2px solid #495057;
    background-color: #495057;
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: 0.3s;
  }

  .btn {
    padding: 1rem 2rem;
    font-size: 2rem;
    color: #fff;
    border: 2px solid #495057;
    background-color: #495057;
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: all 0.3s ease-in-out;

    &.answer {
      background-color: #6c757d;
      border-color: #6c757d;
    }

    &.correct {
      background-color: #1098ad;
      border-color: #1098ad;
      color: #fff;
    }

    &.wrong {
      background-color: #ffa94d;
      border-color: #ffa94d;
      color: #343a40;
    }

    &:hover {
      background-color: #6c757d;
      border-color: #6c757d;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    button {
      padding: 0;
      font-size: 0.6rem;
    }
  }
`;

export default Options;
