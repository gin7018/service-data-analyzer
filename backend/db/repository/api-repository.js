import {ApiRecord} from "../index.js";

export class ApiRepository {
    constructor() {
        this.apis = ApiRecord;
    }

    async searchWithFilters({updatedYear, protocols, category, tags, rating} = {}) {
        try {
            let query = {$or: []};
            let compareOpp = {};
            compareOpp["$" + rating.slice(0, 2)] = Number(rating.slice(3));

            if (rating) query.$or.push({rating: compareOpp});
            if (updatedYear) query.$or.push({$expr: {$eq: [{$year: '$updated'}, updatedYear]}});
            if (protocols) query.$or.push({protocols: protocols.split(',')});
            if (category) query.$or.push({category: category.split(',')});
            if (tags) query.$or.push({tags: tags.split(',')});


            const result = await this.apis.find(query);
            console.log('[API REPOSITORY] operation=searchWithFilters; status=success');
            return result.map(res => res.toJSON());
        } catch (e) {
            console.error(`[API REPOSITORY] operation=searchWithFilters; error=${e.message}`);
            return null;
        }
    }

    async searchWithKeywords(keywords) {
        try {
            let query = { $regex: new RegExp("^" + keywords.toLowerCase(), "i") }
            const results = await this.apis.find({
                $or: [
                    {title: query},
                    {summary: query},
                    {description: query}
                ]
            });
            console.log('[API REPOSITORY] operation=searchWithKeywords; status=success');
            return results.map(res => res.toJSON());
        } catch (e) {
            console.error(`[API REPOSITORY] operation=searchWithKeywords; error=${e.message}`);
            return null;
        }
    }

    async getTopKApis(k) {
        try {
            const results = await this.apis.find().sort({ useCount: -1 }).limit(k);
            console.log('[API REPOSITORY] operation=getTopKApis; status=success');
            return results.map(res => res.toJSON());
        } catch (e) {
            console.error(`[API REPOSITORY] operation=getTopKApis; error=${e.message}`);
            return null;
        }
    }
}