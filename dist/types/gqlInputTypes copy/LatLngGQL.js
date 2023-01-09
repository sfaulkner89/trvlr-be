"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatLngGQL = void 0;
const graphql_1 = require("graphql");
exports.LatLngGQL = new graphql_1.GraphQLObjectType({
    name: 'LatLng',
    fields: {
        longitude: { type: graphql_1.GraphQLInt },
        latitude: { type: graphql_1.GraphQLInt }
    }
});
//# sourceMappingURL=LatLngGQL.js.map