import React, { useEffect } from "react";

export const useEscapeKey = (
  editMode: boolean,
  onEscapePressed: () => void,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    const handle = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        onEscapePressed();
      }
    };

    // TODO: Remove this (I think it's solved - the fix was to wrap the onEscapePressed
    //       with useCallBack so that the hook is not executed so often).
    console.log("doing this (if this prints often, wrap reset in useCallback)");

    const ref = inputRef.current;

    if(editMode) {
      inputRef.current?.addEventListener("keydown", handle);
    }

    // TODO: Not sure if this actually cleans the event.
    return () => {
      ref?.removeEventListener("keydown", handle);
    };
  }, [editMode, inputRef, onEscapePressed]);
};
