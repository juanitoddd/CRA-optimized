import React, { Suspense } from "react";
import ReactDOM from 'react-dom'; // react-router v4/v5
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "@store/store";
import * as serviceWorker from '@src/serviceWorker';
import App from "./App";

import "@styles/reset.css";

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<div />}>
        <App />
      </Suspense>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();