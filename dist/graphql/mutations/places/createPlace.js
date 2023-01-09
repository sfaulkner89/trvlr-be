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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlace = exports.initializePlace = void 0;
const PlaceType_1 = require("../../../graphql/types/PlaceType");
const Place_1 = require("../../../graphql/schema/Place");
const uuid_1 = require("uuid");
const createList_1 = require("../lists/createList");
const initializePlace = (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPlace = yield Place_1.Place.findOne({
        googlePlaceId: args.googlePlaceId
    });
    if (existingPlace) {
        return existingPlace;
    }
    const place = new Place_1.Place({
        id: (0, uuid_1.v4)(),
        name: args.name,
        googlePlaceId: args.googlePlaceId,
        location: args.location,
        city: args.city,
        country: args.country,
        dateCreated: new Date(),
        dateModified: new Date(),
        ratings: args.rating ? [args.rating] : [],
        comments: args.comment ? [args.comment] : []
    });
    yield place.save();
    return place;
});
exports.initializePlace = initializePlace;
exports.createPlace = {
    type: PlaceType_1.PlaceType,
    description: 'Initialise a place',
    args: createList_1.placeArgs,
    resolve: exports.initializePlace
};
//# sourceMappingURL=createPlace.js.map