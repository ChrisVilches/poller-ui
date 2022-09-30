import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ButtonIcon } from "./ButtonIcon";
import { Footer } from "./Footer";
import { TagMenu } from "./TagMenu";

export const SideBar = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <>
      <div className="hidden md:flex flex-col h-screen px-4 py-8 fixed w-80">
        <div className="grow">
          <TagMenu/>
        </div>
        <Footer/>
      </div>

      <Transition as={ React.Fragment } show={ showMenu }>
        <Dialog as="div" className="z-50 fixed inset-0 block md:hidden" onClose={ () => setShowMenu(false) }>
          <Transition.Child
            as={ React.Fragment }
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm w-screen h-screen md:hidden"/>
          </Transition.Child>

          <Transition.Child
            as={ React.Fragment }
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed inset-0 overflow-y-auto">
              <Dialog.Panel className="bg-black h-screen px-4 py-8 opacity-95 mobile-sidebar">
                <div className="flex flex-col h-full">
                  <ButtonIcon className="p-2 rounded-md bg-blue-900"
                    icon={ Bars3Icon }
                    onClick={ () => { setShowMenu(false); } }>
                    Close Menu
                  </ButtonIcon>
                  <div className="grow">
                    <TagMenu/>
                  </div>
                  <Footer/>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

      <div className="md:hidden flex justify-end p-4">
        <button type="button" onClick={ () => setShowMenu(true) } className="p-4 rounded-md bg-blue-900">
          <Bars3Icon className="w-6 h-6"/>
        </button>
      </div>
    </>
  );
};
