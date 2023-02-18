"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceType = void 0;
const graphql_1 = require("graphql");
const PlaceRatingGQL_1 = require("../../types/gqlOutputTypes/PlaceRatingGQL");
const LatLngGQL_1 = require("../../types/gqlOutputTypes/LatLngGQL");
const PlaceCommentGQL_1 = require("../../types/gqlOutputTypes/PlaceCommentGQL");
exports.PlaceType = new graphql_1.GraphQLObjectType({
    name: 'Place',
    description: 'A place',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        googlePlaceId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        location: { type: new graphql_1.GraphQLNonNull(LatLngGQL_1.LatLngGQL) },
        city: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        dateCreated: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dateModified: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        ratings: { type: new graphql_1.GraphQLList(PlaceRatingGQL_1.PlaceRatingGQL) },
        comments: { type: new graphql_1.GraphQLList(PlaceCommentGQL_1.PlaceCommentGQL) },
        types: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
    })
});
//# sourceMappingURL=PlaceType.js.map