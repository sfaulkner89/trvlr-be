"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatLngGQL = void 0;
const graphql_1 = require("graphql");
exports.LatLngGQL = new graphql_1.GraphQLInputObjectType({
    name: 'LatLngInput',
    fields: {
        longitude: { type: graphql_1.GraphQLFloat },
        latitude: { type: graphql_1.GraphQLFloat }
    }
});
//# sourceMappingURL=LatLngGQL.js.map