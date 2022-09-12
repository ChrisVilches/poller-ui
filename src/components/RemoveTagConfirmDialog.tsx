import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tag } from "../models/Tag";
import { TagService } from "../services/TagService";
import { useFindAllTagsQuery } from "../slices/tagSlice";

interface RemoveTagConfirmDialogProps {
  show: boolean;
  tag: Tag;
  closeModal: () => void;
}

// TODO: Some "loading" states have the "is" prefix, and some don't. Make it consistent.
export const RemoveTagConfirmDialog = ({ show, tag, closeModal }: RemoveTagConfirmDialogProps) => {
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const { refetch: reloadTagMenu } = useFindAllTagsQuery();

  const executeRemove = async () => {
    setLoading(true);

    try {
      const result: Tag = await TagService.remove(tag.id);
      toast.success(`Tag '${result.name}' removed!`);
      reloadTagMenu();
      navigate("/");
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
              Are you sure you want to remove tag <b>{ tag.name }</b>?
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
