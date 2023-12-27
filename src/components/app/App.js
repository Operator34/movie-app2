import React from 'react';
import { Layout } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './App.css';
import ErrorNotNetwork from '../error-not-network';
import RequestService from '../../services/request-service';

import Main from './../main';

const { Provider: GenreContextProvider, Consumer: GenreConsumerProvider } = React.createContext();
export { GenreContextProvider, GenreConsumerProvider };
class App extends React.Component {
  requestService = new RequestService();
  state = { genres: [] };

  componentDidMount() {
    console.log('componentDidMount APP');
    this.requestService.getAllGenre().then((res) => this.setState({ genres: res.genres }));
  }
  render() {
    return (
      <>
        <Online>
          <Layout>
            <GenreContextProvider value={this.state.genres}>
              <div className="App">
                <Main />
              </div>
            </GenreContextProvider>
          </Layout>
        </Online>
        <Offline>
          <ErrorNotNetwork />
        </Offline>
      </>
    );
  }
}

export default App;
