"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInLocation = void 0;
const graphql_1 = require("graphql");
const LatLngGQL_1 = require("./LatLngGQL");
exports.checkInLocation = {
    location: { type: LatLngGQL_1.LatLngGQL },
    placeId: { type: graphql_1.GraphQLString },
    names: {
        type: new graphql_1.GraphQLInputObjectType({
            name: 'checkInLocationNames',
            fields: {
                main_text: { type: graphql_1.GraphQLString },
                secondary_text: { type: graphql_1.GraphQLString }
            }
        })
    }
};
//# sourceMappingURL=checkInLocation.js.map