const stopWords = ['- Cash', 'US', 'USA', 'DEU', 'GER', 'CAN', 'CA']

export function displayString(value) {

    if (value) {
        if (value.includes("_")) {
            value = value.replaceAll("_", " ")
        }

        return value.split(" ").map(word => {
            return word[0].toUpperCase() + word.substring(1).toLowerCase()
        }).join(" ")
    }

    return ''
}

export function formatNumberForDisplay(value) {

    if (value) {
        return value.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    return '0'
}

export function sanitizeText(val) {
    stopWords.forEach(str => {
        if (val.includes(str)) {
            val = val.replace(str, '')
        }
    })

    return val.trim()
}

export function tradeDuration(val) {
    if (val < 3600) {
        return new Date(val * 1000).toISOString().substring(14, 19)
    } else if (val >= 3600 && val < 86400) {
        return new Date(val * 1000).toISOString().substring(11, 16)
    } else {
        return val + ' days'
    }
}

export function displayRankName(val) {
    const match = val.match('([a-zA-Z]*).(\\d*)')

    if (match && match.length > 2) {
        const num = match[2]

        let temp;
        switch (num) {
            case '1':
                temp = 'I'
                break
            case '2':
                temp = 'II'
                break
            case '3':
                temp = 'III'
                break
            case '4':
                temp = 'IV'
                break
            case '5':
                temp = 'V'
                break
            default:
                temp = ''
                break
        }

        return val.match('([a-zA-Z]*).(\\d*)')[1] + ' ' + temp
    }

    return val
}

export function normalize(min, max, val) {
    return ((val - min) / (max - min)) * 100
}