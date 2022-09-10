import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EditModal } from "./EndpointForm/EditModal";
import { RemoveConfirmDialog } from "./RemoveConfirmDialog";
import { TriggerPollingConfirmDialog } from "./TriggerPollingConfirmDialog";
import { EndpointListContext } from "../contexts/EndpointListContext";
import { Endpoint } from "../models/Endpoint";
import { toggleEditModal, togglePollDialog, toggleRemoveDialog } from "../slices/endpointOptionsSlice";
import { useFindAllQuery } from "../slices/tagSlice";
import { RootState } from "../store";

export const EndpointOptionModals = () => {
  const dispatch = useDispatch();

  // TODO: Name?? What resource is this?
  //       It's "tag menu", but the name doesn't say anything.
  const { refetch: reloadTagMenu } = useFindAllQuery();

  const { dispatch: endpointListContextDispatch } = useContext(EndpointListContext);

  const {
    selectedEndpoint,
    showEditModal,
    showPollDialog,
    showRemoveDialog
  } = useSelector((state: RootState) => state.endpointOptions);

  const onItemWasUpdated = (endpoint: Endpoint) => {
    endpointListContextDispatch({ payload: { endpoint, endpointId: endpoint.id }, type: "update_item" });
    toast.success("Updated!");
    dispatch(toggleEditModal());
    reloadTagMenu();
  };

  const onPollingTriggered = () => {
    dispatch(togglePollDialog());
    toast.success("Site was polled");
  };

  const onRemoved = (endpoint: Endpoint) => {
    dispatch(toggleRemoveDialog());
    toast.success("Removed!");
    endpointListContextDispatch({ payload: { endpointId: endpoint.id }, type: "remove_item" });
    reloadTagMenu();
  };

  console.log(selectedEndpoint);

  if(!selectedEndpoint) {
    return <></>;
  }

  return (
    <>
      <EditModal
        endpoint={ selectedEndpoint }
        show={ showEditModal }
        closeModal={ () => dispatch(toggleEditModal()) }
        itemEdited={ onItemWasUpdated } />

      <TriggerPollingConfirmDialog
        endpoint={ selectedEndpoint }
        show={ showPollDialog }
        onTriggerComplete={ onPollingTriggered }
        closeModal={ () => dispatch(togglePollDialog()) } />

      <RemoveConfirmDialog
        endpoint={ selectedEndpoint }
        show={ showRemoveDialog }
        closeModal={ () => dispatch(toggleRemoveDialog()) }
        onRemoved={ onRemoved } />
    </>
  );
};
