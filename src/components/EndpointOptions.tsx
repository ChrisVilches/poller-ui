import { CloudArrowDownIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Endpoint } from "../models/Endpoint";
import {
  setSelectedEndpoint,
  toggleEditModal,
  togglePollDialog,
  toggleRemoveDialog
} from "../slices/endpointOptionsSlice";
import { Menu, Transition } from '@headlessui/react'

interface EndpointOptionsProps {
  endpoint: Endpoint;
}

export const EndpointOptions = ({ endpoint }: EndpointOptionsProps) => {
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setSelectedEndpoint({ endpoint: null }));
  }, [dispatch]);

  const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ]

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button><EllipsisVerticalIcon className="w-6 h-6" /></Menu.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute p-2 right-0 mt-2 w-56 origin-top-right rounded-md bg-black opacity-95 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item as="button"
                className="w-full text-left hover:bg-slate-900 p-3 rounded-md ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                onClick={ () => {
                  dispatch(setSelectedEndpoint({ endpoint }));
                  dispatch(toggleEditModal());
                } }>
                <PencilIcon className="w-6 h-6 pr-2 inline" /> Edit
              </Menu.Item>

              <Menu.Item onClick={ () => { dispatch(setSelectedEndpoint({ endpoint })); dispatch(togglePollDialog()); } }
                as="button"
                className="w-full text-left hover:bg-slate-900 p-3 rounded-md ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black">
                <CloudArrowDownIcon className="w-6 h-6 pr-2 inline" /> Trigger polling
              </Menu.Item>

              <Menu.Item
                className="w-full text-left hover:bg-slate-900 p-3 rounded-md ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                as="button"
                onClick={ () => { dispatch(setSelectedEndpoint({ endpoint })); dispatch(toggleRemoveDialog()); } }>
                <TrashIcon className="w-6 h-6 pr-2 inline" /> Remove
              </Menu.Item>

            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
};
