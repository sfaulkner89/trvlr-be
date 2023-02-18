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
exports.addPlaceToList = void 0;
const graphql_1 = require("graphql");
const ListType_1 = require("../../../graphql/types/ListType");
const List_1 = require("../../../graphql/schema/List");
const createPlace_1 = require("../places/createPlace");
const createList_1 = require("./createList");
exports.addPlaceToList = {
    type: ListType_1.ListType,
    description: 'Add a place to a list',
    args: {
        listId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        place: {
            type: new graphql_1.GraphQLInputObjectType({
                name: 'PlaceToAdd',
                description: 'the place to add to a list',
                fields: () => createList_1.placeArgs
            })
        }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const newPlace = yield (0, createPlace_1.initializePlace)(_parent, args.place);
        const listToAddTo = yield List_1.List.findOne({ id: args.listId });
        listToAddTo.placeIds.push(newPlace.id);
        yield listToAddTo.save();
        return listToAddTo;
    })
};
//# sourceMappingURL=addPlaceToList.js.map