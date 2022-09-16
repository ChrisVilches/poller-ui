import { Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ButtonIcon } from "./components/ButtonIcon";
import { Footer } from "./components/Footer";
import { TagMenu } from "./components/TagMenu";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./pages/NotFound";
import { Pollings } from "./pages/Pollings";
import { TagEndpoints } from "./pages/TagEndpoints";
import { store } from "./store";

const App = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <Provider store={ store }>
      <ToastContainer
        position="bottom-right"
        autoClose={ 5000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="container mx-auto h-screen">
        <div className="hidden md:flex flex-col h-screen px-4 py-8 fixed w-80">
          <div className="grow">
            <TagMenu/>
          </div>
          <Footer/>
        </div>

        <Transition show={ showMenu } className="z-50 fixed inset-0 block md:hidden">
          <Transition.Child
            as={ React.Fragment }
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm w-screen h-screen"/>
          </Transition.Child>

          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/**
             * Close the menu when the user clicks outside of it.
             *
             * This button must have a margin-left such that the region outside
             * the sidebar becomes clickable.
             *
             * Other solutions involving DOM operations are trickier.
            */}
            <button type="button" className="ml-80 w-screen h-screen absolute cursor-default" onClick={() => setShowMenu(false)}/>

            <div className="bg-black h-screen px-4 py-8 opacity-95 mobile-sidebar">
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
            </div>
          </Transition.Child>
        </Transition>

        <div className="md:hidden flex justify-end p-4">
          <button type="button" onClick={ () => setShowMenu(true) } className="p-4 rounded-md bg-blue-900">
            <Bars3Icon className="w-6 h-6"/>
          </button>
        </div>
        <main className="mx-4 py-8 md:pl-80">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="about" element={ <About /> } />
            <Route path="tag/:id" element={ <TagEndpoints /> } />
            <Route path="pollings" element={ <Pollings /> } />
            <Route path="pollings/:endpointId" element={ <Pollings /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </main>
      </div>

    </Provider>
  );
};

export default App;
