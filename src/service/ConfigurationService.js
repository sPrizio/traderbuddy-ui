export function baseUrl() {
    return 'http://localhost:8080'
}

export function getDomain(appendVal) {
    return baseUrl() + '/api/v1' + appendVal
}

export function getAccountDomain() {
    return getDomain('/account')
}

export function getRetrospectiveDomain() {
    return getDomain('/retrospective')
}

export function getTradeDomain() {
    return getDomain('/trade')
}

export function getTradeRecordDomain() {
    return getDomain('/trade-record')
}