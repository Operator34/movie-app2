import React from 'react';

import API_KEY from './API_KEY';

class RequestService extends React.Component {
  _apiBase = 'https://api.themoviedb.org/3';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  async getResource() {
    const res = await fetch(
      `${this._apiBase}/search/movie?query=return&include_adult=false&language=en-US&page=1`,
      this.options
    );
    const body = await res.json();
    return body;
  }

  async getMovie(nameFilm, page = 1) {
    const res = await fetch(
      `${this._apiBase}/search/movie?query=${nameFilm}&include_adult=false&language=en-US&page=${page}`,
      this.options
    );
    const body = await res.json();
    return body;
  }
  async getAllGenre() {
    const res = await fetch(`${this._apiBase}/genre/movie/list`, this.options);
    const body = await res.json();
    return body;
  }
}
export default RequestService;
