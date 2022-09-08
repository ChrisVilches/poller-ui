import { Button, Modal } from "flowbite-react";
import React from "react";
import { Endpoint } from "../../models/Endpoint";
import { EndpointForm } from "./EndpointForm";

interface NewModalProps {
  show: boolean;
  closeModal: any; // TODO: any
  itemAdded: (e: Endpoint) => void;
}

export const NewModal = ({ show, closeModal, itemAdded }: NewModalProps) => {
  const endpoint = new Endpoint()

  return (
    <React.Fragment>
      <Modal
        show={show}
        onClose={closeModal}
      >
        <Modal.Header>
          Create Endpoint
        </Modal.Header>
        <Modal.Body>
          <EndpointForm
            endpoint={endpoint}
            formType="create"
            onEndpointUpserted={itemAdded} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={closeModal}
            color="gray"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
