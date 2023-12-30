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
  state = { genres: [], guestSessionId: '' };

  // get = (e) => {
  //   console.log('Кнопка');
  //   e.preventDefault();
  //   this.requestService.getRateMovie(this.state.guestSessionId, 1);
  // };

  componentDidMount() {
    console.log('componentDidMount APP');
    this.requestService.getAllGenre().then((res) => this.setState({ genres: res.genres }));

    this.requestService.createGuestSession().then((res) => {
      this.setState({ guestSessionId: res.guest_session_id });
    });
  }
  render() {
    return (
      <>
        <Online>
          <Layout>
            <GenreContextProvider value={this.state}>
              <div className="App">
                <Main guestSessionId={this.state.guestSessionId} />
                {/* <button onClick={this.get}>КНОПКА</button> */}
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
