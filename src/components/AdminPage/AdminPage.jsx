import "./AdminPage.scss";
import questions from "../../data/data";
import { useState } from "react";
const AdminPage = ({ results, onClear }) => {
  const isCorrectAnswer = (question, answer) => {
    const questionData = questions.find((q) => q.question === question);
    const correctOption = questionData?.options.find((o) => o.isCorrect);

    return correctOption?.answer === answer;
  };
  const adminLogin = [{ 
    password: '031', 
    userName: "ZeroFx" 
  }]; 
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const [adminName,setAdminName] = useState(false)
  const [adminPass,setAdminPass] = useState(false)
  const isAdmin = (e)=>{
    e.preventDefault()
    
    adminLogin.map((admin)=>{
      if(userName !== admin.userName && password !==  adminPass){
        console.log('err');
      } else{
        setAdminPass(true)
        setAdminName(true)
      }
      return
    })
  }
  return (
    <div className="admin-page">
      <div className={adminName && adminPass ? 'adminLoginActive' : 'adminLoginDisActive'}>
        <form onSubmit={isAdmin}>
          <input type="text" onChange={(e)=> setUserName(e.target.value)} placeholder="user name" />
          <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Кириш</button>
        </form>
      </div>
      <h2>Тест натижалари</h2>
      <div className="results-container">
        {results.length === 0 ? (
          <p>натижалар мавжуд емас</p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="result-card">
              <h3>
                {result.userData.firstName} {result.userData.lastName}
              </h3>
              <ul>
                {result.userAnswers.map((answer, idx) => (
                  <li
                    key={idx}
                    className={
                      isCorrectAnswer(answer.question, answer.answer)
                        ? "correct-answer"
                        : "incorrect-answer"
                    }
                  >
                    <strong>Савол:</strong> {answer.question}
                    <br />
                    <strong>Жавоб:</strong> <img src={answer.answer} alt="" />
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <button onClick={onClear} className="clear-button">
        Очириш
      </button>
    </div>
  );
};

export default AdminPage;
