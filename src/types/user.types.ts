import { Types } from "mongoose";

interface IUserSchema {
    id: Types.ObjectId;
    name: string,
    email: string;
    password: string;
    image?: string;
    bannerImage?: string;
    followers?: number;
    resetPasswordToken?: string;
}

interface IUser {
    id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}


type RegisterArgs = {
    user: Omit<IUser, "id">
}

type LoginArgs = {
    user: Pick<IUser, "email" | "password">
}

type UpdateArgs = {
    id: string;
    userData: Partial<Omit<IUser, "id">> 
}


export { RegisterArgs, LoginArgs, UpdateArgs, IUserSchema }