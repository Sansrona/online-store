import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <p>Ошибка</p>
      <button onClick={goBack}>Назад</button>
    </div>
  );
};

export default ErrorPage;
