export interface RGBColors {
    itemR: number,
    itemG: number,
    itemB: number
}

export function getRandomNumberRGBColor(opacity: number = 1): RGBColors {
    function getRandom255(): number {
        return Math.round(Math.random() * 255)
    }
    return {
        itemR: getRandom255(),
        itemG: getRandom255(),
        itemB: getRandom255()
    }
}

export function formatRGBColorToString (rgbColors: RGBColors, opacity: number = 1): string {
    return `rgba(${rgbColors.itemR}, ${rgbColors.itemG}, ${rgbColors.itemB}, ${opacity})`
}
