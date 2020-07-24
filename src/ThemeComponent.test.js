import React from "react";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import createReduxWrapper from "./wrappers/reduxWrapper";
import createThemeWrapper from "./wrappers/themeWrapper";
import { setWrappers, bindRender } from "./wrapp/setup";
import render from "./wrapp/render";
import ThemeComponent from "./ThemeComponent";

import "@testing-library/jest-dom";

let originalConsoleError;
beforeAll(() => {
  originalConsoleError = console.error;
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
  bindRender(rtlRender);
});

afterEach(() => {
  setWrappers({});
});

test("component breaks if rendered without wrapper", () => {
  expect(() => {
    render(<ThemeComponent />);
  }).toThrowError();
});

test("component does not break if rendered with wrapper", () => {
  expect(() => {
    render(<ThemeComponent />, {
      wrappers: {
        theme: { initialTheme: "orange" }
      }
    });
  }).not.toThrowError();
});

test("component is themed", () => {
  render(<ThemeComponent />, {
    wrappers: {
      theme: { initialTheme: "orange" }
    }
  });

  const input = screen.getByTestId("input-theme");
  const submit = screen.getByTestId("submit-theme");

  expect(input).toHaveStyle({
    backgroundColor: "orange"
  });
  expect(submit).toHaveStyle({
    backgroundColor: "orange"
  });

  fireEvent.change(input, { target: { value: "blue" } });
  fireEvent.click(submit);

  expect(input).toHaveStyle({
    backgroundColor: "blue"
  });
  expect(submit).toHaveStyle({
    backgroundColor: "blue"
  });
});
