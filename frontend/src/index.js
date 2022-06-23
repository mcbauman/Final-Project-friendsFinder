import React from 'react';
import reactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./components/style.scss"
import ContextProvider from "./components/context";
import "./style.scss"
import dotenv from "dotenv"

reactDom.render(<ContextProvider><BrowserRouter><App/></BrowserRouter></ContextProvider>,document.getElementById("root"))

