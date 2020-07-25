import React from "react";
import { isValidElementType } from "react-is";
import { getWrapperCreator, getWrapperNames } from "./globalManager";
import { Wrapper } from "./interfaces";

type WrapperDefValue<WCO extends object> = Wrapper | WCO;

type WrapWrapper<U> = Wrapper & { utils: U; wrapper: Wrapper };

type WrapperDefs = Record<string, WrapperDefValue<object>>;

function wrapMultiple(wrapperDefs: WrapperDefs) {
  const names = Object.keys(wrapperDefs);
  let utils = {};

  const wrapper: WrapWrapper<unknown> = ({
    children
  }: {
    children: React.ReactElement;
  }) =>
    names.reduce((wrapped, name) => {
      const options_or_wrapper = wrapperDefs[name];

      let createWrapperResult;
      if (isValidElementType(options_or_wrapper)) {
        createWrapperResult = options_or_wrapper;
      } else {
        const createWrapper = getWrapperCreator(name);
        if (typeof createWrapper === "function") {
          createWrapperResult = createWrapper(options_or_wrapper);
        } else {
          let message = [
            `Could not find a wrapper of name '${name}'.`,
            `Available names are: ${getWrapperNames().join(", ")}`
          ].join("\n");
          console.warn(message);
          return wrapped;
        }
      }

      let WrapperComponent = createWrapperResult;
      if (createWrapperResult.wrapper) {
        WrapperComponent = createWrapperResult.wrapper;
        utils[name] = createWrapperResult.utils;
      }
      return <WrapperComponent>{wrapped}</WrapperComponent>;
    }, children);

  wrapper.utils = utils;
  wrapper.wrapper = wrapper;
  return wrapper;
}

const wrap = wrapMultiple;
export default wrap;
