"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroups = void 0;
const graphql_1 = require("graphql");
const GroupType_1 = require("../../graphql/types/GroupType");
const User_1 = require("../../graphql/schema/User");
exports.getGroups = {
    type: new graphql_1.GraphQLList(GroupType_1.GroupType),
    description: "Retrieve a user's groups",
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    },
    resolve: (_parents, args) => {
        const currentUser = User_1.User.findOne({ id: args.id });
    }
};
//# sourceMappingURL=getGroups.js.map