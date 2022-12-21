"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListType = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../schema/User");
const UserType_1 = require("./UserType");
const LatLng = new graphql_1.GraphQLObjectType({
    name: 'LatLng',
    fields: () => ({
        longitude: { type: graphql_1.GraphQLInt },
        latitude: { type: graphql_1.GraphQLInt }
    })
});
exports.ListType = new graphql_1.GraphQLObjectType({
    name: 'List',
    description: 'A list',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        displayName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        photoLocation: { type: graphql_1.GraphQLString },
        location: { type: LatLng },
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