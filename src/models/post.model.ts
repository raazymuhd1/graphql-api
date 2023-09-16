import { Schema, model, Types } from "mongoose";
import { Comment } from "./comment.model.js"
import { IPostSchema, IComment } from "../types/post.types"

const PostSchema = new Schema<IPostSchema>({
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
        type: Types.ObjectId,
        ref: "Comment"
     }]
}, {
   timestamps: true
})

PostSchema.index({ title: 1 })
export const Post = model<IPostSchema>("Post", PostSchema)