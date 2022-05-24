import {body} from "express-validator"

const userValidator=[
    body("email").isEmail().withMessage("incorrect Email"),
    body("password").isStrongPassword().withMessage("password is to weak"),
]

export default userValidator