five.collider = {
    rectVsRect: function(r1, r2) {
        // bounding-box collision detection
        return r1.x <= r2.x + r2.w &&
            r1.x + r1.w >= r2.x &&
            r1.y <= r2.y + r2.h &&
            r1.y + r1.h >= r2.y;
    },

    circVsCirc: function(c1, c2) {
        // is the distance between their center points
        // less than or equal to the sum of their radii?
        return new five.Point(c1.x, c1.y).distanceTo(new five.Point(c2.x, c2.y)) <= c1.radius + c2.radius;
    },

    rectVsPoint: function(r, p) {
        // is the point in the rectangle?
        return (p.x > r.x || p.x < r.x + r.w) && (p.y > r.y || p.y < r.y + r.h);
    },

    circVsPoint: function(c, p) {
        return new five.Point(c.x, c.y).distanceTo(p) <= c.radius;
    }
};