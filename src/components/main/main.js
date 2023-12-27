import React from 'react';
import { Layout } from 'antd';

import './main.css';
import CardsLists from '../cards-lists';
import SearchString from '../search-string';
import HeaderApp from '../header-app/header-app';

const { Content } = Layout;

class Main extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.getNameFilm = this.getNameFilm.bind(this);
  // }

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
        <SearchString getNameFilm={this.getNameFilm} page={currentPage} />
        <CardsLists searchInput={searchInput} currentPage={currentPage} getNameFilm={this.getNameFilm} />
      </Content>
    );
  }
}

export default Main;
