export default function rootReducer(state = {}, { type, payload }) {
  if (type === "overwrite") {
    return { ...payload };
  }
  if (type === "merge") {
    return {
      ...state,
      ...payload
    };
  }
  return state;
}

export function overwrite(payload) {
  return {
    type: "overwrite",
    payload
  };
}

export function merge(payload) {
  return {
    type: "merge",
    payload
  };
}
