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
exports.createList = exports.placeArgs = void 0;
const graphql_1 = require("graphql");
const List_1 = require("../../../graphql/schema/List");
const uuid_1 = require("uuid");
const ListType_1 = require("../../../graphql/types/ListType");
const LatLngGQL_1 = require("../../../types/gqlInputTypes/LatLngGQL");
const createPlace_1 = require("../places/createPlace");
const PlaceCommentGQL_1 = require("../../../types/gqlInputTypes/PlaceCommentGQL");
const PlaceRatingGQL_1 = require("../../../types/gqlInputTypes/PlaceRatingGQL");
exports.placeArgs = {
    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    googlePlaceId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    location: { type: new graphql_1.GraphQLNonNull(LatLngGQL_1.LatLngGQL) },
    city: { type: graphql_1.GraphQLString },
    country: { type: graphql_1.GraphQLString },
    rating: { type: new graphql_1.GraphQLList(PlaceRatingGQL_1.PlaceRatingGQL) },
    comment: { type: new graphql_1.GraphQLList(PlaceCommentGQL_1.PlaceCommentGQL) }
};
exports.createList = {
    type: ListType_1.ListType,
    description: 'Initialise a list',
    args: {
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        displayName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        location: { type: LatLngGQL_1.LatLngGQL },
        initialPlace: {
            type: new graphql_1.GraphQLInputObjectType({
                name: 'InitialPlace',
                description: 'the optional initial place on a list',
                fields: () => exports.placeArgs
            })
        }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('got here');
        let initializedPlace;
        if (args.initialPlace) {
            initializedPlace = yield (0, createPlace_1.initializePlace)(_parent, args.initialPlace);
        }
        const list = new List_1.List({
            id: (0, uuid_1.v4)(),
            userId: args.userId,
            displayName: args.displayName,
            location: args.location,
            city: args.city,
            country: args.country,
            dateCreated: new Date(),
            dateModified: new Date(),
            placeIds: initializedPlace ? [initializedPlace.id] : [],
            followers: [args.userId]
        });
        yield list.save();
        return list;
    })
};
//# sourceMappingURL=createList.js.map