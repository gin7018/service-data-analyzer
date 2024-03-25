import mongoose from "mongoose";

export const MashupRecord = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    summary: {type: String, required: true},
    rating: {type: Number, required: true},
    name: {type: String, required: true},
    label: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    type: {},
    downloads : {type: Number, required: true},
    useCount : {type: Number, required: true},
    sampleUrl: {type: String, required: true},
    dateModified: {type: Date, required: true},
    numComments : {type: Number, required: true},
    commentsUrl: {type: String, required: true},
    tags: {},
    apis: {},
    updated: {type: Date, required: true}
});