import { useEffect, useState } from "react";
import "./App.scss";
import Test from "./components/Test/Test";
import AdminPage from './components/AdminPage/AdminPage'
import { Route, Routes } from "react-router-dom";

function App() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    setResults(storedResults);
  }, []);

  const handleQuizSubmit = (newResult) => {
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    localStorage.setItem("quizResults", JSON.stringify(updatedResults));
  };

  const handleClearResults = () => {
    setResults([]);
    localStorage.removeItem("quizResults");
  };

  return (
    <div>
      <div className="app-container">
        <div className="backg">
          <Routes>
            <Route path="/" element={<Test onSubmit={handleQuizSubmit} />} />
            <Route
              path="/admin"
              element={
                <AdminPage results={results} onClear={handleClearResults} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
