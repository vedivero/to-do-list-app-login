
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import PrivateRoute from "./route/PrivateRoute";

function App() {

  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      //sessionStorage에 token이라는 이름의 세션을 가져옴
      const token = sessionStorage.getItem("token");
      //const response = api.get("/user/????");
    } catch (error) {

    }
  }


  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user={user}><TodoPage /></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
