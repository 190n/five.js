class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        return new Vector2D(this.x + vec.x, this.y + vec.y);
    }

    multiply(factor) {
        return new Vector2D(this.x * factor, this.y * factor);
    }
}

Vector2D.fromPolar = function(deg, len) {
    let rad = deg * (180 / Math.PI),
        xf = Math.round(Math.cos(rad) * 1000) / 1000,
        yf = Math.round(Math.sin(rad) * 1000) / 1000;
    return new Vector2D(xf, yf).multiply(len);
};

export default function Vecor2DFactory(...args) {
    return new Vector2D(...args);
};
