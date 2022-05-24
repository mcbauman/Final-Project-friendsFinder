import {body} from "express-validator"

const userValidator=[
    body("email").isEmail().withMessage("incorrect Email"),
    body("password").isStrongPassword().optional({nullable: true}).withMessage("password is to weak"),
]

export default userValidator