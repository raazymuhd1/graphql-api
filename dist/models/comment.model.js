"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    description: { type: String, required: [true, "please add some description"] },
    commentedBy: { type: String }
}, {
    timestamps: true
});
exports.Comment = (0, mongoose_1.model)("Comment", CommentSchema);
