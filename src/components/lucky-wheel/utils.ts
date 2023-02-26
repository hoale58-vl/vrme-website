export function darkenColor(colorCode: number, dept: number, darkenPecentage: number): number {
    if (dept === 0) {
        return colorCode;
    }
    const b = (colorCode & 0xff) * darkenPecentage,
        g = ((colorCode & 0xff00) >>> 8) * darkenPecentage,
        r = ((colorCode & 0xff0000) >>> 16) * darkenPecentage;
    const newColor = (r << 16) + (g << 8) + b;
    if (dept === 1) {
        return newColor;
    }
    return darkenColor(newColor, dept - 1, darkenPecentage);
}

export function toColor(colorCode: number) {
    var b = colorCode & 0xff,
        g = (colorCode & 0xff00) >>> 8,
        r = (colorCode & 0xff0000) >>> 16;
    return 'rgba(' + [r, g, b].join(',') + ')';
}
