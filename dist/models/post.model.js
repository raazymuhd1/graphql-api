"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    author: { type: String, required: true, unique: true },
    title: {
        type: String,
        unique: true,
        required: [true, "please provide a title"],
        minLength: [8, "minimum title lenght is 8 char"]
    },
    description: {
        type: String,
        unique: true,
        required: [true, "please provide a description"],
        minLength: 20
    },
    categories: {
        type: [String],
        required: [true, "please provide atleast 1 category related to post"]
    },
    image: {
        type: String,
        required: [true, "please provide an image"]
    },
    likes: { type: [String], default: [''] },
    dislikes: { type: [String], default: [''] },
    comments: [{
            type: mongoose_1.Types.ObjectId,
            ref: "Comment"
        }]
}, {
    timestamps: true
});
PostSchema.index({ title: 1 });
exports.Post = (0, mongoose_1.model)("Post", PostSchema);
