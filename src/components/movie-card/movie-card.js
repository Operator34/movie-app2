import './movie-card.css';
import React from 'react';
import { Row, Col, Image, Spin, ConfigProvider, Alert } from 'antd';
import { format } from 'date-fns';

import RequestService from '../../services/request-service';

class MovieCard extends React.Component {
  requestService = new RequestService();

  state = {
    movies: [],
    loading: true,
    error: { status: false, message: '' },
  };
  onError = (err) => {
    console.log(err.message);
    this.setState({
      error: {
        status: true,
        message: err.message,
      },
    });
  };
  componentDidMount() {
    this.updateCard();
  }
  componentDidUpdate(prevProps) {
    if (this.props.searchInput !== prevProps.searchInput || this.props.currentPage !== prevProps.currentPage) {
      this.updateCard();
    }
  }

  updateCard() {
    const { searchInput, currentPage } = this.props;
    const data = searchInput ? searchInput : 'Return';
    this.requestService
      .getMovie(data, currentPage)
      .then((res) => {
        console.log('result', res);
        this.setState({ movies: res.results, loading: false });
      })
      .catch(this.onError);
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
    const {
      movies,
      loading,
      error: { status, message },
    } = this.state;

    const errorMessage = status ? (
      <MessageAlert
        errorMessage={message}
        description={'Произошла ошибка, уже работаем над испралением'}
        type={'error'}
      />
    ) : null;
    const infoMessage =
      movies.length < 1 ? (
        <MessageAlert
          errorMessage={'Ничего не найдено'}
          description={'Попробуйте ввести другой запрос'}
          type={'info'}
        />
      ) : null;
    const basePosterUrl = 'https://image.tmdb.org/t/p/original';
    const defaultPoster =
      'https://sun9-27.userapi.com/impf/wnP-oC-n-D0GsW0QzCbXkdNTF60EokgNqotM9w/ufq3R83KzCg.jpg?size=230x330&quality=96&sign=fa5ed75994dc63d8905d54ee80e4d038&type=album';

    return (
      <>
        {errorMessage}
        {infoMessage}
        <Row justify="space-evenly">
          <Spinner loading={loading} err={status} />

          {movies.map((movie) => (
            <Col className="card" key={movie.id} span={11}>
              <Image
                className="coverMovie"
                src={movie.poster_path ? `${basePosterUrl}${movie.poster_path}` : defaultPoster}
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

const Spinner = ({ loading, err }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'blue',
      },
      components: {
        Spin: {
          dotSize: 100,
          dotSizeLG: 150,
        },
      },
    }}
  >
    <Spin size="large" spinning={err ? !err : loading} fullscreen={true} />
  </ConfigProvider>
);

const MessageAlert = ({ errorMessage, description, type }) => {
  return <Alert message={errorMessage} description={description} type={type} showIcon closable />;
};
