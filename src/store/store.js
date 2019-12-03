import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from 'connected-react-router'

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { createBrowserHistory } from 'history'
import rootReducer from "./reducers";


// export const history = createHistory();
export const history = createBrowserHistory()

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];


if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const persistConfig = {
  key: "root",
  storage: storage,
  // whitelist: ["auth"]
  // blacklist: ["builder"]
  // stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const persistedReducer = persistReducer(persistConfig, rootReducer(history));
const store = createStore(persistedReducer, initialState, composedEnhancers);

export default store;
// export default createStore(rootReducer, initialState, composedEnhancers);

export const persistor = persistStore(store);
