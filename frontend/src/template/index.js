import React, { useEffect, useContext } from "react";
import context from "../utils/context";
import Notebooks from "./notebooks";
import Notes from "./notes";
import Main from "./main";

const Template = () => {
  const globalState = useContext(context);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(data => {
        globalState.setData(data);
      });
  }, []);

  return (
    <div className="container">
      <Notebooks />
      <Notes />
      <Main />
    </div>
  );
};

export default Template;
