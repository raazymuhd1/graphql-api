import { Schema, model } from "mongoose";

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
     }
})


export const Post = model("Post", PostSchema)