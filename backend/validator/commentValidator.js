import {body} from "express-validator"

const commentValidator=[
    body("content").isAlphanumeric(['de-DE'," ,.-!?"]).withMessage("signs like that are not allowed!"),
    body("subject").isAlphanumeric(['de-DE'," ,.-!?"]).withMessage("signs like that are not allowed!"),
]

export default commentValidator