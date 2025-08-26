import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import { createLogger } from "redux-logger";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import reducers from "./Reducer";
import rootSaga from "./Saga";

const store = () => {
  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware();

  // const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  // }) : compose;

  middleware.push(sagaMiddleware);
  middleware.push(thunk);
  middleware.push(createLogger());

  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(reducers, composeWithDevTools(...enhancers));

  sagaMiddleware.run(rootSaga);

  return store;
};

export type State = ReturnType<typeof reducers>;

export default store;
