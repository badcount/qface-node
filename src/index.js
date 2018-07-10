import 'rxjs';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';

import configureStore from './store';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import ConfirmPage from './components/ConfirmPage';
import RedeemPage from './components/RedeemPage';
import App from './components/App';

// todo: replace with own css
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} >
        <IndexRoute component={LandingPage} />
        <Route path='service' component={SearchPage} />
        <Route path='confirm' component={ConfirmPage} />
        <Route path='redeem' component={RedeemPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
