"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceComment = void 0;
const graphql_1 = require("graphql");
exports.PlaceComment = new graphql_1.GraphQLObjectType({
    name: 'Place Comment',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dateCreated: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        likes: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
//# sourceMappingURL=PlaceComment.js.map