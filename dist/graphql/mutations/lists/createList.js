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
const User_1 = require("../../../graphql/schema/User");
exports.placeArgs = {
    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    googlePlaceId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    location: { type: new graphql_1.GraphQLNonNull(LatLngGQL_1.LatLngGQL) },
    city: { type: graphql_1.GraphQLString },
    country: { type: graphql_1.GraphQLString },
    rating: { type: graphql_1.GraphQLFloat },
    comment: { type: graphql_1.GraphQLString },
    types: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
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
        let initializedPlace;
        if (args.initialPlace) {
            initializedPlace = yield (0, createPlace_1.initializePlace)(_parent, args.initialPlace);
        }
        const listId = (0, uuid_1.v4)();
        const list = new List_1.List({
            id: listId,
            userId: args.userId,
            displayName: args.displayName,
            location: args.location,
            city: args.city,
            country: args.country,
            dateCreated: new Date().toDateString(),
            dateModified: new Date().toDateString(),
            placeIds: initializedPlace ? [initializedPlace.id] : [],
            followers: [args.userId],
            ratings: [
                {
                    id: (0, uuid_1.v4)(),
                    userId: args.userId,
                    dateCreated: new Date(),
                    stars: args.initialPlace ? args.initialPlace.rating : null
                }
            ],
            comments: {
                id: (0, uuid_1.v4)(),
                userId: args.userId,
                dateCreated: new Date().toDateString(),
                likes: 0,
                text: args.initialPlace ? args.initialPlace.comment : null
            }
        });
        const listMaker = yield User_1.User.findOne({ id: args.userId });
        listMaker.listIds.push(listId);
        yield listMaker.save();
        yield list.save();
        return list;
    })
};
//# sourceMappingURL=createList.js.map