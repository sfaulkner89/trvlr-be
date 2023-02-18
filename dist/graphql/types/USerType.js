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
exports.UserType = void 0;
const graphql_1 = require("graphql");
const List_1 = require("../../graphql/schema/List");
const User_1 = require("../schema/User");
const GroupType_1 = require("./GroupType");
const ListType_1 = require("./ListType");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    description: "A single user's data",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        displayName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dob: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        profileLocation: { type: graphql_1.GraphQLString },
        followers: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        following: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        countries: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        listIds: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        lists: {
            type: new graphql_1.GraphQLList(ListType_1.ListType),
            resolve: (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
                return currentUser.listIds.map((listId) => __awaiter(void 0, void 0, void 0, function* () { return yield List_1.List.findOne({ id: listId }); }));
            })
        },
        groups: { type: new graphql_1.GraphQLList(GroupType_1.GroupType) },
        followerUsers: {
            type: new graphql_1.GraphQLList(exports.UserType),
            resolve: (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
                return currentUser.followers.map((followerId) => __awaiter(void 0, void 0, void 0, function* () { return yield User_1.User.findOne({ id: followerId }); }));
            })
        },
        followingUsers: {
            type: new graphql_1.GraphQLList(exports.UserType),
            resolve: (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
                return currentUser.following.map((followingId) => __awaiter(void 0, void 0, void 0, function* () { return yield User_1.User.findOne({ id: followingId }); }));
            })
        }
    })
});
//# sourceMappingURL=UserType.js.map