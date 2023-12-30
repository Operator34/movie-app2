import React from 'react';

import { API_KEY, API_TOKEN } from './API_KEY';

class RequestService extends React.Component {
  _apiBase = 'https://api.themoviedb.org/3';
  optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  async getResource() {
    const res = await fetch(
      `${this._apiBase}/search/movie?query=return&include_adult=false&language=en-US&page=1`,
      this.optionsGet
    );
    const body = await res.json();
    return body;
  }

  async getMovie(nameFilm, page = 1) {
    const res = await fetch(
      `${this._apiBase}/search/movie?query=${nameFilm}&include_adult=false&language=en-US&page=${page}`,
      this.optionsGet
    );
    const body = await res.json();
    return body;
  }
  async getAllGenre() {
    const res = await fetch(`${this._apiBase}/genre/movie/list`, this.optionsGet);
    const body = await res.json();
    return body;
  }
  async createGuestSession() {
    const res = await fetch(`${this._apiBase}/authentication/guest_session/new?api_key=${API_KEY}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        //Authorization: `Bearer ${API_KEY}`,
      },
    });
    const body = await res.json();
    return body;
  }
  async addRateGuestSession(movie_id, guestSessionId, rate) {
    console.log(movie_id, guestSessionId, rate);
    const res = await fetch(
      `${this._apiBase}/movie/${movie_id}/rating?guest_session_id=${guestSessionId}&api_key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          //Authorization: `Bearer ${API_KEY}`,
        },
        body: `{"value":${rate}}`,
      }
    );
    const body = await res.json();
    return body;
  }
  async getRateMovie(guestSessionId, page = 1) {
    const res = await fetch(
      `${this._apiBase}/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&page=${page}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          //Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const body = await res.json();
    console.log(body);
    return body;
  }
}
export default RequestService;
