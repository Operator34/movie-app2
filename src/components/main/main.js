import React from 'react';
import { Layout } from 'antd';

import './main.css';
import CardsLists from '../cards-lists';
import SearchString from '../search-string';
import HeaderApp from '../header-app/header-app';
import RequestService from '../../services/request-service';
const { Content } = Layout;

class Main extends React.Component {
  requestService = new RequestService();
  state = { searchInput: 'Return', currentPage: 1, isRatingPage: false };

  onIsRatingPage = (status) => {
    this.setState({ isRatingPage: status });
  };
  getNameFilm = (nameFilm, page) => {
    console.log(nameFilm, page);
    this.setState({ searchInput: nameFilm, currentPage: page });
  };

  render() {
    const { searchInput, currentPage, isRatingPage } = this.state;
    return (
      <Content className="mainStyle">
        <HeaderApp onIsRatingPage={this.onIsRatingPage} isRatingPage={isRatingPage} />
        {!isRatingPage ? <SearchString getNameFilm={this.getNameFilm} page={currentPage} /> : null}
        <CardsLists
          searchInput={searchInput}
          currentPage={currentPage}
          getNameFilm={this.getNameFilm}
          isRatingPage={isRatingPage}
          guestSessionId={this.props.guestSessionId}
        />
      </Content>
    );
  }
}

export default Main;
