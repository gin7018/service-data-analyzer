import mongoose from "mongoose";
import {makeApiRecord} from "./model/api-record.js";
import {makeMashupRecord} from "./model/mashup-record.js";
import {load_data} from "./load-api-data.js";

const connection_uri = 'mongodb://localhost:27017/';
const collection_name = 'pa03';
const connection = await mongoose.connect(connection_uri + collection_name);

const apiRecord = makeApiRecord(connection);
const mashupRecord = makeMashupRecord(connection);

await apiRecord.collection.drop();
console.log('DROPPED THE API COLLECTION');

await mashupRecord.collection.drop();
console.log('DROPPED THE MASHUP COLLECTION');

export function load_data_to_db() {
    load_data(`${process.cwd()}/data/api.txt`, apiRecord).then(() => {
        console.log('LOADED API RECORDS TO DB');
    });
    load_data(`${process.cwd()}/data/mashup.txt`, mashupRecord).then(() => {
        console.log('LOADED MASHUP RECORDS TO DB');
    });
}

