import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TagInput } from "./TagInput";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { Tag } from "../models/Tag";
import { TagService } from "../services/TagService";

interface TagEditProps {
  tag: Tag;
  onExitEditMode: () => void;
  onUpdated: () => void;
}

export const TagEdit = ({ tag, onExitEditMode, onUpdated }: TagEditProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagName, setTagName] = useState(tag.name || "");
  const [updatingTag, setUpdatingTag] = useState(false);

  const autoFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!updatingTag) {
      autoFocus();
    }
  }, [updatingTag, autoFocus]);

  const reset = useCallback(() => {
    setTagName(tag.name);
    onExitEditMode();
  }, [tag, onExitEditMode]);

  useEffect(() => {
    setTagName(tag.name || "");
  }, [tag.name]);

  useEscapeKey(reset, inputRef);

  const updateTag = async () => {
    setUpdatingTag(true);

    try {
      await TagService.update(tag.id, tagName);
      onUpdated();
      reset();
    } catch (e) {
      toast.error(e.message[0]);
    } finally {
      setUpdatingTag(false);
    }
  };

  const canSave = () => {
    return tagName.trim().length > 0;
  };

  return (
    <form onSubmit={ (ev) => {
      ev.preventDefault();
      updateTag();
    } }>
      <div className="mb-4">
        <TagInput
          inputRef={ inputRef }
          isLoading={ updatingTag }
          value={ tagName }
          className="bg-gray-50 border border-gray-300
          text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block p-2.5"
          onChange={ (ev) => setTagName(ev.currentTarget.value) }/>
      </div>
      { updatingTag ? (
        <i className="text-gray-300 text-sm">Updating...</i>
      ) : (
        <>
          <button className="btn btn-primary" type="submit" disabled={ !canSave() }>Save</button>
          <button type="button" className="ml-4 btn btn-link text-sm" onClick={ reset }>Cancel</button>
        </>
      ) }

    </form>
  );
};
