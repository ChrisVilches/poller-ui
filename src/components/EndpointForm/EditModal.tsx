import { Button, Modal } from "flowbite-react";
import React from "react";
import { Endpoint } from "../../models/Endpoint";
import { EndpointForm } from "./EndpointForm";

interface EditModalProps {
  show: boolean;
  closeModal: any; // TODO: any
  endpoint: Endpoint;
  itemEdited: (e: Endpoint) => void;
}

export const EditModal = ({ endpoint, show, closeModal, itemEdited }: EditModalProps) => (
  <React.Fragment>
    <Modal
      show={show}
      onClose={closeModal}
    >
      <Modal.Header>
        Edit Endpoint
      </Modal.Header>
      <Modal.Body>
        <EndpointForm
          endpoint={endpoint}
          formType="edit"
          onEndpointUpserted={itemEdited} />
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
