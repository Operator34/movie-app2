import './header-app.css';
import React from 'react';
import { debounce } from 'lodash';
import { Layout, Input } from 'antd';
const { Search } = Input;
const { Header } = Layout;

class HeaderApp extends React.Component {
  onChange = debounce((e) => {
    const { getNameFilm } = this.props;
    getNameFilm(e.target.value);
  }, 1000);

  onSearch = (value) => {
    const { getNameFilm } = this.props;
    getNameFilm(value);
  };

  render() {
    return (
      <Header className="headerStyle">
        <Search
          className="searchAnt"
          placeholder="Введите название фильма"
          allowClear
          onSearch={this.onSearch}
          size="large"
          onChange={this.onChange}
        />
      </Header>
    );
  }
}

export default HeaderApp;
