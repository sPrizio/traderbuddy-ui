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
    return val.replace('- Cash', '').trim()
}

export function tradeDuration(val) {
    if (val < 3600) {
        return new Date(val * 1000).toISOString().substring(14, 19)
    } else if (val >= 3600 && val < 86400) {
        return new Date(val * 1000).toISOString().substring(11, 16)
    } else {
        return  val + ' days'
    }
}