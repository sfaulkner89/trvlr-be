"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const app = express();
app.use((0, cors_1.default)());
app.use(express.json());
app.use(index_1.default);
app.listen(process.env.PORT || 8080, () => console.log('listenin'));
//# sourceMappingURL=index.js.map