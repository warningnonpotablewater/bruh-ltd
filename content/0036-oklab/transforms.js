export function L(color) {
    return new Float32Array([color[0], 0, 0]);
};

export function a(color) {
    return new Float32Array([color[0], color[1], 0]);
};

export function b(color) {
    return new Float32Array([color[0], 0, color[2]]);
};

export function red(color) {
    return new Float32Array([
        color[0],
        color[1] > 0 ? color[1] : 0,
        color[1] > 0 ? color[1] / 1.7868071106680694 : 0
    ]);
};

export function green(color) {
    return new Float32Array([
        color[0],
        color[1] < 0 ? color[1] : 0,
        color[1] < 0 ? color[1] / -1.3030058768323223 : 0
    ]);
};

export function blue(color) {
    return new Float32Array([
        color[0],
        color[2] < 0 ? color[2] / 9.598185279893794 : 0,
        color[2] < 0 ? color[2] : 0
    ]);
};

export function yellow(color) {
    return new Float32Array([
        color[0],
        color[2] > 0 ? color[2] / -2.7822938677007385 : 0,
        color[2] > 0 ? color[2] : 0
    ]);
};
