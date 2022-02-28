import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
let userId = window.sessionStorage.getItem("loginedId");

  if (!userId) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/" />;
  }
  return children;
}