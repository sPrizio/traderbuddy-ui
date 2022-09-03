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
