import React from "react";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import createReduxWrapper from "./wrappers/reduxWrapper";
import createThemeWrapper from "./wrappers/themeWrapper";
import { bindRender, setWrappers } from "./wrapp/setup";
import wrap from "./wrapp/wrap";
import render from "./wrapp/render";
import ReduxComponent from "./ReduxComponent";
import { merge } from "./redux/rootReducer";

import "@testing-library/jest-dom";

let originalConsoleError;
beforeAll(() => {
  originalConsoleError = console.error;
  bindRender(rtlRender);
});
afterAll(() => {
  console.error = originalConsoleError;
});
beforeEach(() => {
  console.error = () => undefined;
  setWrappers({
    redux: createReduxWrapper,
    theme: createThemeWrapper
  });
});

afterEach(() => {
  setWrappers({});
});

test("component breaks if rendered without wrapper", () => {
  expect(() => {
    render(<ReduxComponent />);
  }).toThrowError("react-redux");
});

test("component does not break if rendered with wrapper", () => {
  const myWrapper = wrap({
    redux: { initialState: { a: "a" } }
  });

  expect(() => {
    render(<ReduxComponent />, { wrapper: myWrapper });
  }).not.toThrowError();
});

test("component has redux state", () => {
  render(<ReduxComponent />, {
    wrappers: {
      redux: { initialState: { a: "a" } }
    }
  });

  expect(screen.getByTestId("current-redux")).toHaveValue('{"a":"a"}');
});

test("component updates redux state", () => {
  render(<ReduxComponent />, {
    wrappers: {
      redux: { initialState: { a: "a" } }
    }
  });

  const current = screen.getByTestId("current-redux");
  const updated = screen.getByTestId("updated-redux");
  const merge = screen.getByTestId("merge-redux");
  const overwrite = screen.getByTestId("overwrite-redux");

  expect(current).toHaveValue(JSON.stringify({ a: "a" }));

  fireEvent.change(updated, { target: { value: JSON.stringify({ b: "b" }) } });
  user.click(merge);
  expect(current).toHaveValue(JSON.stringify({ a: "a", b: "b" }));

  fireEvent.change(updated, { target: { value: JSON.stringify({ c: "c" }) } });
  user.click(overwrite);
  expect(current).toHaveValue(JSON.stringify({ c: "c" }));
});

test("uses utils", () => {
  const { wrapper, utils } = wrap({
    redux: {}
  });

  render(<ReduxComponent />, { wrapper });

  const current = screen.getByTestId("current-redux");
  expect(current).toHaveValue();

  utils.redux.dispatch(merge({ e: "e" }));
  expect(current).toHaveValue(JSON.stringify({ e: "e" }));
});
