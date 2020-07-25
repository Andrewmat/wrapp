import React from "react";

export type Wrapper = React.ComponentType;

export type WrapperCreator<WCO extends object, WU = undefined> = (
  options: WCO
) => { wrapper: Wrapper; utils: WU } | Wrapper;

export type RecordWrapperCreators<WCO extends object, WU> = Record<
  string,
  WrapperCreator<WCO, WU>
>;

export type WrapperOptions = object | undefined;

export type KeyedWrapperOptions = {
  [key: string]: WrapperOptions;
};

export type WrapRenderOptions =
  | undefined
  | {
      wrappers: KeyedWrapperOptions;
    };

export type RenderFunction<FA, RFO extends object, RFR> = (
  firstArg: FA,
  options: WrapRenderOptions & RFO,
  ...otherArgs: unknown[]
) => RFR;
