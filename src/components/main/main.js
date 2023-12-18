import React from 'react';
import { Layout } from 'antd';

import './main.css';
import CardsLists from '../cards-lists';
import HeaderApp from '../header-app';

const { Content } = Layout;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.getNameFilm = this.getNameFilm.bind(this);
  }

  state = { searchInput: '', currentPage: 1 };

  getNameFilm(nameFilm, page) {
    console.log(nameFilm, page);
    this.setState({ searchInput: nameFilm, currentPage: page });
  }

  render() {
    const { searchInput, currentPage } = this.state;
    return (
      <Content className="mainStyle">
        <HeaderApp getNameFilm={this.getNameFilm} />
        <CardsLists searchInput={searchInput} currentPage={currentPage} getNameFilm={this.getNameFilm} />
      </Content>
    );
  }
}

export default Main;
