function Option({question}) {
    return (
        <div className="options">
        {question.options.map((e) => (
            <button className="btn btn-option" key={e}>{e}</button>
        ))}
      </div>
    );
}

export default Option;