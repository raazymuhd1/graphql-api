import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: [true, "please provide a username"] },
    email: { type: String, required: [true, "please provide a email"] },
    password: { type: String, required: [true, "please provide a password"] },
    image: { String },
    resetPasswordToken: { type: String }
})


export const User = model("User", UserSchema)