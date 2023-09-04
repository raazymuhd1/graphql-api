"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = async (req, res, next) => {
    res.send(`<h2> Page Not Found ${req.url} </h2>`);
};
exports.notFound = notFound;
