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
exports.userSearch = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../../graphql/schema/User");
const UserType_1 = require("../../../graphql/types/UserType");
exports.userSearch = {
    type: new graphql_1.GraphQLList(UserType_1.UserType),
    description: 'Search for users',
    args: {
        query: { type: graphql_1.GraphQLString }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const regex = new RegExp(args.query.toLowerCase());
        const usernameMatch = yield User_1.User.find({
            $and: [{ $or: [{ username: regex }, { displayName: regex }] }]
        });
        return usernameMatch;
    })
};
//# sourceMappingURL=userSearch.js.map