import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TagService } from "../services/TagService";
import { useFindAllTagsQuery } from "../slices/tagSlice";

export const CreateTag = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = useFindAllTagsQuery();

  const reset = () => {
    setTagName("");
    setEditMode(false);
  };

  const saveTag = async (ev) => {
    ev.preventDefault();

    setIsLoading(true);
    try {
      // TODO: Can I do this using "mutations" from RTK Query? Just to learn.
      //       Read this as well, so I can be cool:
      //       https://async-transformresponse--rtk-query-docs.netlify.app/concepts/optimistic-updates/
      const tag = await TagService.create(tagName);
      toast.success(`Tag '${tag.name}' created!`);
      reset();
      refetch();  
    } catch(e) {
      toast.error((e.message || ["Error"])[0]);
    } finally {
      setIsLoading(false);
    }
  };

  const canSave = () => {
    return tagName.trim().length > 0;
  };

  useEffect(() => {
    if (editMode) {
      inputRef.current!.focus();
    }
  }, [editMode]);

  if(editMode) {
    return (
      <form onSubmit={ saveTag }>
        <input ref={ inputRef } disabled={ isLoading } type="text" value={ tagName } onChange={ (ev) => setTagName(ev.currentTarget.value) }/>
        { isLoading ? (
          <span>Saving...</span>
        ) : (
          <>
            <button type="submit" disabled={ !canSave() }>Save</button>
            <button type="button" onClick={ reset }>Cancel</button>
          </>
        ) }
      </form>
    );
  }

  return (
    <div>
      <button type="button" onClick={ () => setEditMode(true) }>
        +
      </button>
    </div>
  );
};
