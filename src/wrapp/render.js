import { getRenderFunction } from "./globalManager";
import wrap from "./wrap";

export default function render(firstArg, options, ...otherArgs) {
  let finalOptions = options;
  if (options) {
    const { wrappers, ...originalOptions } = options;
    if (wrappers) {
      try {
        const wrapper = wrap(wrappers);
        originalOptions.wrapper = wrapper;
      } catch (e) {}
    }
    finalOptions = originalOptions;
  }
  const originalRender = getRenderFunction();
  originalRender(firstArg, finalOptions, ...otherArgs);
}
