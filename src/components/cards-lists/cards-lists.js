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
    if (
      this.props.searchInput !== prevProps.searchInput ||
      this.props.currentPage !== prevProps.currentPage ||
      this.props.isRatingPage !== prevProps.isRatingPage
    ) {
      this.setState((state) => ({
        loading: !state.loading,
      }));

      this.updateCard();
    }
  }
  getGenreMovie = (genres, genreIds) => {
    const newArr = genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name);
    return newArr;
  };
  // updateCard() {
  //   const { searchInput, currentPage, isRatingPage } = this.props;
  //   if (isRatingPage) {
  //     console.log('isRating');
  //     this.requestService.getRateMovie(this.props.guestSessionId).then((res) => {
  //       console.log(res.results);
  //       this.setState({
  //         movies: res.results,
  //         loading: false,
  //         numbersOfMovies: res.total_results,
  //       });
  //     });
  //   } else {
  //     this.requestService
  //       .getMovie(searchInput, currentPage)
  //       .then((res) => {
  //         console.log('result', res);
  //         this.setState({
  //           movies: res.results,
  //           loading: false,
  //           numbersOfMovies: res.total_results,
  //         });
  //       })
  //       .catch(this.onError);
  //     this.requestService.getRateMovie(this.props.guestSessionId).then((res) => {
  //       console.log(res.results);
  //       this.setState({
  //         moviesRate: res.results,
  //       });
  //     });
  //   }
  // }
  updateCard() {
    const { searchInput, currentPage, isRatingPage } = this.props;
    if (isRatingPage) {
      console.log('isRating');
      this.requestService.getRateMovie(this.props.guestSessionId).then((res) => {
        console.log(res.results);
        this.setState({
          movies: res.results,
          loading: false,
          numbersOfMovies: res.total_results,
        });
      });
    } else {
      console.log('else 94');
      Promise.all([
        this.requestService.getMovie(searchInput, currentPage),
        this.requestService.getRateMovie(this.props.guestSessionId),
      ])
        .then(([movieRes, rateRes]) => {
          const movie = movieRes.results;
          const movieRate = rateRes.results || [];
          console.log(movie);
          console.log(movieRate);
          if (movieRate.length > 0) {
            const updatedMovie = movie.map((movieItem) => {
              const foundRating = movieRate.find((rateItem) => rateItem.id === movieItem.id);
              if (foundRating) {
                return { ...movieItem, rating: foundRating.rating };
              }
              return movieItem;
            });
            this.setState({
              movies: updatedMovie,
              loading: false,
              numbersOfMovies: movieRes.total_results,
            });
          } else {
            console.log('else');
            this.setState({
              movies: movieRes.results,
              loading: false,
              numbersOfMovies: movieRes.total_results,
            });
          }
        })
        .catch((error) => {
          // Обработка ошибок
          console.error('Error fetching data:', error);
        });
    }
  }

  render() {
    const { searchInput, currentPage } = this.props;
    const {
      movies,
      numbersOfMovies,
      loading,
      error: { status, message },
    } = this.state;
    console.log(movies);

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
        {(state) => {
          const { genres, guestSessionId } = state;
          // console.log(genres, guestSessionId);
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
                    guestSessionId={guestSessionId}
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
