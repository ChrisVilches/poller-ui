import { plainToClass } from "class-transformer";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EndpointList } from "../components/EndpointList";
import { EndpointListContextProvider } from "../contexts/EndpointListContext";
import { Endpoint } from "../models/Endpoint";
import { Tag } from "../models/Tag";
import { useFindOneQuery } from "../slices/tagSlice";

export const TagEndpoints = () => {
  const { id: tagId } = useParams();

  // TODO: I'd like to refetch if the user clicks on the tag again (from another tag, at least. if
  //       it's the same tag, then it should do nothing, I think, but refetching also works)
  const { data: rawTag, refetch, isFetching } = useFindOneQuery(Number(tagId), {
    skip: !tagId
  });

  useEffect(() => {
    refetch();
  }, [tagId, refetch]);

  if(isFetching) {
    return <div>Loading tag...</div>;
  }

  // TODO: Should come from the service, but it's a RTK Query result... So, how?
  const tag: Tag = plainToClass(Tag, rawTag);

  //<EndpointList endpoints={tag.endpoints} isLoading={false}/>

  return (
    <div>
      #{ tag?.name }
      <EndpointListContextProvider endpointsFetch={ () => tag.endpoints as Endpoint[] }>
        <EndpointList/>
      </EndpointListContextProvider>
    </div>
  );
};
