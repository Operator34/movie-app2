import React from 'react';
import { Row, Pagination, Alert, ConfigProvider, Spin } from 'antd';

import './cards-lists.css';
import MovieCard from '../movie-card';
import RequestService from '../../services/request-service';
import { GenreConsumerProvider } from '../app/App';
class CardsLists extends React.Component {
  requestService = new RequestService();

  state = {
    movies: [],
    numbersOfMovies: 1,
    loading: true,
    error: { status: false, message: '' },
  };
  onChangePagination = (page = 1, pageSize) => {
    const { searchInput, getNameFilm } = this.props;
    console.log(page, pageSize);
    getNameFilm(searchInput, page);
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
  getGenreMovie = (genres, genreIds) => {
    const newArr = genres
      .filter((genre) => genreIds.includes(genre.id)) // Фильтрация жанров по их идентификаторам
      .map((genre) => genre.name);
    return newArr;
  };
  updateCard() {
    const { searchInput, currentPage } = this.props;

    this.requestService
      .getMovie(searchInput, currentPage)
      .then((res) => {
        console.log('result', res);
        this.setState({
          movies: res.results,
          loading: false,
          numbersOfMovies: res.total_results,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { searchInput, currentPage } = this.props;
    const {
      movies,
      numbersOfMovies,
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
    console.log('numbersOfMovies', numbersOfMovies);
    const infoMessage = !numbersOfMovies ? (
      <MessageAlert errorMessage={'Ничего не найдено'} description={'Попробуйте ввести другой запрос'} type={'info'} />
    ) : null;
    return (
      <GenreConsumerProvider>
        {(genres) => {
          console.log(genres);
          return (
            <div className="cardsLists">
              {errorMessage}
              {infoMessage}
              <Row justify="space-evenly" gutter={[0, 16]}>
                <Spinner loading={loading} err={status} />
                {movies.map((movie) => (
                  <MovieCard
                    genre={this.getGenreMovie(genres, movie.genre_ids)}
                    key={movie.id}
                    movie={movie}
                    searchInput={searchInput}
                    currentPage={currentPage}
                  />
                ))}
              </Row>
              <Pagination
                className="pagination"
                pageSize={20}
                showSizeChanger={false}
                total={numbersOfMovies}
                onChange={this.onChangePagination}
              />
            </div>
          );
        }}
      </GenreConsumerProvider>
    );
  }
}

export default CardsLists;

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
  return (
    <Alert className="messageAlert" message={errorMessage} description={description} type={type} showIcon closable />
  );
};
