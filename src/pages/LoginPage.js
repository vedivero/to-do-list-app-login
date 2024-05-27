import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); //user정보를 저장

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        //token이라는 이름으로 저장
        sessionStorage.setItem("token", response.data.token);
        //header에 token을 넣음
        //post는 request.body 지원 (get은 미지원)
        //body에 token값을 넣는 것은 post에만 의미있는 실행(get은 사용할 수 없음)
        // => header에 token값을 넣어 back-end로 전달

        //header에 입력할 token설정
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        setError("");
        navigate("/");
      }
      throw new Error(response.message);
      console.log("login response : ", response)
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="display-center">
      {error && <div>{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
