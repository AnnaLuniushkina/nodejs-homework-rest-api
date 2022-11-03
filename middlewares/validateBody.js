const { RequestError } = require("../helpers");

const validateBody = addSchema => {
    const func = (req, res, next) => {
        const { error } = addSchema.validate(req.body);
        if (error) {
            next(RequestError(400, error.message));
        }
        next();
    }
    return func;
}

module.exports = validateBody;