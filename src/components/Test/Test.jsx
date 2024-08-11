import "./Test.scss";
import data from "../../data/data";
import { useState } from "react";
import { Link } from "react-router-dom";
const Test = ({ onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Для сохранения ответов пользователя
  const [userData, setUserData] = useState({ firstName: "", lastName: "" }); // Данные пользователя

  const handleAnswerOptionClick = (answerOption) => {
    if (answerOption.isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: data[currentQuestion].question,
        answer: answerOption.answer,
      },
    ]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit({ userData, userAnswers });
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setUserData({ firstName: "", lastName: "" });
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <div className="user-data-form">
            <input
              type="text"
              name="firstName"
              placeholder="Исм"
              value={userData.firstName}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={userData.lastName}
              onChange={handleChange}
              className="input-field"
            />
            <button onClick={handleSubmit} className="submit-button">
              Жонатиш
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="test">
            <div className="question-section">
            <Link to={'/admin'}><img className="logo" src="../../../public/fxPng.png" alt="" /></Link>
              <div className="question-count">
                <span>Савол {currentQuestion + 1}</span> / {data.length}
              </div>
              <div className="question-text">
                {data[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {data[currentQuestion].options.map((option, index) => (
                <img
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className="answer-button"
                  src={option.answer}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Test;
