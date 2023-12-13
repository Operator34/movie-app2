import React from 'react';

import API_KEY from './API_KEY';

class RequestService extends React.Component {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  async getResource() {
    const res = await fetch(`${this._apiBase}?query=return&include_adult=false&language=en-US&page=1`, this.options);
    const body = await res.json();
    console.log(body);
    return body;
  }
}
export default RequestService;
