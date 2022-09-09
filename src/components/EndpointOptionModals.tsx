import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Endpoint } from "../models/Endpoint";
import { updateItem, removeItem } from "../slices/endpointListSlice";
import { toggleEditModal, togglePollDialog, toggleRemoveDialog } from "../slices/endpointOptionsSlice";
import { useFindAllQuery } from "../slices/tagSlice";
import { RootState } from "../store";
import { EditModal } from "./EndpointForm/EditModal";
import { RemoveConfirmDialog } from "./RemoveConfirmDialog";
import { TriggerPollingConfirmDialog } from "./TriggerPollingConfirmDialog";

export const EndpointOptionModals = () => {
  const dispatch = useDispatch();

  // TODO: Name?? What resource is this?
  //       It's "tag menu", but the name doesn't say anything.
  const { refetch: reloadTagMenu } = useFindAllQuery();

  const { selectedEndpoint, showEditModal, showPollDialog, showRemoveDialog } = useSelector((state: RootState) => state.endpointOptions);

  const onItemWasUpdated = (endpoint: Endpoint) => {
    dispatch(updateItem({ endpointId: endpoint.id, endpoint }));
    toast.success("Updated!");
    dispatch(toggleEditModal())
    reloadTagMenu();
  };

  const onPollingTriggered = () => {
    dispatch(togglePollDialog())
    toast.success("Site was polled");
  };

  const onRemoved = (endpoint: Endpoint) => {
    dispatch(toggleRemoveDialog())
    toast.success("Removed!");
    dispatch(removeItem({ endpoint }));
    reloadTagMenu();
  };

  if(!selectedEndpoint) {
    return <></>
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
  )
}
