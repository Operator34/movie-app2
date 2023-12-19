import './movie-card.css';
import React from 'react';
import { Col, Image } from 'antd';
import { format } from 'date-fns';

class MovieCard extends React.Component {
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
    const { movie } = this.props;
    const { id, poster_path, title, release_date, overview } = movie;

    return (
      <>
        <Col className="card" key={id} span={11}>
          <Image className="coverMovie" src={poster_path ? `${basePosterUrl}${poster_path}` : defaultPoster} />
          <div className="aboutTheFilm">
            <h1 className="titleName">{title}</h1>
            <time className="releaseDate">{release_date ? format(new Date(release_date), 'MMMM d, yyyy') : ''}</time>
            <div className="genreFilm">
              <p className="nameGenre">Action</p>
              <p className="nameGenre">Drama</p>
            </div>
            <div className="descriptionFilm">
              <p>{this.conversionStr(overview, 250)}</p>
            </div>
          </div>
        </Col>
      </>
    );
  }
}

export default MovieCard;
