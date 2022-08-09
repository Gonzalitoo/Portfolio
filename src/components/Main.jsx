import React from "react";
import { Divider } from "primereact/divider";

import { Home } from "./Home";
import { Projects } from "./Projects";

export const Main = () => {

  return (
    <>
      <Home/>
      <Divider />
      <Projects />
      <Divider />
    </>
  );
};
