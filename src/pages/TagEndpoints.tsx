import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EndpointList } from "../components/EndpointList";
import { EndpointListContextProvider } from "../contexts/EndpointListContext";
import { useFindOneTagQuery } from "../slices/tagSlice";

export const TagEndpoints = () => {
  const { id: tagId } = useParams();

  const { data: tag, refetch, isFetching } = useFindOneTagQuery(Number(tagId), {
    skip: !tagId
  });

  useEffect(() => {
    refetch();
  }, [tagId, refetch]);

  if(isFetching) {
    return <div>Loading tag...</div>;
  }

  return (
    <div>
      #{ tag?.name }
      <EndpointListContextProvider endpointsFetch={ () => tag!.endpoints }>
        <EndpointList/>
      </EndpointListContextProvider>
    </div>
  );
};
