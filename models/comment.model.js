import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
    description: { type: String, required: [true, "please add some description"] },
    commentedBy: { type: String }
}, {
    timestamps: true
})


export const Comment = model("Comment", CommentSchema)