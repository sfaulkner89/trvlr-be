"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRating = void 0;
const graphql_1 = require("graphql");
exports.PlaceRating = new graphql_1.GraphQLObjectType({
    name: 'Place Rating',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dateCreated: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        stars: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
//# sourceMappingURL=PlaceRating.js.map