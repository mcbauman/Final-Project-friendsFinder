let validator = require("node-email-validation")

validator.is_email_valid("test@email.com", function(error, result) {
    if (err) {
        console.log(err)
    }   else {
        console.log(result)
    }
})

