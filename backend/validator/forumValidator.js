import {body} from "express-validator"

const forumValidator=[
    body("content").isAlphanumeric("de-DE",{ignore:" ';:()/,.-!?"}).withMessage("signs like that are not allowed!"),
    body("subject").isAlphanumeric("de-DE",{ignore:" ';:()/,.-!?"}).withMessage("signs like that are not allowed!"),
]

export default forumValidator