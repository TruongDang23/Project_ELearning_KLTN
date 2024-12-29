import { useReducer } from "react";
import Header from "./Quiz/Header";
import Main from "./Quiz/Main";
import Loader from "./Quiz/Loader";
import Error from "./Quiz/Error";
import StartScreen from "./Quiz/StartScreen";
import Question from "./Quiz/Question";
import NextButton from "./Quiz/NextButton";
import Progress from "./Quiz/Progress";
import Finish from "./Quiz/Finish";
import Timer from "./Quiz/Timer";
import Footer from "./Quiz/Footer";
import styled from "styled-components";

const initialState = {
  questions: [],
  // 'loading', 'ready', 'error', 'active', 'inactive',...
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secoundsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
  case "dataReceived":
    return {
      ...state,
      questions: action.payload,
      status: "ready"
    };
  case "dataFailed":
    return {
      ...state,
      status: "error"
    };
  case "start":
    return {
      ...state,
      status: "active"
      // secoundsRemaining: state.questions.length * SECS_PER_QUESTION,
    };
  case "newAnswer": {
    const question = state.questions[state.index];
    return {
      ...state,
      answer: action.payload,
      points:
          action.payload === question.key[0] ? state.points + 1 : state.points
    };
  }
  case "nextQuestion":
    return {
      ...state,
      index: state.index + 1,
      answer: null
    };
  case "finish":
    return {
      ...state,
      status: "finished",
      highscore:
          state.points > state.highscore ? state.points : state.highscore
    };
  case "restart":
    return {
      ...initialState,
      questions: state.questions,
      secoundsRemaining: action.payload.during_time * 60,
      status: "ready"
    };
  case "tick":
    return {
      ...state,
      secoundsRemaining: state.secoundsRemaining - 1,
      status: state.secoundsRemaining === 0 ? "finished" : state.status
    };
  default:
    throw new Error(`Unrecognized action: ${action.type}`);
  }
}

function Quizz({ quizzData, setProgress }) {
  const [
    { questions, status, index, answer, points, highscore, secoundsRemaining },
    dispatch
  ] = useReducer(reducer, {
    ...initialState,
    questions: quizzData.questions,
    secoundsRemaining: quizzData.during_time * 60,
    status: "ready"
  });
  const numberOfQuestions = questions.length;
  const maxPossiblePoints = numberOfQuestions;
  const timerRemind = quizzData.during_time * 60;

  return (
    <QuizWrapper>
      <div className="app">
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <>
              <Header
                title={quizzData.name}
                description={quizzData.title}
              />
              <StartScreen
                numberOfQuestions={numberOfQuestions}
                passpoint={quizzData.passpoint}
                during_time={quizzData.during_time}
                dispatch={dispatch}
              />
            </>
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestion={numberOfQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secoundsRemaining={secoundsRemaining}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestion={numberOfQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <Finish
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
              timerRemind={timerRemind}
              passPoint={quizzData.passpoint}
              setProgress={setProgress}
            />
          )}
        </Main>
      </div>
    </QuizWrapper>
  );
}

const QuizWrapper = styled.div`
  height: 52rem;
  color: #f1f3f5;
  ${
  "" /* background-image: linear-gradient(rgba(35, 33, 33, 0.484), rgb(23, 22, 22)),
    url(${Quizzbackground});
  background-size: cover; */
}
  background-color: #343a40;
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default Quizz;
