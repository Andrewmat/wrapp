import React from "react";
import { render as rtlRender, screen } from "@testing-library/react";
import createReduxWrapper from "../wrappers/reduxWrapper";
import createThemeWrapper from "../wrappers/themeWrapper";
import ReduxComponent from "../ReduxComponent";
import ThemeComponent from "../ThemeComponent";
import { appendWrapper, bindRender } from "./setup";
import { clearWrapperCreators } from "./globalManager";
import render from "./render";

import "@testing-library/jest-dom";

beforeAll(() => {
  appendWrapper("redux", createReduxWrapper);
  appendWrapper("theme", createThemeWrapper);
  bindRender(rtlRender);
});
afterAll(() => {
  clearWrapperCreators();
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
