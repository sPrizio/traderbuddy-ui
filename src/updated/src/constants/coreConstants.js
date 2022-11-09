import {getDomain} from "../service/ConfigurationService";

export const CoreConstants = {
    ApiUrls: {
        AccountOverview: getDomain() + '/account/overview',
        EquityCurve: getDomain() + '/account/equity-curve?start={start}&end={end}&interval={interval}',
        RecentRetrospective: getDomain() + '/retrospectives/most-recent?interval={interval}',
        RecentTradeHistory: getDomain() + '/trade-record/log?count={count}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
        TradeHistory: getDomain() + '/trade-record/history?start={start}&end={end}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
        UploadTrades: getDomain() + '/trade/import-trades?delimiter={delimiter}&tradePlatform={tradePlatform}'
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
    SkeletonConstants: {
        AccentColor: 'rgba(100, 100, 250, 0.20)',
        BaseColor: 'rgba(161, 172, 184, 0.15)',
        Duration: 1.0,
        Height: '35px',
    }
}