function Option({ question, answer, dispatch }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((e, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={e}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {e}
        </button>
      ))}
    </div>
  );
}

export default Option;
