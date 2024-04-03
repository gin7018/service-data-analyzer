import {MashupRecord} from "../index.js";

export class MashupRepository {
    constructor() {
        this.mashups = MashupRecord;
    }

    async searchWithFilters({updatedYear, apisUsed, tags} = {}) {
        try {
            let query = {$or: []};

            if (updatedYear) query.$or.push({$expr: {$eq: [{$year: '$updated'}, updatedYear]}});
            if (apisUsed) query.$or.push({category: apisUsed.split(',')});
            if (tags) query.$or.push({tags: tags.split(',')});

            const result = await this.mashups.find(query);
            console.log('[MASHUP REPOSITORY] operation=searchWithFilters; status=success');
            return result.map(res => res.toJSON());
        } catch (e) {
            console.error(`[MASHUP REPOSITORY] operation=searchWithFilters; error=${e.message}`);
            return null;
        }
    }

    async searchWithKeywords(keywords) {
        try {
            let query = { $regex: new RegExp("^" + keywords.toLowerCase(), "i") }
            const results = await this.mashups.find({
                $or: [
                    {title: query},
                    {summary: query},
                    {description: query}
                ]
            });
            console.log('[MASHUP REPOSITORY] operation=searchWithKeywords; status=success');
            return results.map(res => res.toJSON());
        } catch (e) {
            console.error(`[MASHUP REPOSITORY] operation=searchWithKeywords; error=${e.message}`);
            return null;
        }
    }

    async getTopKMashups(k) {
        try {
            const results = await this.mashups.find().sort({ useCount: -1 }).limit(k);
            console.log('[MASHUP REPOSITORY] operation=getTopKMashups; status=success');
            return results.map(res => res.toJSON());
        } catch (e) {
            console.error(`[MASHUP REPOSITORY] operation=getTopKMashups; error=${e.message}`);
            return null;
        }
    }
}