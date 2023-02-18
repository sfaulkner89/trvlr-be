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
exports.checkDuplicatePlace = void 0;
const graphql_1 = require("graphql");
const definition_1 = require("graphql/type/definition");
const List_1 = require("../schema/List");
const createPlace_1 = require("../mutations/places/createPlace");
const createList_1 = require("../../graphql/mutations/lists/createList");
exports.checkDuplicatePlace = {
    type: graphql_1.GraphQLBoolean,
    description: 'Find out if a duplicate place is being added to a list',
    args: {
        listId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        place: {
            type: new definition_1.GraphQLInputObjectType({
                name: 'NewPlaceToCheck',
                description: 'Place to check whether duplicate',
                fields: () => createList_1.placeArgs
            })
        }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const placeToAdd = yield (0, createPlace_1.initializePlace)(_parent, args.place);
        console.log('duplicate checked');
        const listToCheck = yield List_1.List.findOne({ id: args.listId });
        return listToCheck.placeIds.includes(placeToAdd.id);
    })
};
//# sourceMappingURL=checkDuplicatePlace.js.map