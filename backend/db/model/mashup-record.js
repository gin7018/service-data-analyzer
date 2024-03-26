import mongoose from "mongoose";

export function makeMashupRecord(db) {
    return db.model('MashupRecord', new mongoose.Schema({
        id: {type: String},
        title: {type: String},
        summary: {type: String},
        rating: {type: String},
        name: {type: String},
        label: {type: String},
        author: {type: String},
        description: {type: String},
        type: {type: String},
        downloads : {type: String},
        useCount : {type: String},
        sampleUrl: {type: String},
        dateModified: {type: String},
        numComments : {type: String},
        commentsUrl: {type: String},
        tags: {type: String},
        apis: {type: String},
        updated: {type: String}
    }));
}