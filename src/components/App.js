import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddQuestion = (newQuestion) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((addedQuestion) => {
        setQuestions((prev) => [...prev, addedQuestion]);
        setPage("List"); // Switch back to list view after adding
      });
  };

  const handleUpdateAnswer = (id, correctIndex) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, correctIndex };
      }
      return question;
    });
    setQuestions(updatedQuestions);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm 
          onAddQuestion={handleAddQuestion} 
          onPageChange={setPage} 
        />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDelete}
          onUpdateAnswer={handleUpdateAnswer}
        />
      )}
    </main>
  );
}

export default App;