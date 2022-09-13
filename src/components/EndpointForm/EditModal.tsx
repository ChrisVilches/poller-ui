import React, { ReactElement } from "react";
import { EndpointForm } from "./EndpointForm";
import { Endpoint } from "../../models/Endpoint";
import { Dialog, Transition } from '@headlessui/react'

interface EditModalProps {
  endpoint: Endpoint;
  show: boolean;
  closeModal: () => void;
  itemEdited: (e: Endpoint) => void;
}

export const EditModal = ({ endpoint, show, closeModal, itemEdited }: EditModalProps) => (
  <EndpointForm endpoint={endpoint} onEndpointUpserted={itemEdited} formType="edit">
    {(form: ReactElement, onEndpointSave: () => void, saveLoading: boolean): ReactElement => (
      <Transition appear show={show} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-black opacity-95 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-center text-slate-100 mb-10"
                  >
                    Edit Endpoint
                  </Dialog.Title>
                  <div className="mb-8">
                    {form}
                  </div>

                  <div className="space-x-4">
                    <button className="btn btn-primary" onClick={onEndpointSave} disabled={saveLoading}>
                      Update
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal} color="gray">
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )}
  </EndpointForm>
);
