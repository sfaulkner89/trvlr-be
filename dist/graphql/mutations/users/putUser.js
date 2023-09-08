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
exports.putUser = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../schema/User");
const UserType_1 = require("../../types/UserType");
const checkInLocation_1 = require("../../../types/gqlInputTypes/checkInLocation");
exports.putUser = {
    type: UserType_1.UserType,
    description: 'Alter a user',
    args: {
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        checkInLocation: {
            type: new graphql_1.GraphQLInputObjectType({
                name: 'checkInLocation',
                description: 'the details of where user is checking in',
                fields: () => checkInLocation_1.checkInLocation
            })
        }
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(args);
        const user = yield User_1.User.findOne({ id: args.userId });
        Object.assign(user, { checkInLocation: args.checkInLocation });
        user.save();
        return user;
    })
};
//# sourceMappingURL=putUser.js.map