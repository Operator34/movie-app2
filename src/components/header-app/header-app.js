import React from 'react';
import './header-app.css';

const HeaderApp = ({ onIsRatingPage, isRatingPage }) => {
  return (
    <div className="headerApp">
      <button onClick={() => onIsRatingPage(false)} className={`button ${!isRatingPage ? 'btn-active' : ''}`}>
        Search
      </button>
      <button onClick={() => onIsRatingPage(true)} className={`button ${isRatingPage ? 'btn-active' : ''}`}>
        Rated
      </button>
    </div>
  );
};

export default HeaderApp;
