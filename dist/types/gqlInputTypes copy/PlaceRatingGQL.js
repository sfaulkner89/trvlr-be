"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRatingGQL = void 0;
const graphql_1 = require("graphql");
exports.PlaceRatingGQL = new graphql_1.GraphQLObjectType({
    name: 'PlaceRating',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dateCreated: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        stars: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
//# sourceMappingURL=PlaceRatingGQL.js.map