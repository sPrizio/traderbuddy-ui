import {
    getAccountDomain,
    getAnalysisDomain,
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
        Analysis: {
            Average: getAnalysisDomain() + '/average?start={start}&end={end}&win={win}&count={count}',
            Bucket: getAnalysisDomain() + '/bucket?start={start}&end={end}&bucket={bucket}',
            TopTrades: getAnalysisDomain() + '/top-trades?start={start}&end={end}&sort={sort}&sortByLosses={sortByLosses}&count={count}'
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
            Recap: getTradeDomain() + '/recap?tradeId={tradeId}',
            Upload: getTradeDomain() + '/import-trades?delimiter={delimiter}&tradePlatform={tradePlatform}'
        },
        TradeRecord: {
            ActiveMonths: getTradeRecordDomain() + '/active-months?year={year}',
            History: getTradeRecordDomain() + '/history?start={start}&end={end}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
            RecentHistory: getTradeRecordDomain() + '/log?count={count}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
        },
    },

    CssConstants: {
        EquityCurveGreen: '#4caf50',
        EquityCurveRed: '#ba000d',
        FadedBarColor: '#e8e8e8e8',
        FontAccentColor: 'rgb(161, 172, 184)',
        /*GreenCandleColor: 'rgb(113, 221, 55)',*/
        GreenBarColor: '#82ca9d',
        GreenCandleColor: '#4caf50',
        HeaderFontColor: 'rgb(86, 106, 127)',
        HeaderFontSize: '16px',
        NeutralBarColor: 'rgba(100,100,250,0.50)',
        PrimaryColor: 'rgb(100, 100, 250)',
        PrimaryFont: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        ProfitCurvePrimary: '#696CFF',
        /*RedCandleColor: 'rgb(255, 62, 29)',*/
        RedBarColor: '#ca828b',
        RedCandleColor: '#ce1b2d',
        SubHeaderFontSize: '12.75px',
        TrendLineColor: '#ff80ab',
        White: '#FFFFFF'
    },

    DateTime: {
        ISODateFormat: 'YYYY-MM-DD',
        ISODateTimeFormat: 'YYYY-MM-DDTHH:mm:ss',
        ISODayFormat: 'Do',
        ISOLongMonthDayYearFormat: 'MMMM Do[,] YYYY',
        ISOMonthDayFormat: 'MMMM Do',
        ISOMonthFormat: 'MMMM',
        ISOYearFormat: 'YYYY',
        ISOMonthYearFormat: 'MMMM YYYY',
        ISOShortMonthFormat: 'MMM',
        ISOShortMonthDayYearFormat: 'MMM Do[,] YYYY',
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