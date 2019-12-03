import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom';
import { Route, Switch } from "react-router"; // react-router v4/v5
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "@store/store";
import * as serviceWorker from './serviceWorker';

const App = lazy(() => import('@components/App'));
const Viewer = lazy(() => import('@components/Viewer'));

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/viewer" component={Viewer} />
          <Route exact path="/" render={() => <div>Match</div>} />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </Suspense>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();