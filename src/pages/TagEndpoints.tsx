import { Spinner } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { EndpointList } from "../components/EndpointList";
import { HelmetTitle } from "../components/HelmetTitle";
import { RemoveTagConfirmDialog } from "../components/RemoveTagConfirmDialog";
import { TagEdit } from "../components/TagEdit";
import { TagLabel } from "../components/TagLabel";
import { EndpointListContextProvider } from "../contexts/EndpointListContext";
import { Tag } from "../models/Tag";
import { useFindAllTagsQuery, useFindOneTagQuery } from "../slices/tagSlice";

export const TagEndpoints = () => {
  const { id: tagId } = useParams();

  const { data: tag, refetch, /*isLoading,*/ isFetching, error } = useFindOneTagQuery(Number(tagId), {
    skip: !tagId
  });

  const [editMode, setEditMode] = useState(false);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const { refetch: reloadTagMenu } = useFindAllTagsQuery();

  useEffect(() => {
    setEditMode(false);
    refetch();
  }, [tagId, refetch]);

  const fetchEndpoints = useCallback(() => tag?.endpoints || [], [tag]);

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

  if(!isFetching && error) {
    return <NotFound/>;
  }

  return (
    <>
      <HelmetTitle subtitles={ [`#${tag?.name}`] }/>

      <div className="mb-10">
        { editMode ? (
          <TagEdit tag={ tag as Tag }
            onExitEditMode={ () => setEditMode(false) }
            onUpdated={ () => {
              // TODO: This refetch could be done using optimistic updates.
              refetch();
              reloadTagMenu();
            } }/>
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

      <EndpointListContextProvider endpointsFetch={ fetchEndpoints }>
        <EndpointList/>
      </EndpointListContextProvider>
    </>
  );
};
