"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.UserSchema = new Schema({
    id: String,
    email: String,
    password: String,
    username: String,
    displayName: String,
    dob: String,
    profileLocation: String,
    followers: Array,
    following: Array,
    countries: Array,
    lists: Array,
    groups: Array
});
exports.User = mongoose_1.default.model('profiles', exports.UserSchema);
//# sourceMappingURL=User.js.map