/*
Що робить ця функція?
1. Дістає заголовок Authorization із req.headers.
2. Розділяє заголовок на 2 частини (слова)
3. Якщо перше слово не Bearer - викидає 401 помилку.
4. Перевіряє чи токен валідний. Якщо ні, то викидає 401 помилку.
5. Шукає в базі користувача з таким id. Якщо нмає, то викидає 401 помилку
*/

const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { RequestError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer = "", token = ""] = authorization.split(" ");
        if (bearer !== "Bearer") {
            throw RequestError(401, "Not authorized");
        }
        try {
            const { id } = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);
            if (!user || !user.token) {
                throw Error("Unauthorized");
            }
            req.user = user;
            next();
        } catch (error) {
            throw RequestError(401, error.message);
        }
    } catch (error) {
        next(error);
    }
    
};

module.exports = authenticate;