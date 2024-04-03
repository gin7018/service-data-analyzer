import express from "express";
import {ApiRepository} from "../db/repository/api-repository.js";
import {MashupRepository} from "../db/repository/mashup-repository.js";

export function makeSearchApiRouter() {

    const router = express.Router();
    router.use(express.json());

    const apiRepository = new ApiRepository();
    const mashupRepository = new MashupRepository();

    // TODO rating should have higher than, equal to, lower than

    router.get('/api', async (req, res) => {
        try {
            const {updatedYear, protocols, category, tags, rating, compare} = req.query;

            const searchResults = await apiRepository.searchWithFilters(
                {updatedYear, protocols, category, tags, rating, compare}
            )
            console.log(`[SEARCH API] operation=/GET/api; query=${req.query}; results=${searchResults.length}`);
            res.status(200).json(searchResults);
        } catch (e) {
            console.error(`[SEARCH API] operation=/GET/api; error=${e.message}`);
            res.status(500).json({error: e.message});
        }
    })

    router.get('/mashup', async (req, res) => {
        try {
            const {updatedYear, apisUsed, tags} = req.query;

            const searchResults = await mashupRepository.searchWithFilters(
                {updatedYear, apisUsed, tags}
            )
            console.log(`[SEARCH API] operation=/GET/mashup; query=${req.query.toLocaleString()}; results=${searchResults.length}`);
            res.status(200).json(searchResults);
        } catch (e) {
            console.error(`[SEARCH API] operation=/GET/mashup; error=${e.message}`);
            res.status(500).json({error: e.message});
        }
    })

    router.get('/:type/keywords', async (req, res) => {
        try {
            const { keywords } = req.query;
            const { type } = req.params;

            let searchResults = [];
            if (type === 'api') {
                searchResults = await apiRepository.searchWithKeywords(keywords);
            }
            else if (type === 'mashup') {
                searchResults = await mashupRepository.searchWithKeywords(keywords);
            }
            else {
                console.error(`[SEARCH API] operation=/GET/type/keywords; error=${type} is not a valid record`);
                res.status(500).json({error: `${type} is not a valid record`});
            }

            console.log(`[SEARCH API] operation=/GET/${type}/keywords; query=${req.query}; results=${searchResults.length}`);
            res.status(200).json(searchResults);
        } catch (e) {
            console.error(`[SEARCH API] operation=/GET/type/keywords; error=${e.message}`);
            res.status(500).json({error: e.message});
        }
    })

    router.get('/api/top/:k', async (req, res) => {
        try {
            const { k } = req.params;
            let searchResults = await apiRepository.getTopKApis(k);
            console.log(`[SEARCH API] operation=/GET/api/top/${k}; results=${searchResults.length}`);
            res.status(200).json(searchResults);
        } catch (e) {
            console.error(`[SEARCH API] operation=/GET/api/top/k; error=${e.message}`);
            res.status(500).json({error: e.message});
        }
    })

    router.get('/mashup/top/:k', async (req, res) => {
        try {
            const { k } = req.params;
            let searchResults = await mashupRepository.getTopKMashups(k);
            console.log(`[SEARCH API] operation=/GET/mashup/top/${k}; results=${searchResults.length}`);
            res.status(200).json(searchResults);
        } catch (e) {
            console.error(`[SEARCH API] operation=/GET/mashup/top/k; error=${e.message}`);
            res.status(500).json({error: e.message});
        }
    })

    return router;
}