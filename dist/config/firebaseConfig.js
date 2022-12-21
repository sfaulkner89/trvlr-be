"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePicRef = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: 'AIzaSyCVySrlR1BuEKJBSdCx7sIIiUoYyw8ORQM',
    authDomain: 'hale-trilogy-369214.firebaseapp.com',
    projectId: 'hale-trilogy-369214',
    storageBucket: 'hale-trilogy-369214.appspot.com',
    messagingSenderId: '611386856103',
    appId: '1:611386856103:web:d18bb6f162961a73394182',
    measurementId: 'G-DRMMJEFZG7'
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)(app);
exports.profilePicRef = (0, storage_1.ref)(storage, 'profilepics');
//# sourceMappingURL=firebaseConfig.js.map