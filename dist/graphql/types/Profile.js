"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const graphql_1 = require("graphql");
exports.Profile = new graphql_1.GraphQLObjectType({
    name: 'Profile',
    description: "A single user's data",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        displayName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dob: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        profilePicture: { type: graphql_1.GraphQLString }
    })
});
//# sourceMappingURL=Profile.js.map