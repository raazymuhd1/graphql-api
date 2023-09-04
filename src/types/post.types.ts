import { Types } from "mongoose"
import { Comment } from "../models/comment.model";

interface IPostSchema {
    id: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    likes?: Types.Array<string>;
    dislikes?: Types.Array<string>;
    comments?: Types.DocumentArray<Comment>;
}

type CreatePostArgs = Pick<IPostSchema, "title" | "description">

type UpdatePostArgs = {
    id: string;
    post: Pick<IPostSchema, "title" | "description">
}


export { CreatePostArgs, UpdatePostArgs, IPostSchema }