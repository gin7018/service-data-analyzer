import {ApiRecord} from "../index.js";

export class ApiRepository {
    constructor() {
        this.apis = ApiRecord();
    }

    async searchWithFilters({updatedYear, protocols, category, rating, compare} = {}) {
        try {
            const result = await this.apis.find({
                updatedYear: updatedYear, // TODO
                protocols: protocols,
                category: category,
                rating: {compare: rating}}); // TODO
            console.log('[API REPOSITORY] operation=searchWithFilters; status=success');
            return result.toJSON();
        } catch (e) {
            console.error(`[API REPOSITORY] operation=searchWithFilters; error=${e.message}`);
            return null;
        }
    }

    async searchWithKeywords(keywords) {
        try {
            const results = await this.apis.find({
                $or: [
                    {title: {$search: keywords}},
                    {summary: {$search: keywords}},
                    {description: {$search: keywords}}
                ]
            });
            console.log('[API REPOSITORY] operation=searchWithKeywords; status=success');
            return results.toJSON();
        } catch (e) {
            console.error(`[API REPOSITORY] operation=searchWithKeywords; error=${e.message}`);
            return null;
        }
    }

    async getTopKApis(k) {
        try {
            const results = await this.apis.find({ $query: {}, $orderby: {useCount: -1}}).limit(k);
            console.log('[API REPOSITORY] operation=getTopKApis; status=success');
            return results.toJSON();
        } catch (e) {
            console.error(`[API REPOSITORY] operation=getTopKApis; error=${e.message}`);
            return null;
        }
    }
}