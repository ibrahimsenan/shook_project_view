import React from "react";
import { Provider } from "react-redux";
import RootContainer from "../../App";
import createStore from "../redux/Store";
import InternetEvaluator from "./AppServices/InternetEvaluator";
const store = createStore();

export default function AppContainer(): JSX.Element {
  return (
    <Provider store={store}>
      <RootContainer />
      <InternetEvaluator />
    </Provider>
  );
}