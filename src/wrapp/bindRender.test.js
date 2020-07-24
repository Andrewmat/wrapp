import React from "react";
import { render as rtlRender, screen } from "@testing-library/react";
import createReduxWrapper from "../wrappers/reduxWrapper";
import createThemeWrapper from "../wrappers/themeWrapper";
import ReduxComponent from "../ReduxComponent";
import ThemeComponent from "../ThemeComponent";
import setWrappers from "./setWrappers";
import bindRender from "./bindRender";
import render from "./render";

import "@testing-library/jest-dom";

beforeAll(() => {
  setWrappers({
    redux: createReduxWrapper,
    theme: createThemeWrapper
  });
  bindRender(rtlRender);
});

test("accepts wrappers option", () => {
  expect(() => {
    render(
      <>
        <ReduxComponent />
        <ThemeComponent />
      </>,
      {
        wrappers: {
          theme: { initialTheme: "orange" },
          redux: { initialState: { a: "a" } }
        }
      }
    );
  }).not.toThrowError();
});

test("accepts original wrapper option", () => {
  const myWrapper = ({ children }) => children;
  expect(() => {
    render(<div />, { wrapper: myWrapper });
  }).not.toThrowError();
});

test("accepts a wrapper as argument", () => {
  render(<div data-testid="my-wrapper-content" />, {
    wrappers: {
      myWrapper: ({ children }) => (
        <div data-testid="my-wrapper">{children}</div>
      )
    }
  });

  expect(screen.getByTestId("my-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("my-wrapper-content")).toBeInTheDocument();
});

test("accepts a memoed wrapper", () => {
  render(<div data-testid="my-wrapper-content" />, {
    wrappers: {
      myWrapper: React.memo(({ children }) => (
        <div data-testid="my-wrapper">{children}</div>
      ))
    }
  });

  expect(screen.getByTestId("my-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("my-wrapper-content")).toBeInTheDocument();
});
