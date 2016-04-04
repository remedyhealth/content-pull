'use strict';

const data = {
    unparsed: {
        sys: {
            id: 'test',
            type: 'Asset',
            createdAt: '1',
            updatedAt: '2',
            revision: '3',
        },
        fields: {
            str: 'test',
            obj: {
                sys: {
                    id: 'test',
                    type: 'Asset',
                    createdAt: '1',
                    updatedAt: '2',
                    revision: '3',
                },
                fields: {
                    test: 'test'
                },
            },
            arr: [{
                sys: {
                    id: 'test',
                    type: 'Asset',
                    createdAt: '1',
                    updatedAt: '2',
                    revision: '3',
                },
                fields: {
                    test: 'test'
                },
            }],
        }
    },
    parsed: {
        id: 'test',
        type: 'Asset',
        meta: {
            createdAt: '1',
            updatedAt: '2',
            revision: '3',
        },
        fields: {
            str: 'test',
            obj: {
                id: 'test',
                type: 'Asset',
                meta: {
                    createdAt: '1',
                    updatedAt: '2',
                    revision: '3',
                },
                fields: {
                    test: 'test'
                },
            },
            arr: [{
                id: 'test',
                type: 'Asset',
                meta: {
                    createdAt: '1',
                    updatedAt: '2',
                    revision: '3',
                },
                fields: {
                    test: 'test'
                },
            }],
        }
    }
};

data.unparsedArr = {
    sys: {
        type: 'Array',
    },
    total: 1,
    items: [data.unparsed]
};

data.parsedArr = {
    meta: {
        total: 1
    },
    items: [data.parsed]
};

module.exports = data;
