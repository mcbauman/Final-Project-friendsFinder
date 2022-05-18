import reactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

import env from "react-dotenv"
import react from "react"

import "./style.scss"
// import dotenv from "dotenv"

console.log(env.MARVEL_PUBLIC_KEY);
console.log(window.env.MARVEL_PUBLIC_KEY);

reactDom.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById("root"))