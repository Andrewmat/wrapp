import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { merge, overwrite } from "./redux/rootReducer";

export default function ReduxComponent() {
  const [updatedValue, setUpdatedValue] = useState();
  const dispatch = useDispatch();
  const reduxState = useSelector(state => state);

  const handleMerge = () => {
    dispatch(merge(JSON.parse(updatedValue)));
    setUpdatedValue("");
  };
  const handleOverwrite = () => {
    dispatch(overwrite(JSON.parse(updatedValue)));
    setUpdatedValue("");
  };

  return (
    <>
      <textarea
        data-testid="updated-redux"
        value={updatedValue}
        onChange={e => setUpdatedValue(e.target.value)}
      />
      <button data-testid="merge-redux" onClick={handleMerge}>
        Merge
      </button>
      <button data-testid="overwrite-redux" onClick={handleOverwrite}>
        Overwrite
      </button>
      <textarea
        data-testid="current-redux"
        value={JSON.stringify(reduxState)}
        readOnly
      />
    </>
  );
}
