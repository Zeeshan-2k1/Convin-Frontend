import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import RootLayout from 'components/RootLayout';

import AlertWrapper from './context/AlertContext';

import History from 'pages/History';
import Home from 'pages/Home';

import store from './reducers/store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            colorBgContainer: '#fff',
          },
        }}
      >
        <Router>
          <AlertWrapper>
            <RootLayout>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/history">
                  <History />
                </Route>
              </Switch>
            </RootLayout>
          </AlertWrapper>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
