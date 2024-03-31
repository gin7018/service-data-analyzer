import {MashupRecord} from "../index.js";

export class MashupRepository {
    constructor() {
        this.mashups = MashupRecord();
    }

    async searchWithFilters({updatedYear, apis, tags} = {}) {
        try {
            const result = await this.mashups.find({
                $expr: {$eq: [ { $year: '$updated' }, updatedYear]}, // TODO
                apis: {$search: apis},
                tags: {$search: tags}
            });
            console.log('[MASHUP REPOSITORY] operation=searchWithFilters; status=success');
            return result.toJSON();
        } catch (e) {
            console.error(`[MASHUP REPOSITORY] operation=searchWithFilters; error=${e.message}`);
            return null;
        }
    }

    async searchWithKeywords(keywords) {
        try {
            const results = await this.mashups.find({
                $or: [
                    {title: {$search: keywords}},
                    {summary: {$search: keywords}},
                    {description: {$search: keywords}}
                ]
            });
            console.log('[MASHUP REPOSITORY] operation=searchWithKeywords; status=success');
            return results.toJSON();
        } catch (e) {
            console.error(`[MASHUP REPOSITORY] operation=searchWithKeywords; error=${e.message}`);
            return null;
        }
    }

    async getTopKMashups(k) {
        try {
            const results = await this.mashups.find({ $query: {}, $orderby: {useCount: -1}}).limit(k);
            console.log('[MASHUP REPOSITORY] operation=getTopKMashups; status=success');
            return results.toJSON();
        } catch (e) {
            console.error(`[MASHUP REPOSITORY] operation=getTopKMashups; error=${e.message}`);
            return null;
        }
    }
}