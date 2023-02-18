"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatLng = void 0;
const graphql_1 = require("graphql");
exports.LatLng = new graphql_1.GraphQLObjectType({
    name: 'LatLng',
    fields: () => ({
        longitude: { type: graphql_1.GraphQLInt },
        latitude: { type: graphql_1.GraphQLInt }
    })
});
//# sourceMappingURL=LatLng.js.map