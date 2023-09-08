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
exports.createUser = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../schema/User");
const UserType_1 = require("../../types/UserType");
const uuid_1 = require("uuid");
exports.createUser = {
    type: UserType_1.UserType,
    description: 'Create a new user',
    args: {
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        displayName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dob: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        profileLocation: { type: graphql_1.GraphQLString }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.User({
            id: (0, uuid_1.v4)(),
            email: args.email,
            password: args.password,
            username: args.username,
            displayName: args.displayName,
            dob: args.dob,
            profileLocation: args.profileLocation,
            followers: [],
            following: [],
            listIds: [],
            countries: [],
            groups: []
        });
        user.save();
        return user;
    })
};
//# sourceMappingURL=createUser.js.map