"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../graphql/schema/User");
const UserType_1 = require("../../graphql/types/UserType");
exports.getUser = {
    type: UserType_1.UserType,
    description: 'Retrieve a user',
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    },
    resolve: (_parents, args) => User_1.User.findOne({ id: args.id })
};
//# sourceMappingURL=getUser.js.map