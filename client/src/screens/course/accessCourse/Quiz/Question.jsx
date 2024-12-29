import styled from "styled-components";
import Options from "./Options";
function Question({ question, dispatch, answer }) {
  return (
    <QuestionWrapper>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </QuestionWrapper>
  );
}

const QuestionWrapper = styled.div`
  h4 {
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }
`;

export default Question;
