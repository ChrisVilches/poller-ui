import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { EndpointTitle } from "./EndpointTitle";
import { Endpoint } from "../models/Endpoint";
import { EndpointService } from "../services/EndpointService";

interface RemoveConfirmDialogProps {
  show: boolean;
  closeModal: () => void;
  endpoint: Endpoint;
  onRemoved: (e: Endpoint) => void
}

export const RemoveConfirmDialog = ({ show, closeModal, endpoint, onRemoved }: RemoveConfirmDialogProps) => {
  const [loading, setLoading] = useState(false);
  
  const executeRemove = async () => {
    setLoading(true);

    try {
      const result: Endpoint = await EndpointService.remove(endpoint.id);
      onRemoved(result);
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={ show }
        size="md"
        popup={ true }
        onClose={ closeModal }
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <TrashIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove endpoint <b><EndpointTitle title={ endpoint.title }/></b>?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                disabled={ loading }
                onClick={ executeRemove }
              >
                Yes
              </Button>
              <Button
                color="gray"
                onClick={ closeModal }
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
