class GlobalManager {
  #renderFunc;
  #wrapperCreators = {};

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

export function setWrappersCreators(wrappers) {
  globalManager.wrapperCreators = wrappers;
}

export function getWrapperCreators() {
  return globalManager.wrapperCreators;
}

export function getWrapperCreator(name) {
  return globalManager.wrapperCreators[name];
}

export function getWrapperNames() {
  return Object.keys(globalManager.wrapperCreators);
}

export function setRenderFunction(func) {
  return (globalManager.renderFunc = func);
}

export function getRenderFunction() {
  return globalManager.renderFunc;
}
