import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EditModal } from "./EndpointForm/EditModal";
import { RemoveConfirmDialog } from "./RemoveConfirmDialog";
import { TriggerPollingConfirmDialog } from "./TriggerPollingConfirmDialog";
import { EndpointListDispatchContext } from "../contexts/EndpointListContext";
import { Endpoint } from "../models/Endpoint";
import { toggleEditModal, togglePollDialog, toggleRemoveDialog } from "../slices/endpointOptionsSlice";
import { useFindAllTagsQuery } from "../slices/tagSlice";
import { RootState } from "../store";

export const EndpointOptionModals = () => {
  const optionsDispatch = useDispatch();

  const { refetch: reloadTagMenu } = useFindAllTagsQuery();

  const endpointListContextDispatch = useContext(EndpointListDispatchContext);

  const {
    selectedEndpoint,
    showEditModal,
    showPollDialog,
    showRemoveDialog
  } = useSelector((state: RootState) => state.endpointOptions);

  const onItemWasUpdated = (endpoint: Endpoint) => {
    endpointListContextDispatch({ payload: { endpoint, endpointId: endpoint.id }, type: "update_item" });
    toast.success("Updated!");
    optionsDispatch(toggleEditModal());
    reloadTagMenu();
  };

  const onPollingTriggered = () => {
    optionsDispatch(togglePollDialog());
    toast.success("Site was polled");
  };

  const onRemoved = (endpoint: Endpoint) => {
    optionsDispatch(toggleRemoveDialog());
    toast.success("Removed!");
    endpointListContextDispatch({ payload: { endpointId: endpoint.id }, type: "remove_item" });
    reloadTagMenu();
  };

  if(!selectedEndpoint) {
    return <></>;
  }

  return (
    <>
      <EditModal
        endpoint={ selectedEndpoint }
        show={ showEditModal }
        closeModal={ () => optionsDispatch(toggleEditModal()) }
        itemEdited={ onItemWasUpdated } />

      <TriggerPollingConfirmDialog
        endpoint={ selectedEndpoint }
        show={ showPollDialog }
        onTriggerComplete={ onPollingTriggered }
        closeModal={ () => optionsDispatch(togglePollDialog()) } />

      <RemoveConfirmDialog
        endpoint={ selectedEndpoint }
        show={ showRemoveDialog }
        closeModal={ () => optionsDispatch(toggleRemoveDialog()) }
        onRemoved={ onRemoved } />
    </>
  );
};
