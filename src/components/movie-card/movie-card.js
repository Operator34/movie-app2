import React from 'react';
import { Row, Col, Image } from 'antd';
import { format } from 'date-fns';

import './movie-card.css';
import RequestService from '../../services/request-service';

class MovieCard extends React.Component {
  allFilmsReturn = new RequestService();

  state = {
    movies: [],
  };

  componentDidMount() {
    this.updateCard();
  }

  updateCard() {
    this.allFilmsReturn.getResource().then((res) => {
      this.setState({ movies: res.results });
    });
  }
  conversionStr(str, maxLength) {
    if (str.length > maxLength) {
      let newStr = str.slice(0, maxLength).trim();
      const regexp = /\b\w+$|,$/gm;
      newStr = newStr.replace(regexp, '...');
      return newStr;
    } else return str;
  }
  render() {
    const { movies } = this.state;
    const basePosterUrl = 'https://image.tmdb.org/t/p/original';
    const defaultPOster =
      'https://sun9-27.userapi.com/impf/wnP-oC-n-D0GsW0QzCbXkdNTF60EokgNqotM9w/ufq3R83KzCg.jpg?size=230x330&quality=96&sign=fa5ed75994dc63d8905d54ee80e4d038&type=album';
    const dateToFormat = new Date('1985-10-31');
    const formattedDate = format(dateToFormat, 'MMMM d, yyyy');

    console.log('формат даты', formattedDate);
    return (
      <>
        <Row justify="space-evenly">
          {console.log(movies)}
          {movies.map((movie) => (
            <Col className="card" key={movie.id} span={11}>
              <Image
                className="coverMovie"
                src={movie.poster_path ? `${basePosterUrl}${movie.poster_path}` : defaultPOster}
              />
              <div className="aboutTheFilm">
                <h1 className="titleName">{movie.title}</h1>
                <time className="releaseDate">
                  {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : ''}
                </time>
                <div className="genreFilm">
                  <p className="nameGenre">Action</p>
                  <p className="nameGenre">Drama</p>
                </div>
                <div className="descriptionFilm">
                  <p>{this.conversionStr(movie.overview, 250)}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default MovieCard;
