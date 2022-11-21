"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const latitude = String(req.query.latitude);
    const longitude = String(req.query.longitude);
    const place = yield (0, node_fetch_1.default)(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude.slice(0, 9)},${longitude.slice(0, 9)}&key=${process.env.GOOGLE_API_KEY}`).then(place => place.json());
    console.log(place.results[0].address_components);
    res.status(200).json(place.results[0].address_components);
});
//# sourceMappingURL=getMapAreaName.js.map