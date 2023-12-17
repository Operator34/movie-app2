import React from 'react';

import './error-not-network.css';

//import imgNotNetwork from './not-network.png';
const ErrorNotNetwork = () => {
  return (
    <div className="errorNetwork">
      <h1>Отсутвует подключение к интернету</h1>
      <p>Проверьте работу роутера</p>
      <p>Уточните информацию у провайдера</p>
    </div>
  );
};

export default ErrorNotNetwork;
