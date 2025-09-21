import moment from "moment";

export const getCurrentDate = (format: string) => {
    return moment().format(format);
}