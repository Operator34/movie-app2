import { Layout } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './App.css';
import ErrorNotNetwork from '../error-not-network';

import HeaderApp from './../header-app';
import Main from './../main';

function App() {
  return (
    <>
      <Online>
        <Layout>
          <div className="App">
            <HeaderApp />
            <Main />
          </div>
        </Layout>
      </Online>
      <Offline>
        <ErrorNotNetwork />
      </Offline>
    </>
  );
}

export default App;
