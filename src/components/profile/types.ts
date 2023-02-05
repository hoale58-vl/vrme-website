export type TokenData = {
    name: string;
    current_token_data: {
        metadata_uri: string;
    };
};

// https://cloud.hasura.io/public/graphiql?endpoint=https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql
// query MyQuery {
//     current_token_ownerships(
//       where: {creator_address: {_eq: "0x0603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95"}, owner_address: {_eq: "0x0603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95"}, collection_name: {_eq: "Vietnamese Metaverse Real Estate"}}
//       limit: 10
//       offset: 0
//     ) {
//       name
//       current_token_data {
//         metadata_uri
//       }
//     }
//   }
