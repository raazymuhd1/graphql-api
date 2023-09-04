"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "please provide a username"], unique: true },
    email: { type: String, required: [true, "please provide a email"], unique: true },
    password: { type: String, required: [true, "please provide a password"] },
    image: { type: String },
    bannerImage: { type: String },
    followers: { type: Number },
    resetPasswordToken: { type: String }
}, { timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});
UserSchema.index({ _id: 1, name: 1 });
exports.User = (0, mongoose_1.model)("User", UserSchema);
