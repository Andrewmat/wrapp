import React from "react";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import createReduxWrapper from "./wrappers/reduxWrapper";
import createThemeWrapper from "./wrappers/themeWrapper";
import { appendWrapper, bindRender } from "./wrapp/setup";
import render from "./wrapp/render";
import { clearWrapperCreators } from "./wrapp/globalManager";
import ThemeComponent from "./ThemeComponent";

import "@testing-library/jest-dom";

let originalConsoleError;
beforeAll(() => {
  originalConsoleError = console.error;
  appendWrapper("redux", createReduxWrapper);
  appendWrapper("theme", createThemeWrapper);
  bindRender(rtlRender);
});
afterAll(() => {
  console.error = originalConsoleError;
  clearWrapperCreators();
});

test("component breaks if rendered without wrapper", () => {
  console.error = () => undefined;
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
