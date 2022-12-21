"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.ListSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.ListSchema = new Schema({
    id: String,
    displayName: String,
    photoLocation: String,
    location: Object,
    city: String,
    country: String,
    dateCreated: String,
    dateModified: String,
    placeIds: Array,
    followers: Array
});
exports.List = mongoose_1.default.model('lists', exports.ListSchema);
//# sourceMappingURL=List.js.map