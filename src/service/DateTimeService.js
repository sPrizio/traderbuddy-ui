import moment from "moment";
import {CoreConstants} from "../constants/coreConstants";

export function computeDate(val1, val2, interval) {
    switch (interval) {
        case 'WEEKLY':
            return moment(val1).format(CoreConstants.DateTime.ISOMonthDayFormat) + ' - ' + moment(val2).format(CoreConstants.DateTime.ISODayFormat)
        case 'MONTHLY':
            return moment(val1).format(CoreConstants.DateTime.ISOMonthYearFormat)
        case 'YEARLY':
            return moment(val1).format(CoreConstants.DateTime.ISOYearFormat)
        default:
            return moment(val1).format(CoreConstants.DateTime.ISOMonthDayFormat)
    }
}