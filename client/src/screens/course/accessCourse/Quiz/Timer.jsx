import { useEffect } from "react";
import styled from "styled-components";

function Timer({ dispatch, secoundsRemaining }) {
  const mins = Math.floor(secoundsRemaining / 60);
  const secs = secoundsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <TimerWrapper>
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </TimerWrapper>
  );
}

const TimerWrapper = styled.div`
  float: left;
  font-size: 1.8rem;
  color: var(--color-medium);
  border: 2px solid var(--color-dark);
  padding: 1.35rem 2.8rem;
  border-radius: 100px;
`;

export default Timer;
