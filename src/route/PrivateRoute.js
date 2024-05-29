import React from 'react';
import { Navigate } from 'react-router-dom';

//user값이 있을 경우에만 보여준다
//children = PrivateRoute태그 하위 태그인 TogoPage를 의미
const PrivateRoute = ({ user, children }) => {
    console.log("PrivateRoute : user", user);
    console.log("children", children);
    return user ? children : <Navigate to="/login" />
};

export default PrivateRoute;