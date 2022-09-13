import { Spinner } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NotFound } from "./NotFound";
import { EndpointList } from "../components/EndpointList";
import { HelmetTitle } from "../components/HelmetTitle";
import { RemoveTagConfirmDialog } from "../components/RemoveTagConfirmDialog";
import { SmallCancelButton } from "../components/SmallCancelButton";
import { TagLabel } from "../components/TagLabel";
import { EndpointListContextProvider } from "../contexts/EndpointListContext";
import { TagService } from "../services/TagService";
import { useFindAllTagsQuery, useFindOneTagQuery } from "../slices/tagSlice";

export const TagEndpoints = () => {
  const { id: tagId } = useParams();

  const { data: tag, refetch, isLoading, isFetching, error } = useFindOneTagQuery(Number(tagId), {
    skip: !tagId
  });

  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState(tag?.name || "");
  const [updatingTag, setUpdatingTag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const { refetch: reloadTagMenu } = useFindAllTagsQuery();

  useEffect(() => {
    refetch();
  }, [tagId, refetch]);
  
  const autoFocus = () => {
    if(editMode) {
      inputRef.current!.focus();
    }
  };
  useEffect(() => {
    autoFocus();
  }, [editMode]);

  useEffect(() => {
    setTagName(tag?.name || "");
  }, [tag?.name]);

  // TODO: Should be isFetching. The reason is that isLoading doesn't show a spinner
  //       after updating the tag name, which would be good if it wasn't because
  //       because of the animation library (framer-motion) it blinks a few times
  //       every time something in the state is changed, which is tricky to debug and/or fix.
  //       The ideal solution would be to use isFetching (so that the spinner doesn't show
  //       after having edited the tag name, and also try to use optimistic updates so that the
  //       change is smoothier)
  if(isFetching) {
    return <div><Spinner/></div>;
  }

  const updateTag = async () => {
    setUpdatingTag(true);
    try {
      await TagService.update(tag!.id, tagName);
      // TODO: This refetch could be done using optimistic updates.
      refetch();
      reloadTagMenu();
      reset();
    } catch (e) {
      toast.error(e.message[0]);

      // TODO: How can I autofocus after an error so that the user can continue editing?
      //       This hack is dumb.
      //       For some reason the tag creation form works without setTimeout.
      setTimeout(autoFocus, 10);
    } finally {
      setUpdatingTag(false);
    }
  };

  const updateTagName = (ev) => {
    ev.preventDefault();
    updateTag();
  };

  const reset = () => {
    setTagName(tag!.name);
    setEditMode(false);
  };

  const canSave = () => {
    return tagName.trim().length > 0;
  };

  if(!isFetching && error) {
    return <NotFound/>;
  }

  return (
    <>
      <HelmetTitle subtitles={ [`#${tag!.name}`] }/>

      <div className="mb-10">
        { editMode ? (
          <div>
            <form onSubmit={ updateTagName }>
              <input
                ref={ inputRef }
                type="text"
                value={ tagName }
                disabled={ updatingTag }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={ (ev) => setTagName(ev.currentTarget.value) }/>
              { updatingTag ? (
                <i className="text-gray-300 text-sm">Updating...</i>
              ) : (
                <>
                  <button className="btn btn-primary" type="submit" disabled={ !canSave() }>Save</button>
                  <SmallCancelButton onClick={ reset }/>
                </>
              ) }
              
            </form>
          </div>
        ) : (
          <>
            <button onClick={ () => setEditMode(true) }>
              <TagLabel name={ tag!.name }/>
            </button>
            <div className="float-right">
              <button className="btn btn-danger" type="button" onClick={ () => setShowRemoveDialog(true) }>Remove tag</button>
              <RemoveTagConfirmDialog show={ showRemoveDialog } closeModal={ () => setShowRemoveDialog(false) } tag={ tag! }/>
            </div>
          </>
        ) }
      </div>

      <EndpointListContextProvider endpointsFetch={ () => tag!.endpoints }>
        <EndpointList/>
      </EndpointListContextProvider>
    </>
  );
};
