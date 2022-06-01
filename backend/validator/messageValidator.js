import { body } from "express-validator";

export const messageRules = [
    body("message").isLength({min: 0, max: 200 }).withMessage("message-length"),
    body("message").isAlphanumeric("de-DE").withMessage("message-invalid"),
    body("message").trim(),
    body("message").blacklist("<SCRIPT>")
]