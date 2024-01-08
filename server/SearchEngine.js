const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const phraseSearch = async (_index, _type, phrase) => {
const hits = [];

// only string values are searchable
const searchResult = await client
    .search({
        index: _index,
        type: _type,
        body: {
            query: {
                multi_match: {
                fields: [
                    'faculty_id',
                    'name',
                    'gender',
                    'designation',
                    'date_of_joining',
                    'aicte_id',
                    'state',
                ],
                query: phrase,
                type: 'phrase_prefix',
                //lenient: true
                },
            },
            highlight: {
                fields: {
                    faculty_id: {},
                    name: {},
                    designation: {},
                    date_of_joining: {},
                    aicte_id: {},                    
                    state: {},                    
                },
            },
        },
    })
    .catch((e) => console.log('errr', e));
    if (
        searchResult &&
        searchResult.body &&
        searchResult.body.hits &&
        searchResult.body.hits.hits &&
        searchResult.body.hits.hits.length > 0
    ) {
    hits.push(...searchResult.body.hits.hits);
    }

    return {
        hitsCount: hits.length,
        hits,
    };
};

module.exports = {
    phraseSearch
};