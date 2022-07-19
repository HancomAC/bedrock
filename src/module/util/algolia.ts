import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
export const ProblemIndex = client.initIndex('problem');
export const GroupIndex = client.initIndex('group');

export default {
    client,
    ProblemIndex,
    GroupIndex
};
