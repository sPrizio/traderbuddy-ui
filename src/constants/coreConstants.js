import {
    getAccountDomain,
    getRetrospectiveDomain,
    getTradeDomain,
    getTradeRecordDomain
} from "../service/ConfigurationService";

export const CoreConstants = {

    ApiUrls: {
        Account: {
            EquityCurve: getAccountDomain() + '/equity-curve?start={start}&end={end}&interval={interval}',
            Overview: getAccountDomain() + '/overview',
        },
        Retrospective: {
            ActiveMonths: getRetrospectiveDomain() + '/active-months?year={year}&includeStarterMonth={includeStarterMonth}',
            ActiveYears: getRetrospectiveDomain() + '/active-years',
            Create: getRetrospectiveDomain() + '/create',
            Delete: getRetrospectiveDomain() + '/delete?uid={uid}',
            Edit: getRetrospectiveDomain() + '/update?uid={uid}',
            Get: getRetrospectiveDomain() + '/uid?uid={uid}',
            MostRecent: getRetrospectiveDomain() + '/most-recent?interval={interval}',
            List: getRetrospectiveDomain() + '/timespan?start={start}&end={end}&interval={interval}',
        },
        Trade: {
            Disregard: getTradeDomain() + '/disregard',
            List: getTradeDomain() + '/for-interval?start={start}&end={end}&includeNonRelevant={includeNonRelevant}',
            ListPaged: getTradeDomain() + '/for-interval-paged?start={start}&end={end}&includeNonRelevant={includeNonRelevant}&page={page}&pageSize={pageSize}',
            Upload: getTradeDomain() + '/import-trades?delimiter={delimiter}&tradePlatform={tradePlatform}'
        },
        TradeRecord: {
            ActiveMonths: getTradeRecordDomain() + '/active-months?year={year}',
            History: getTradeRecordDomain() + '/history?start={start}&end={end}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
            RecentHistory: getTradeRecordDomain() + '/log?count={count}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
        },
    },

    CssConstants: {
        FontAccentColor: 'rgb(161, 172, 184)',
        /*GreenCandleColor: 'rgb(113, 221, 55)',*/
        GreenCandleColor: '#4caf50',
        HeaderFontColor: 'rgb(86, 106, 127)',
        HeaderFontSize: '16px',
        PrimaryColor: 'rgb(100, 100, 250)',
        PrimaryFont: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        /*RedCandleColor: 'rgb(255, 62, 29)',*/
        RedCandleColor: '#ce1b2d',
        SubHeaderFontSize: '12.75px',
        TrendLineColor: '#ff80ab',
    },

    DateTime: {
        ISODateFormat: 'YYYY-MM-DD',
        ISODateTimeFormat: 'YYYY-MM-DDTHH:mm:ss',
        ISODayFormat: 'Do',
        ISOMonthDayFormat: 'MMMM Do',
        ISOMonthFormat: 'MMMM',
        ISOYearFormat: 'YYYY',
        ISOMonthYearFormat: 'MMMM YYYY',
        ISOShortMonthFormat: 'MMM',
        ISOShortTimeFormat: 'HH:mm',
        ISOWeekdayFormat: 'dddd'
    },

    SkeletonConstants: {
        AccentColor: 'rgba(100, 100, 250, 0.20)',
        BaseColor: 'rgba(161, 172, 184, 0.15)',
        Duration: 1.0,
        Height: '35px',
    }

}