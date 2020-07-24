import React from "react";
import { render, screen } from "@testing-library/react";
import createReduxWrapper from "../wrappers/reduxWrapper";
import createThemeWrapper from "../wrappers/themeWrapper";
import ReduxComponent from "../ReduxComponent";
import ThemeComponent from "../ThemeComponent";
import setWrappers from "./setWrappers";
import wrap from "./wrap";

import "@testing-library/jest-dom";

let originalConsoleWarn;
beforeAll(() => {
  originalConsoleWarn = console.warn;
  setWrappers({
    redux: createReduxWrapper,
    theme: createThemeWrapper
  });
});
afterAll(() => {
  console.warn = originalConsoleWarn;
});

test("does not break when renders one wrapper", () => {
  const myWrapper = wrap({
    theme: { initialTheme: "orange" }
  });

  expect(() => {
    render(<div />, { wrapper: myWrapper });
  }).not.toThrow();
});

test("does not break when renders multiple wrappers", () => {
  const myWrapper = wrap({
    theme: { initialTheme: "orange" },
    redux: { initialState: { a: "a" } }
  });

  expect(() => {
    render(<div />, { wrapper: myWrapper });
  }).not.toThrow();
});

test("dependent component breaks when rendered without wrappers", () => {
  expect(() => {
    render(
      <>
        <ReduxComponent />
        <ThemeComponent />
      </>
    );
  }).toThrowError();
});

test("dependent component is rendered with regular wrapper", () => {
  const myWrapper = wrap({
    theme: { initialTheme: "orange" },
    redux: { initialState: { a: "a" } }
  });

  expect(() => {
    render(
      <>
        <ReduxComponent />
        <ThemeComponent />
      </>,
      { wrapper: myWrapper }
    );
  }).not.toThrowError();
});

test("accepts a wrapper as argument", () => {
  render(<div data-testid="my-wrapper-content" />, {
    wrapper: wrap({
      myWrapper: ({ children }) => (
        <div data-testid="my-wrapper">{children}</div>
      )
    })
  });

  expect(screen.getByTestId("my-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("my-wrapper-content")).toBeInTheDocument();
});

test("accepts a memoed wrapper", () => {
  render(<div data-testid="my-wrapper-content" />, {
    wrapper: wrap({
      myWrapper: React.memo(({ children }) => (
        <div data-testid="my-wrapper">{children}</div>
      ))
    })
  });

  expect(screen.getByTestId("my-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("my-wrapper-content")).toBeInTheDocument();
});

test("warns if some wrapper could not be found", () => {
  console.warn = jest.fn();
  const wrapper = wrap({
    inexistentWrapper: {}
  });

  expect(() => {
    render(<div data-testid="my-wrapper-content" />, { wrapper });
  }).not.toThrowError();

  expect(screen.getByTestId("my-wrapper-content")).toBeInTheDocument();

  expect(console.warn).toHaveBeenCalled();
});
