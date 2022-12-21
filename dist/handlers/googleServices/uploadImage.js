"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("firebase/storage");
const firebaseConfig_1 = require("../../config/firebaseConfig");
exports.default = profilePic => {
    const picStream = new ReadableStream(profilePic);
    const url = (0, storage_1.uploadBytes)(firebaseConfig_1.profilePicRef, picStream).then(snapshot => console.log(snapshot));
};
//# sourceMappingURL=uploadImage.js.map