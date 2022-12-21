"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.ProfileSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.ProfileSchema = new Schema({
    id: String,
    email: String,
    password: String,
    username: String,
    displayName: String,
    dob: String,
    profilePicture: String,
    followers: Array,
    following: Array
});
exports.Profile = mongoose_1.default.model('Profile', exports.ProfileSchema);
//# sourceMappingURL=Profile.js.map