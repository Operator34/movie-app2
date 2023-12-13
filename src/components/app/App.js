import { Layout } from 'antd';
import './App.css';

import HeaderApp from './../header-app';
import Main from './../main';

function App() {
  // return <div className="App">Hello Movie</div>;
  // <Space
  //   direction="vertical"
  //   style={{
  //     width: '100%',
  //   }}
  //   size={[0, 48]}
  // ></Space>;
  return (
    <Layout>
      <div className="App">
        <HeaderApp />
        <Main />
      </div>
    </Layout>
  );
}

export default App;
