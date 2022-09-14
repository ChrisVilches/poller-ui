import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
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
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={ show } as={ React.Fragment }>
        <Dialog as="div" className="relative z-10" onClose={ closeModal }>
          <Transition.Child
            as={ React.Fragment }
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-red-300 bg-opacity-25 backdrop-blur-sm"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={ React.Fragment }
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl
                bg-black opacity-90 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-center text-slate-100 mb-10"
                  >
                    <TrashIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    Are you sure you want to remove tag <b>{ tag.name }</b>?
                  </Dialog.Title>
                  
                  <div className="flex justify-center gap-4">
                    <button disabled={ loading } onClick={ executeRemove } className="btn btn-danger">
                      Yes
                    </button>

                    <button onClick={ closeModal } className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
