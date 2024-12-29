import styled from "styled-components";

function Progress({ index, numQuestion, points, maxPossiblePoints, answer }) {
  return (
    <ProgressWrapper>
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>Correct: {points}</strong> / {maxPossiblePoints}
      </p>
    </ProgressWrapper>
  );
}

const ProgressWrapper = styled.header`
  margin-bottom: 4rem;
  display: grid;
  justify-content: space-between;
  gap: 1.2rem;
  grid-template-columns: auto auto;
  font-size: 1.8rem;
  color: #ced4da;
  progress {
    -webkit-appearance: none;
    width: 100%;
    height: 12px;
    grid-column: 1 / -1;
  }

  ::-webkit-progress-bar {
    background-color: #ced4da;
    border-radius: 100px;
  }
  ::-webkit-progress-value {
    background-color: #1098ad;
    border-radius: 100px;
  }
`;

export default Progress;
