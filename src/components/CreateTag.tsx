import { PlusCircleIcon, PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./EndpointForm/ArgumentsForm";
import { SmallCancelButton } from "./SmallCancelButton";
import { useCreateTagMutation } from "../slices/tagSlice";

export const CreateTag = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState("");

  const [trigger, { isLoading }] = useCreateTagMutation();

  // TODO: When the creation is over, it glitches a bit. I think it's because
  //       it resets the form, and then hides the form.
  //       There's a possibility this can't be fixed easily. The cause may be because
  //       the form goes back to the initial state because the RTK Query ends, and after
  //       that, I execute my custom ".then". The order is OK, but the RTK Query state is
  //       reflected earlier. So there's nothing to do about it (other than some hack to "fix" it)
  const reset = () => {
    setEditMode(false);
    setTagName("");
  };

  const autoFocus = () => {
    if (editMode) {
      inputRef.current!.focus();
    }
  };

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
  }, [editMode]);

  if(editMode) {
    return (
      <form onSubmit={ saveTag }>
        <input ref={ inputRef }
          disabled={ isLoading }
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={ tagName }
          onChange={ (ev) => setTagName(ev.currentTarget.value) }/>

        { isLoading ? (
          <span>Saving...</span>
        ) : (
          <>
            <button className="btn btn-primary" type="submit" disabled={ !canSave() }>Save</button>
            <SmallCancelButton onClick={ reset }/>
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
