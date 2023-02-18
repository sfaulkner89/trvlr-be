"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceCommentGQL = void 0;
const graphql_1 = require("graphql");
exports.PlaceCommentGQL = new graphql_1.GraphQLInputObjectType({
    name: 'PlaceCommentInput',
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dateCreated: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        likes: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        text: { type: graphql_1.GraphQLString }
    }
});
//# sourceMappingURL=PlaceCommentGQL.js.map