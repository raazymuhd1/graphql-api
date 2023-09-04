import { Schema, model } from "mongoose";
import { Comment } from "./comment.model.js"
import { IPostSchema } from "../types/post.types"

const PostSchema = new Schema<IPostSchema>({
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
        type: [Comment], 
        ref: Comment
     }
}, {
   timestamps: true
})


export const Post = model<IPostSchema>("Post", PostSchema)