import {body} from "express-validator"

const commentValidator=[
    body("comment").isAlphanumeric("de-DE",{ignore:" ';:()/,.-!?"}).withMessage("signs like that are not allowed!"),
]

export default commentValidator