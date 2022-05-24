import { validationResult } from 'express-validator'

function requestValidator(rules) {
    const middlewares = [...rules]
    middlewares.push((req, res, next) => {
        const validationResults = validationResult(req)
        if (validationResults.isEmpty()) {
            return next()
        }
        const niceErrors = validationResults.array().map(err => {
            // Computed Object Properties at work!
            return { [err.param]: err.msg }
        })
        next({status:400,errors:niceErrors})
    })
    return middlewares
}

export default requestValidator