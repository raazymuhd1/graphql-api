import { Schema, model } from "mongoose";
import { Comment } from "./comment.model.js"

const PostSchema = new Schema({
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
     unlikes: { type: Number, default: 0 },
     comments: {
        type: [Comment], 
        ref: Comment
     }
}, {
   timestamps: true
})


export const Post = model("Post", PostSchema)