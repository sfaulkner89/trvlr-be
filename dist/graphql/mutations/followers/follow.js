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
exports.follow = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../schema/User");
const UserType_1 = require("../../types/UserType");
exports.follow = {
    type: UserType_1.UserType,
    description: 'Add a new follow',
    args: {
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        followId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const currentUser = yield User_1.User.findOne({ id: args.userId });
        const followUser = yield User_1.User.findOne({ id: args.followId });
        if (!currentUser.following.includes(args.followId)) {
            currentUser.following.push(args.followId);
        }
        if (!followUser.followers.includes(args.userId)) {
            followUser.followers.push(args.userId);
        }
        currentUser.save();
        followUser.save();
        return currentUser;
    })
};
//# sourceMappingURL=follow.js.map