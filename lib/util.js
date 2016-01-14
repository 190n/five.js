const util = {
    boundingBoxCollide({x: x1, y: y1, width: w1, height: h1}, {x: x2, y: y2, width: w2, height: h2}) {
        return x1 < x2 + w2
            && x1 + w1 > x2
            && y1 < y2 + h2
            && y1 + h1 > y2;
    }
};

export default util;
