import React from "react";
import { ScrollTop } from "primereact/scrolltop";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";


function App() {
  
  return (
    <>
      <Header/>
      <Main/>
      <ScrollTop threshold={50} onHide={() => (window.location.hash = "")} />
      <Footer />
    </>
  );
}

export default App;
