import {load_data_to_db} from "./db/index.js";
import express from "express";
import {makeSearchApiRouter} from "./api/search-api-router.js";

export class App {
    constructor() {
        this.app = express();
        this.PORT = 4000;
        this.app.use('/search', makeSearchApiRouter());
    }

    async load_data() {
        await load_data_to_db();
    }

    async start() {
        this.app.listen(this.PORT, () => {
            console.log(`[APP BACKEND SERVICE] server started, listening on port=${this.PORT}`);
        });
    }

}
