import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { EndpointList } from "../components/EndpointList";
import { RemoveTagConfirmDialog } from "../components/RemoveTagConfirmDialog";
import { EndpointListContextProvider } from "../contexts/EndpointListContext";
import { useFindOneTagQuery } from "../slices/tagSlice";

export const TagEndpoints = () => {
  const { id: tagId } = useParams();

  const { data: tag, refetch, isFetching } = useFindOneTagQuery(Number(tagId), {
    skip: !tagId
  });

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  useEffect(() => {
    refetch();
  }, [tagId, refetch]);

  if(isFetching) {
    return <div>Loading tag...</div>;
  }

  if(!isFetching && !tag) {
    return <NotFound/>;
  }

  return (
    <div>
      #{ tag?.name }

      <button type="button" onClick={ () => setShowRemoveDialog(true) }>Remove tag</button>
      <RemoveTagConfirmDialog show={ showRemoveDialog } closeModal={ () => setShowRemoveDialog(false) } tag={ tag! }/>

      <EndpointListContextProvider endpointsFetch={ () => tag!.endpoints }>
        <EndpointList/>
      </EndpointListContextProvider>
    </div>
  );
};
