import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    passqord: {type: String, required: true},
});

export const UserModel = moogoose.model("users", UserSchema)