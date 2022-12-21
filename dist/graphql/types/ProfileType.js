"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
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
        profilePicture: { type: graphql_1.GraphQLString },
        followers: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        following: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        followerUsers: {
            type: new graphql_1.GraphQLList(exports.UserType),
            resolve: User => User.find({ id: User.followers })
        },
        followingUsers: {
            type: new graphql_1.GraphQLList(exports.UserType),
            resolve: User => User.find({ id: User.following })
        }
    })
});
//# sourceMappingURL=ProfileType.js.map