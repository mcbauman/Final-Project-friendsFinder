import React from 'react';
import reactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./components/style.scss"
import ContextProvider from "./components/context";
import "./components/style.scss"

reactDom.render(<ContextProvider><BrowserRouter><App/></BrowserRouter></ContextProvider>,document.getElementById("root"))

