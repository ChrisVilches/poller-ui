import { CloudArrowDownIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "flowbite-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Endpoint } from "../models/Endpoint";
import { setSelectedEndpoint, toggleEditModal, togglePollDialog, toggleRemoveDialog } from "../slices/endpointOptionsSlice";

interface EndpointOptionsProps {
  endpoint: Endpoint;
}

export const EndpointOptions = ({ endpoint }: EndpointOptionsProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Dropdown
        label={ <EllipsisVerticalIcon className="w-6 h-6" /> }
        arrowIcon={ false }
        inline={ true }
      >
        <Dropdown.Item onClick={ () => {
          dispatch(setSelectedEndpoint({ endpoint }));
          dispatch(toggleEditModal());
        } }>
          <PencilIcon className="w-6 h-6 pr-2" /> Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={ () => {
          dispatch(setSelectedEndpoint({ endpoint }));
          dispatch(togglePollDialog());
        } }>
          <CloudArrowDownIcon className="w-6 h-6 pr-2" /> Trigger polling
        </Dropdown.Item>
        <Dropdown.Item onClick={ () => {
          dispatch(setSelectedEndpoint({ endpoint }));
          dispatch(toggleRemoveDialog());
        } }>
          <TrashIcon className="w-6 h-6 pr-2" /> Remove
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};
