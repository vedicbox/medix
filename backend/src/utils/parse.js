import moment from "moment";

// Date formatter

export function defaultDateFormatter(date) {
    return moment(date).format('Do MMMM YYYY');
}