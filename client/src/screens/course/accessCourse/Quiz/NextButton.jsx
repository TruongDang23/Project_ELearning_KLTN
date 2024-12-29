import styled from "styled-components";

function NextButton({ dispatch, answer, index, numQuestion }) {
  if (answer === null) return null;
  if (index < numQuestion - 1) {
    return (
      <NextButtonWrapper>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </NextButtonWrapper>
    );
  }
  if (index === numQuestion - 1) {
    return (
      <NextButtonWrapper>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </NextButtonWrapper>
    );
  }
}

const NextButtonWrapper = styled.div`
  .btn {
    float: right;
    padding: 1rem 2rem;
    font-size: 2rem;
    color: #fff;
    border: 2px solid #495057;
    background-color: #495057;
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: all 0.3s ease-in-out;
  }
`;

export default NextButton;
