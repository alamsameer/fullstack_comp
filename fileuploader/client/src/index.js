import { StrictMode } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import Fileupload from "./Fileupload";

const rootElement = document.getElementById("root");


ReactDOM.render(
  <StrictMode>
    <Fileupload />
  </StrictMode>,rootElement
);
