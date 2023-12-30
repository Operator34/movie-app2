import './movie-card.css';
import React from 'react';
import { Col, Image, Rate } from 'antd';
import { format } from 'date-fns';

import RequestService from '../../services/request-service';

class MovieCard extends React.Component {
  requestService = new RequestService();

  state = { rate: 0 };

  componentDidMount() {
    const movieRate = this.props.movie.rating;
    this.setState({ rate: movieRate ? movieRate : 0 });
  }

  onChangeRate = (value) => {
    const { guestSessionId, movie } = this.props;
    console.log(guestSessionId);
    this.setState({ rate: value });
    this.requestService.addRateGuestSession(movie.id, guestSessionId, value).then((res) => {
      console.log(res);
    });
  };

  conversionStr(str, maxLength) {
    if (str.length > maxLength) {
      let newStr = str.slice(0, maxLength).trim();
      const regexp = /\b\w+$|,$/gm;
      newStr = newStr.replace(regexp, '...');
      return newStr;
    } else return str;
  }
  render() {
    const basePosterUrl = 'https://image.tmdb.org/t/p/original';
    const defaultPoster =
      'https://sun9-27.userapi.com/impf/wnP-oC-n-D0GsW0QzCbXkdNTF60EokgNqotM9w/ufq3R83KzCg.jpg?size=230x330&quality=96&sign=fa5ed75994dc63d8905d54ee80e4d038&type=album';
    const { movie, genre } = this.props;
    const { id, poster_path, title, release_date, overview } = movie;
    const { rate } = this.state;
    const colorRate = {
      borderColor:
        rate < 3 ? '#E90000' : rate >= 3 && rate < 5 ? '#E97E00' : rate >= 5 && rate < 7 ? '#E9D100' : '#66E900',
    };
    let elementsGenre = null;
    if (genre.length > 0) {
      elementsGenre = genre.map((el, index) => {
        return (
          <p key={index} className="nameGenre">
            {el}
          </p>
        );
      });
    }
    return (
      <>
        <Col className="card" key={id} xs={21} lg={12} xl={11}>
          <Image
            className="coverMovie"
            src={poster_path ? `${basePosterUrl}${poster_path}` : defaultPoster}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultPoster;
            }}
          />
          <div className="aboutTheFilm">
            <h1 className="titleName">{title}</h1>
            <time className="releaseDate">{release_date ? format(new Date(release_date), 'MMMM d, yyyy') : ''}</time>
            <div className="rating-value" style={colorRate}>
              {rate}
            </div>
            <div className="genreFilm">{elementsGenre}</div>
            <div className="descriptionFilm">
              <p>{this.conversionStr(overview, 260)}</p>
            </div>
            <Rate className="rate" allowHalf count={10} value={rate} onChange={(value) => this.onChangeRate(value)} />
          </div>
        </Col>
      </>
    );
  }
}

export default MovieCard;
