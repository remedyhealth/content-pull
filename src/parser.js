'use strict';

/**
 * @class
 * Parses objects received by contentful.
 */
class Parser {

    /**
     * Returns an individual object parsed.
     * @param {JSON} obj - An unparsed object.
     * @returns {JSON} The parsed object.
     */
    one(obj) {

        if (obj && obj.sys && obj.sys.type !== 'Array' && obj.sys.type !== 'Link') {


            // Add the important stuff
            obj.id = obj.sys.id;
            obj.type = obj.sys.type;
            
            if (obj.type === 'Entry') {
                obj.contentType = obj.sys.contentType.sys.id;
            }

            // Add meta fields
            if (obj.type !== 'Space') {
                obj.meta = {
                    createdAt: obj.sys.createdAt,
                    updatedAt: obj.sys.updatedAt,
                    revision: obj.sys.revision,
                };
            }

            // clean up before iterating over children
            delete obj.sys;

            if (obj.type !== 'Space') {
                for (let key in obj.fields) {
                    if (obj.fields[key] && obj.fields[key].sys) {
                        obj.fields[key] = this.it(obj.fields[key]);
                    } else if (Array.isArray(obj.fields[key])) {
                        obj.fields[key] = obj.fields[key].map(subfield => this.it(subfield));
                    }
                }
            }
        }

        return obj;
    }

    /**
     * Returns an individual object parsed.
     * @param {JSON} obj - An unparsed collection of objects.
     * @returns {JSON} The parsed object.
     */
    all(obj) {

        // If there are many, parse them and populate them
        // If there is only one, go ahead and add it
        if (obj && obj.sys && obj.sys.type === 'Array') {
            obj.meta = {
                total: obj.total
            };
            delete obj.sys;
            delete obj.skip;
            delete obj.limit;
            delete obj.includes;
            delete obj.total;
            obj.items = obj.items.map(item => this.it(item));
        } else if (obj && obj.sys && obj.sys.type) {
            obj = {
                meta: {
                    total: 1
                },
                items: [this.it(obj)]
            };
        }

        return obj;
    }

    /**
     * If the contentful object might be one or more, use this to properly route.
     * @param {JSON} obj - An unparsed collection of objects, or an individual object.
     * @returns {JSON} The parsed object.
     */
    it(obj) {
        if (obj && obj.sys && obj.sys.type) {

            // if it is an array, use
            return (obj.sys.type === 'Array') ? this.all(obj) : this.one(obj);
        } else {

            // not valid, return the object
            return obj;
        }
    }
}

module.exports = new Parser();
