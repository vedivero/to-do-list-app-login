import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";


import api from "./utils/api";


function App() {
  const [user, setUser] = useState(null);
  //getUser 목적 : token 값으로 user정보를 가져 옴
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };
  //user정보를 조회해서 로그인 권한이 있는지 체크
  useEffect(() => {
    getUser();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user={user}>
                                  <TodoPage/>
                              </PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
