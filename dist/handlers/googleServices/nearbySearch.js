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
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('yo');
    const location = `${req.query.latitude}%2C${req.query.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&rankby=distance&key=${process.env.GOOGLE_API_KEY}`;
    const results = yield (yield (0, node_fetch_1.default)(url)).json();
    const mappedResult = [results.results[0]].map(place => {
        return {
            location: place.geometry.location,
            placeId: place.place_id,
            names: {
                main_text: place.name,
                secondary_text: place.vicinity
            }
        };
    })[0];
    res.status(200).json(mappedResult);
});
//# sourceMappingURL=nearbySearch.js.map