"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupType = void 0;
const graphql_1 = require("graphql");
const UserType_1 = require("./UserType");
exports.GroupType = new graphql_1.GraphQLObjectType({
    name: 'Group',
    description: 'A group of contacts',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        groupName: { type: graphql_1.GraphQLString },
        members: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        memberProfiles: {
            type: new graphql_1.GraphQLList(UserType_1.UserType),
            resolve: Group => {
                Group.members.map((memberId) => Group.findOne({ id: memberId }));
            }
        }
    })
});
//# sourceMappingURL=GroupType.js.map