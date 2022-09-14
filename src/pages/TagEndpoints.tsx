import { Spinner } from "flowbite-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NotFound } from "./NotFound";
import { EndpointList } from "../components/EndpointList";
import { HelmetTitle } from "../components/HelmetTitle";
import { RemoveTagConfirmDialog } from "../components/RemoveTagConfirmDialog";
import { TagInput } from "../components/TagInput";
import { TagLabel } from "../components/TagLabel";
import { EndpointListContextProvider } from "../contexts/EndpointListContext";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { Tag } from "../models/Tag";
import { TagService } from "../services/TagService";
import { useFindAllTagsQuery, useFindOneTagQuery } from "../slices/tagSlice";

export const TagEndpoints = () => {
  const { id: tagId } = useParams();

  const { data: tag, refetch, /*isLoading,*/ isFetching, error } = useFindOneTagQuery(Number(tagId), {
    skip: !tagId
  });

  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState(tag?.name || "");
  const [updatingTag, setUpdatingTag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const { refetch: reloadTagMenu } = useFindAllTagsQuery();

  const reset = useCallback(() => {
    if(tag) {
      setTagName(tag.name);
    }
    setEditMode(false);
  }, [tag]);

  useEffect(() => {
    refetch();
  }, [tagId, refetch]);
  
  const autoFocus = useCallback(() => {
    if(editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  // TODO: Do I need these two hooks? Try to merge them.
  //       But first, remember to specify how to test (required outcome, etc.)
  useEffect(() => {
    autoFocus();
  }, [editMode, autoFocus]);

  useEffect(() => {
    if(!updatingTag && editMode) {
      autoFocus();
    }
  }, [updatingTag, autoFocus, editMode]);

  useEscapeKey(editMode, reset, inputRef);

  useEffect(() => {
    setTagName(tag?.name || "");
  }, [tag?.name]);

  const updateTag = async () => {
    if(!tag) {
      return;
    }

    setUpdatingTag(true);
    try {
      await TagService.update(tag.id, tagName);
      // TODO: This refetch could be done using optimistic updates.
      refetch();
      reloadTagMenu();
      reset();
    } catch (e) {
      toast.error(e.message[0]);
    } finally {
      setUpdatingTag(false);
    }
  };

  // TODO: Should be isFetching. The reason is that isLoading doesn't show a spinner
  //       after updating the tag name, which would be good if it wasn't because
  //       because of the animation library (framer-motion) it blinks a few times
  //       every time something in the state is changed, which is tricky to debug and/or fix.
  //       The ideal solution would be to use isFetching (so that the spinner doesn't show
  //       after having edited the tag name, and also try to use optimistic updates so that the
  //       change is smoothier)
  //
  //       The reason why it blinks could be related to other things as well, like some of the hooks
  //       I have. But I don't know yet.
  if(isFetching) {
    return <div><Spinner/></div>;
  }

  const updateTagName = (ev) => {
    ev.preventDefault();
    updateTag();
  };

  const canSave = () => {
    return tagName.trim().length > 0;
  };

  if(!isFetching && error) {
    return <NotFound/>;
  }

  return (
    <>
      <HelmetTitle subtitles={ [`#${tag?.name}`] }/>

      <div className="mb-10">
        { editMode ? (
          <div>
            <form onSubmit={ updateTagName }>
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
          </div>
        ) : (
          <div className="flex items-center">
            <div className="grow">
              <button onClick={ () => setEditMode(true) }>
                <TagLabel name={ tag?.name || "" }/>
              </button>
            </div>
            <div>
              <button className="btn btn-danger" type="button" onClick={ () => setShowRemoveDialog(true) }>
                Remove tag
              </button>
              <RemoveTagConfirmDialog
                show={ showRemoveDialog } closeModal={ () => setShowRemoveDialog(false) } tag={ tag as Tag }/>
            </div>
          </div>
        ) }
      </div>

      <EndpointListContextProvider endpointsFetch={ () => tag?.endpoints || [] }>
        <EndpointList/>
      </EndpointListContextProvider>
    </>
  );
};
