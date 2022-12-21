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
exports.createProfile = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../graphql/schema/User");
const ProfileType_1 = require("../../graphql/types/ProfileType");
const uuid_1 = require("uuid");
exports.createProfile = {
    type: ProfileType_1.ProfileType,
    description: 'Create a new user',
    args: {
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        displayName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dob: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        profilePicture: { type: graphql_1.GraphQLString }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.User({
            id: (0, uuid_1.v4)(),
            email: args.email,
            password: args.password,
            username: args.username,
            displayName: args.displayName,
            dob: args.dob,
            profilePicture: args.profilePicture,
            followers: [],
            following: []
        });
    })
};
//# sourceMappingURL=createProfile.js.map