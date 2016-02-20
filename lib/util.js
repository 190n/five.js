const DEG2RAD = 180 / Math.PI;

const util = {
    boundingBoxCollide({pos: {x: x1, y: y1}, width: w1, height: h1}, {pos: {x: x2, y: y2}, width: w2, height: h2}) {
        return x1 < x2 + w2
            && x1 + w1 > x2
            && y1 < y2 + h2
            && y1 + h1 > y2;
    },

    rotateTransform(ctx, {x, y}, rot) {
        ctx.translate(x, y);
        ctx.rotate(rot / DEG2RAD);
        ctx.translate(-x, -y);
    }
};

export default util;
