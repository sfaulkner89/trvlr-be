"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListType = void 0;
const graphql_1 = require("graphql");
const LatLngGQL_1 = require("../../types/gqlOutputTypes/LatLngGQL");
const User_1 = require("../schema/User");
const UserType_1 = require("./UserType");
exports.ListType = new graphql_1.GraphQLObjectType({
    name: 'List',
    description: 'A list',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        displayName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        photoLocation: { type: graphql_1.GraphQLString },
        location: { type: LatLngGQL_1.LatLngGQL },
        city: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        dateCreated: { type: graphql_1.GraphQLString },
        dateModified: { type: graphql_1.GraphQLString },
        placeIds: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        followers: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        followerProfiles: {
            type: new graphql_1.GraphQLList(UserType_1.UserType),
            resolve: userList => userList.followers.map((follower) => {
                return User_1.User.findOne({ id: follower });
            })
        }
    })
});
//# sourceMappingURL=ListType.js.map