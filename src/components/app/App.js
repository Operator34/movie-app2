import { Layout } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './App.css';
import ErrorNotNetwork from '../error-not-network';

import Main from './../main';

function App() {
  return (
    <>
      <Online>
        <Layout>
          <div className="App">
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
