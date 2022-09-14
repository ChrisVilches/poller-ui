import React from "react";
import { Provider } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { TagMenu } from "./components/TagMenu";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./pages/NotFound";
import { Pollings } from "./pages/Pollings";
import { TagEndpoints } from "./pages/TagEndpoints";
import { store } from "./store";

const GithubIcon = () => (
  <>
    <span className="sr-only">GitHub</span>
    <svg viewBox="0 0 16 16" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
      1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
      1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0
      3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0
      0016 8c0-4.42-3.58-8-8-8z">
      </path>
    </svg>
  </>
);

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

      <div className="container mx-auto h-screen">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-col h-screen px-4 py-8">
              <div className="md:grow">
                <TagMenu/>
              </div>
              <div className="flex items-center space-x-4">
                <a href="https://github.com/ChrisVilches/poller-ui"
                  target="_blank"
                  className="footer-link"
                  rel="noreferrer">
                  <GithubIcon/>
                </a>
                <Link to="/about" className="footer-link">About</Link>
              </div>
            </div>
          </div>

          <main className="col-span-12 md:col-span-9 px-4 py-8">
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
      </div>
    </Provider>
  );
};

export default App;
