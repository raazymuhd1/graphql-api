"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const comment_model_js_1 = require("./comment.model.js");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "please provide a title"],
        minLength: 8
    },
    description: {
        type: String,
        required: [true, "please provide a description"],
        minLength: 20
    },
    image: {
        type: String,
        required: [true, "please provide an image"]
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: {
        type: [comment_model_js_1.Comment],
        ref: comment_model_js_1.Comment
    }
}, {
    timestamps: true
});
exports.Post = (0, mongoose_1.model)("Post", PostSchema);
