import { Types } from "mongoose"
import { Comment } from "../models/comment.model";

interface IComment {
    _id: Types.ObjectId;
    description: string;
    commentedBy: string;
}

interface IPostSchema {
    _id: Types.ObjectId;
    author: string;
    title: string;
    description: string;
    categories: string[],
    image: string;
    likes?: Types.Array<string>;
    dislikes?: Types.Array<string>;
    comments?: Types.DocumentArray<IComment>;
}

type CreatePostArgs = {
    post: Pick<IPostSchema, "author" | "title" | "description" | "image">
}

type CreatePostReturn = Pick<IPostSchema, "author" | "title" | "description" | "image">

type UpdatePostArgs = {
    id: string;
    postData: Partial<Pick<IPostSchema, "author" | "title" | "description" | "image">>
}

type PostReturn = {
    msg: string;
}

export { CreatePostArgs, UpdatePostArgs, IPostSchema, IComment, PostReturn, CreatePostReturn }