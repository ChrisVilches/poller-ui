import { Button, Modal } from "flowbite-react";
import React, { ReactElement } from "react";
import { EndpointForm } from "./EndpointForm";
import { Endpoint } from "../../models/Endpoint";

interface NewModalProps {
  show: boolean;
  closeModal: () => void;
  itemAdded: (e: Endpoint) => void;
}

export const NewModal = ({ show, closeModal, itemAdded }: NewModalProps) => (
  <EndpointForm endpoint={ new Endpoint() } onEndpointUpserted={ itemAdded } formType="create">
    { (form: ReactElement, saveButton: ReactElement): ReactElement => (
      <Modal
        show={ show }
        onClose={ closeModal }
      >
        <Modal.Header>
          Create Endpoint
        </Modal.Header>
        <Modal.Body>
          { form }
        </Modal.Body>
        <Modal.Footer>
          { saveButton }
          <Button
            onClick={ closeModal }
            color="gray"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    ) }
  </EndpointForm>
);
