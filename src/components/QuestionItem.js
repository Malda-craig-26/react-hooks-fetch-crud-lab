import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex, setSelectedIndex] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    onDelete(id);
  }

  function handleSelectChange(e) {
    const newIndex = parseInt(e.target.value);
    setSelectedIndex(newIndex);
    onUpdateCorrectIndex(id, newIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
          value={selectedIndex} 
          onChange={handleSelectChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;