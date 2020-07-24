import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../redux/rootReducer";

export default function createReduxWrapper({ initialState }) {
  const store = createStore(rootReducer, initialState);

  const utils = {
    getState() {
      return store.getState();
    },
    getDispatch() {
      return action => store.dispatch(action);
    }
  };

  const wrapper = function ReduxWrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    wrapper,
    utils
  };
}
