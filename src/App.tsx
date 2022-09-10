import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Nav } from "./components/Nav";
import { TagMenu } from "./components/TagMenu";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./pages/NotFound";
import { TagEndpoints } from "./pages/TagEndpoints";

const App = () => {
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
      <Nav />
      <hr />
      <TagMenu/>
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="about" element={ <About /> } />
          <Route path="tag/:id" element={ <TagEndpoints /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
