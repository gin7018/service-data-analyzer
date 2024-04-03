import {load_data_to_db} from "./db/index.js";
import express from "express";
import {makeSearchApiRouter} from "./api/search-api-router.js";

export class App {
    constructor() {
        this.app = express();
        this.PORT = 4000;
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', ['*']);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
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
