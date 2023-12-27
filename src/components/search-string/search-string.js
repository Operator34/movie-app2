import './search-string.css';
import React from 'react';
import { debounce } from 'lodash';
import { Layout, Input } from 'antd';
const { Search } = Input;
const { Header } = Layout;

const SearchString = ({ getNameFilm, page }) => {
  const onChange = debounce((e) => {
    getNameFilm(e.target.value, page);
  }, 1000);

  const onSearch = (value) => {
    console.log(page);
    getNameFilm(value, page);
  };

  return (
    <Header className="headerStyle">
      <Search
        className="searchAnt"
        placeholder="Введите название фильма"
        allowClear
        onSearch={onSearch}
        size="large"
        onChange={onChange}
      />
    </Header>
  );
};

export default SearchString;
