import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { Endpoint } from "../models/Endpoint";
import { PollingService } from "../services/PollingService";

interface TriggerPollingConfirmDialogProps {
  show: boolean;
  closeModal: () => void;
  endpoint: Endpoint;
  onTriggerComplete: (e: Endpoint) => void
}

export const TriggerPollingConfirmDialog = ({
  show,
  closeModal,
  endpoint,
  onTriggerComplete
}: TriggerPollingConfirmDialogProps) => {
  const [loading, setLoading] = useState(false);
  
  const triggerPolling = async () => {
    setLoading(true);

    try {
      const result: Endpoint = await PollingService.enqueuePolling(endpoint.id);
      onTriggerComplete(result);
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
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to trigger a polling?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                disabled={ loading }
                onClick={ triggerPolling }
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
