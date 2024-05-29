import React from 'react'
import { Navigate } from 'react-router-dom';

//user값이 있을 경우에만 보여준다
//children = PrivateRoute태그 하위 태그인 TogoPage를 의미
const PrivateRoute = ({ user, children }) => {
    return (
        //user? <TodoPage/>: 도 가능! 하지만 더 좋은 방법이 있음
        //해당 route를 쓰고자 하는 모든 페이지에서 쓸 수 있도록 정의
        user ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute