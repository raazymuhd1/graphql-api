import { model, Schema } from "mongoose";
import { IComment } from "../types/post.types"

const CommentSchema = new Schema<IComment>({
    description: { type: String, required: [true, "please add some description"] },
    commentedBy: { type: String }
}, {
    timestamps: true
})


export const Comment = model<IComment>("Comment", CommentSchema)