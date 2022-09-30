import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TagInput } from "./TagInput";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useCreateTagMutation } from "../slices/tagSlice";

export const CreateTag = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState("");

  const [trigger, { isLoading }] = useCreateTagMutation();

  const reset = useCallback(() => {
    setEditMode(false);
    setTagName("");
  }, []);

  const autoFocus = useCallback(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const saveTag = async (ev) => {
    ev.preventDefault();

    trigger(tagName)
      .unwrap()
      .then(() => {
        toast.success("Created!");
        reset();
      })
      .catch(({ data }) => {
        autoFocus();
        toast.error(data.message[0]);
      });
  };

  const canSave = () => {
    return tagName.trim().length > 0;
  };

  useEffect(() => {
    autoFocus();
  }, [editMode, autoFocus]);

  useEscapeKey(reset, inputRef, editMode);

  if (editMode) {
    return (
      <form onSubmit={ saveTag }>
        <div className="mb-4">
          <TagInput
            inputRef={ inputRef }
            isLoading={ isLoading }
            value={ tagName }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={ (ev) => setTagName(ev.currentTarget.value) }/>
        </div>

        { isLoading ? (
          <span>Saving...</span>
        ) : (
          <>
            <button className="btn btn-primary" type="submit" disabled={ !canSave() }>Save</button>
            <button type="button" className="ml-4 btn btn-link text-sm" onClick={ reset }>Cancel</button>
          </>
        ) }
      </form>
    );
  }

  return (
    <div>
      <button className="tag-button w-full" type="button" onClick={ () => setEditMode(true) }>
        <PlusIcon className="w-4 h-4 mx-auto m-2"/>
      </button>
    </div>
  );
};
