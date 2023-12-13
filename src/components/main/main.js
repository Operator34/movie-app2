import React from 'react';
import { Layout } from 'antd';

import './main.css';
import CardsLists from './../cards-lists';
const { Content } = Layout;

const Main = () => {
  return (
    <Content className="mainStyle">
      {/* <div>Main</div> */}
      <CardsLists />
    </Content>
  );
};

export default Main;
