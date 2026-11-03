import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../assets/components/sidebar";

const questions = [
  {
    question: "What is x in 2x + 4 = 10?",
    options: ["2", "3", "4", "5"],
    answer: "3"
  },
  {
    question: "What is 5 × 5?",
    options: ["10", "15", "20", "25"],
    answer: "25"
  },
  {
    question: "What is 20 ÷ 4?",
    options: ["2", "4", "5", "10"],
    answer: "5"
  }
];

function QuizDetails() {

  const { quizId } = useParams();

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  function selectAnswer(index, answer) {

    setAnswers({
      ...answers,
      [index]: answer
    });

  }

  function submitQuiz() {

    let result = 0;

    questions.forEach((question, index) => {

      if (answers[index] === question.answer) {
        result++;
      }

    });

    setScore(result);
  }

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-header">
          <div>
            <h1>
              {quizId.charAt(0).toUpperCase() +
                quizId.slice(1)} Quiz
            </h1>

            <p>Answer all questions</p>
          </div>
        </div>

        <div className="quiz-question-container">

          {questions.map((question, index) => (

            <div className="question-card" key={index}>

              <h2>
                {index + 1}. {question.question}
              </h2>

              {question.options.map((option) => (

                <label
                  className="option"
                  key={option}
                >

                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={
                      answers[index] === option
                    }
                    onChange={() =>
                      selectAnswer(index, option)
                    }
                  />

                  {option}

                </label>

              ))}

            </div>

          ))}

          <button
            className="primary-button"
            onClick={submitQuiz}
          >
            Submit Quiz
          </button>

          {score !== null && (

            <div className="score-box">
              🎉 Your Score: {score}/{questions.length}
            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default QuizDetails;