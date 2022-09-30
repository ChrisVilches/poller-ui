import React, { useEffect } from "react";

export const useEscapeKey = (
  onEscapePressed: () => void,
  inputRef: React.RefObject<HTMLInputElement>,
  editMode = true
) => {
  useEffect(() => {
    const handle = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        onEscapePressed();
      }
    };

    const ref = inputRef.current;

    if (editMode) {
      inputRef.current?.addEventListener("keydown", handle);
    }

    return () => {
      ref?.removeEventListener("keydown", handle);
    };
  }, [editMode, inputRef, onEscapePressed]);
};
