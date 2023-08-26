import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: [true, "please provide a username"], unique: true },
    email: { type: String, required: [true, "please provide a email"], unique: true },
    password: { type: String, required: [true, "please provide a password"]},
    image: { type: String },
    bannerImage: { type:  String },
    followers: { type: Number },
    resetPasswordToken: { type: String }

}, 
{ timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
} 
})

UserSchema.index({ _id: 1, name: 1 })

export const User = model("User", UserSchema)