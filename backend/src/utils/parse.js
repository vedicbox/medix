import moment from "moment";
import mongoose from "mongoose";


export function defaultDateFormatter(date) {
    return moment(date).format('D MMMM YYYY');
}

export function formatMsg(template, variables = {}) {
    return template.replace(/\{(\w+)\}/g, (_, key) => variables[key] || '');
}

export const parseToMongoId = (id) => {
    return new mongoose.Types.ObjectId(id);
}

export const isDataArray = (value) => (Array.isArray(value) ? value : []);