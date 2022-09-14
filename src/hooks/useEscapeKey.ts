import React, { useEffect } from "react";

export const useEscapeKey = (
  editMode: boolean,
  onEscapePressed: Function,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    const handle = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onEscapePressed();
      }
    }

    if(editMode) {
      inputRef.current!.addEventListener("keydown", handle);
    }

    // TODO: Not sure if this actually cleans the event.
    return () => {
      inputRef.current?.removeEventListener("keydown", handle);
    }
  }, [editMode]);
}
