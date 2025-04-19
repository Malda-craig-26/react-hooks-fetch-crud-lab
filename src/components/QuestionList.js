function QuestionList({ questions, onDeleteQuestion, onUpdateAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions?.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <select
              value={question.correctIndex}
              onChange={(e) => onUpdateAnswer(question.id, parseInt(e.target.value))}
              aria-label="Correct Answer"
            >
              {question.answers?.map((answer, index) => (
               <option key={`${question.id}-${index}`} value={index}>
               {answer}
             </option>
             
              ))}
            </select>
            <button onClick={() => onDeleteQuestion(question.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;