import { RecordWrapperCreators, RenderFunction } from './interfaces'

class GlobalManager {
  #renderFunc: RenderFunction<unknown, object, unknown>;
  #wrapperCreators: RecordWrapperCreators<object, unknown> = {};

  get wrapperCreators() {
    return this.#wrapperCreators;
  }

  set wrapperCreators(wrappers) {
    this.#wrapperCreators = wrappers;
  }

  get renderFunc() {
    return this.#renderFunc;
  }

  set renderFunc(func) {
    this.#renderFunc = func;
  }
}

const globalManager = new GlobalManager();

export function setWrappersCreators(wrapperCreators: RecordWrapperCreators<object, unknown>) {
  return (globalManager.wrapperCreators = wrapperCreators);
}

export function getWrapperCreators() {
  return globalManager.wrapperCreators;
}

export function getWrapperCreator(name: string) {
  return globalManager.wrapperCreators[name];
}

export function getWrapperNames() {
  return Object.keys(globalManager.wrapperCreators);
}

export function setRenderFunction(func: RenderFunction) {
  return (globalManager.renderFunc = func);
}

export function getRenderFunction() {
  return globalManager.renderFunc;
}
