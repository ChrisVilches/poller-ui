/* eslint-disable max-lines */
// TODO: Enable max-lines rule (remove comment above)

import React, { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { AdvancedConfiguration } from "./AdvancedConfiguration";
import { RequiredFields } from "./RequiredFields";
import {
  EndpointFormContext,
  EndpointFormContextProvider,
  EndpointFormDispatchContext
} from "../../contexts/EndpointFormContext";
import { Endpoint } from "../../models/Endpoint";
import { EndpointService } from "../../services/EndpointService";
import { useEndpointTagsQuery } from "../../slices/endpointSlice";
import { collectPayload } from "../../util/endpoint";
import { ErrorList } from "../ErrorList";

interface EditFormProps {
  endpoint: Endpoint;
  onEndpointUpserted: (e: Endpoint) => void;
  formType: "create" | "edit";
  children: (form: ReactElement, saveEndpoint: () => void, saveLoading: boolean) => ReactElement;
}

const EndpointFormAux = ({ endpoint, onEndpointUpserted, formType, children }: EditFormProps) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: I think this doesn't reload the correct data for the correct endpoint ID that's currently selected.
  // This is most likely related to RTK Query Cache.
  // How to reproduce.
  // (1) Keep the console.log I have inside the hook below.
  // (2) Update the tags for one endpoint.
  // (3) Close, open another endpoint edit form, close, and open the endpoint you edited again.
  // (4) You should see no Network activity (query result is cached), and the tags are the same as before.
  //
  // How to solve: Invalidate cache (manually) so that the query is reloaded.
  // Since I'm using Axios for that query, it has to be done manually.
  //
  // Update: Solved by adding "reloadEndpointTags" after the Axios query.
  //         Still needs to confirm if it's fixed or not. Monkey test some more.
  const { data: endpointTags, refetch: reloadEndpointTags } = useEndpointTagsQuery(endpoint.id, {
    skip: !endpoint.id
  });

  const endpointState = useContext(EndpointFormContext);
  const dispatch = useContext(EndpointFormDispatchContext);

  useEffect(() => {
    dispatch({ payload: endpointTags || [], type: "set_tag_ids" });
  }, [endpointTags, dispatch]);

  const saveEndpoint = async () => {
    const partialEndpoint: Partial<Endpoint> = collectPayload(formType, endpointState);

    setLoading(true);

    try {
      const result: Endpoint = formType === "create" ? (
        await EndpointService.create(partialEndpoint)
      ) : (
        await EndpointService.update(endpoint.id, partialEndpoint)
      );

      reloadEndpointTags();
      onEndpointUpserted(result);
      setErrors([]);
    } catch (e) {
      setErrors(e.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Should respond to enter key (when the user wants to send the form).
  const form = useMemo(() => (
    <div className="mb-2">
      { formType === "create" ? <RequiredFields/> : <AdvancedConfiguration/> }
      <ErrorList className="mt-8" errors={ errors } />
    </div>
  ), [formType, errors]);

  return children(form, saveEndpoint, loading);
};

const createBlankEndpoint = () => {
  const result = new Endpoint();
  return result;
};

export const EndpointForm = (props: EditFormProps) => {
  const endpoint = props.endpoint.id ? props.endpoint : createBlankEndpoint();

  return (
    <EndpointFormContextProvider endpoint={ endpoint }>
      <EndpointFormAux { ...props }/>
    </EndpointFormContextProvider>
  );
};
