import React from 'react';
import { Pagination } from 'antd';

import './cards-lists.css';
import MovieCard from '../movie-card';

const CardsLists = ({ searchInput, currentPage, getNameFilm }) => {
  const onChangePagination = (page, pageSize) => {
    console.log(page, pageSize);
    getNameFilm(searchInput, page);
  };
  return (
    <div className="cardsLists">
      <MovieCard searchInput={searchInput} currentPage={currentPage} />
      <Pagination defaultCurrent={1} pageSize={20} total={500} onChange={onChangePagination} />;
    </div>
  );
};

export default CardsLists;
