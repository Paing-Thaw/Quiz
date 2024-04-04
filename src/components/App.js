import { React } from "react-dom/test-utils";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";
import Question from "./Question";
const initialState = {
  questions: [],
  status: "loading",
  index: 0, 
  answer: null,
  points: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active"
      }
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
       
        ...state,
        answer: action.payload,
        points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points

      }
    default:
      throw new Error("Action Unkown");
  }
}
export default function App() {
  const [{ questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen questions={numQuestions} dispatch={dispatch}/>}
        {status === "active" && <Question question={questions[index]} answer={answer} dispatch={dispatch}/>}
      </Main>
    </div>
  ); 
}
