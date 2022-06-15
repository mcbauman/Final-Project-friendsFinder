import React from 'react';
import reactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"



import "./style.scss"
// import dotenv from "dotenv"


reactDom.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById("root"))
