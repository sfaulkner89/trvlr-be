"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getMapAreaName_1 = __importDefault(require("../handlers/googleServices/getMapAreaName"));
const router = express_1.default.Router();
router.get('/get-map-area-name', (req, res) => (0, getMapAreaName_1.default)(req, res));
exports.default = router;
//# sourceMappingURL=index.js.map