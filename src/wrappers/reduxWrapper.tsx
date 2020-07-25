import React from "react";
import { createStore, PreloadedState } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../redux/rootReducer";
import { Wrapper, WrapperCreator } from "../wrapp/interfaces";

type ReduxUtils<State> = {
  getState: () => State;
  dispatch: (action: any) => any;
};

const createReduxWrapper: WrapperCreator<
  { initialState?: PreloadedState<unknown> },
  ReduxUtils<unknown>
> = ({ initialState }) => {
  const store = createStore(rootReducer, initialState);

  const utils = {
    getState() {
      return store.getState();
    },
    dispatch(action) {
      return store.dispatch(action);
    }
  };

  const wrapper: Wrapper = function ReduxWrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    utils,
    wrapper
  };
};

export default createReduxWrapper;
