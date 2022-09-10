import { Button, Modal } from "flowbite-react";
import React, { ReactElement } from "react";
import { EndpointForm } from "./EndpointForm";
import { Endpoint } from "../../models/Endpoint";

interface EditModalProps {
  endpoint: Endpoint;
  show: boolean;
  closeModal: () => void;
  itemEdited: (e: Endpoint) => void;
}

export const EditModal = ({ endpoint, show, closeModal, itemEdited }: EditModalProps) => (
  <EndpointForm endpoint={ endpoint } onEndpointUpserted={ itemEdited } formType="edit">
    {
      (form: ReactElement, onEndpointSave: () => void, saveLoading: boolean): ReactElement => (
        <Modal
          show={ show }
          onClose={ closeModal }
        >
          <Modal.Header>
            Edit Endpoint
          </Modal.Header>
          <Modal.Body>
            { form }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ onEndpointSave } disabled={ saveLoading }>
              Update
            </Button>
            <Button onClick={ closeModal } color="gray">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }
  </EndpointForm>
);
