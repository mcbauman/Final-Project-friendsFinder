import { body } from "express-validator";

export const messageRules = [
    body("content").isLength({min: 0, max: 200 }).withMessage("message-length"),
    body("content").isAlphanumeric("de-DE",{ignore:" ';:()/,.-!?"}).withMessage("message-invalid"),
    body("content").trim(),
    body("content").blacklist("<SCRIPT>")
]

export default messageRules