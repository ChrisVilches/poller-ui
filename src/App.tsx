import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SideBar } from "./components/SideBar";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./pages/NotFound";
import { Pollings } from "./pages/Pollings";
import { TagEndpoints } from "./pages/TagEndpoints";
import { store } from "./store";

const App = () => (
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
      theme="dark" />

    <div className="container mx-auto h-screen">
      <SideBar />
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

export default App;
