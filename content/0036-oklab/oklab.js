export function srgbToOklab(pixel) {
    return linear_srgb_to_oklab(srgb_to_linear_srgb(pixel));
};

export function oklabToSrgb(pixel) {
    return linear_srgb_to_srgb(oklab_to_linear_srgb(pixel));
};

function srgb_to_linear_srgb(pixel) {
    return new Float32Array([
        f_inv(pixel[0] / 255),
        f_inv(pixel[1] / 255),
        f_inv(pixel[2] / 255),
    ]);
}

function linear_srgb_to_srgb(pixel) {
    return new Uint8ClampedArray([
        f(pixel[0]) * 255,
        f(pixel[1]) * 255,
        f(pixel[2]) * 255,
    ]);
}

// Stolen from https://bottosson.github.io/posts/colorwrong/#what-can-we-do%3F

function f_inv(x) {
    if (x >= 0.04045) {
        return ((x + 0.055) / (1 + 0.055)) ** 2.4;
    } else {
        return x / 12.92;
    }
}

function f(x) {
    if (x >= 0.0031308) {
        return (1.055) * x ** (1.0 / 2.4) - 0.055;
    } else {
        return 12.92 * x;
    }
}

// Stolen from https://bottosson.github.io/posts/oklab/

function linear_srgb_to_oklab(c) {
    const l = 0.4122214708 * c[0] + 0.5363325363 * c[1] + 0.0514459929 * c[2];
    const m = 0.2119034982 * c[0] + 0.6806995451 * c[1] + 0.1073969566 * c[2];
    const s = 0.0883024619 * c[0] + 0.2817188376 * c[1] + 0.6299787005 * c[2];

    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    return new Float32Array([
        0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    ]);
}

function oklab_to_linear_srgb(c) {
    const l_ = c[0] + 0.3963377774 * c[1] + 0.2158037573 * c[2];
    const m_ = c[0] - 0.1055613458 * c[1] - 0.0638541728 * c[2];
    const s_ = c[0] - 0.0894841775 * c[1] - 1.2914855480 * c[2];

    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;

    return new Float32Array([
        +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    ]);
}
