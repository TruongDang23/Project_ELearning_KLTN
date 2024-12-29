import image0 from "./g0.gif";
import image60 from "./g60.gif";
import image80 from "./g80.gif";
import image100 from "./g100.gif";
import styled from "styled-components";

function Finish({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
  timerRemind,
  passPoint,
  setProgress
}) {
  const percentage = Math.round((points / maxPossiblePoints) * 100, 2)
  const handleSubmit = () => {
    alert('You have submit this score')
    setProgress((prevProgress) => ({
      ...prevProgress,
      percent: (points >= passPoint) ? 100 : 0
    }))
  }

  let image;
  let emoji;
  if (percentage === 100) {
    emoji = "🎉";
    image = image100;
  } else if (percentage >= 80) {
    emoji = "😄";
    image = image80;
  } else if (percentage >= 60) {
    emoji = "😐";
    image = image60;
  } else {
    emoji = "😢";
    image = image0;
  }
  return (
    <FinishWrapper>
      <div className="result">
        <p>
          <span>{emoji}</span>
          Your score is <strong>{points}</strong> out of {maxPossiblePoints}{" "}
          question.
        </p>
        <p className="highscore">That is {percentage}%.</p>
      </div>
      {/* <div className="image-result">
        <img src={image} alt="gif" />
      </div> */}

      <button
        className="btn btn-ui"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "restart",
            payload: {
              during_time: timerRemind / 60
            }
          })
        }
      >
        Restart
      </button>
    </FinishWrapper>
  );
}

const FinishWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.4rem;
  padding: 2.4rem;
  .image-result {
    text-align: center;
    margin-bottom: 2.4rem;
    img {
      width: 18rem;
    }
  }
  .result {
    color: #fff;
    border-radius: 100px;
    text-align: center;
    padding: 2rem 0;
    font-size: 2rem;
    font-weight: 500;
    .highscore {
      font-size: 2.2rem;
      margin-right: 4px;
    }
  }
  span {
    font-size: 2.2rem;
    margin-right: 4px;
  }

  .btn {
    float: center;
    padding: 1rem 2rem;
    margin: 0 20rem;
    font-size: 2rem;
    color: #fff;
    border: 2px solid #fff;
    background-color: #495057;
    cursor: pointer;
    border-radius: 100px;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;
    &:hover {
      background-color: #6c757d;
      border-color: #6c757d;
      transform: scale(1.05);
    }
  }
`;

export default Finish;
