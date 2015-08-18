/**
* Collision detection functions.
* @namespace
*/
five.collider = {
    /**
    * Bounding box collision detection between two rectangles.
    * @param {five.Rect} r1 - First rectangle.
    * @param {five.Rect} r2 - Second rectangle.
    * @returns Boolean
    */
    rectVsRect: function(r1, r2) {
        // bounding-box collision detection
        return r1.x <= r2.x + r2.w &&
            r1.x + r1.w >= r2.x &&
            r1.y <= r2.y + r2.h &&
            r1.y + r1.h >= r2.y;
    },

    /**
    * Collision detection between two circles via distance between centers.
    * @param {five.Circ} c1 - First circle.
    * @param {five.Circ} c2 - Second circle.
    * @returns Boolean
    */
    circVsCirc: function(c1, c2) {
        // is the distance between their center points
        // less than or equal to the sum of their radii?
        return new five.Point(c1.x, c1.y).distanceTo(new five.Point(c2.x, c2.y)) <= c1.radius + c2.radius;
    },

    /**
    * Detect if a point is inside a rectangle.
    * @param {five.Rect} r - The rectangle to check if the point is in.
    * @param {five.Point} p - The point.
    * @returns Boolean
    */
    rectVsPoint: function(r, p) {
        // is the point in the rectangle?
        return (p.x > r.x || p.x < r.x + r.w) && (p.y > r.y || p.y < r.y + r.h);
    },

    /**
    * Detect if a point is inside a circle.
    * @param {five.Circ} c - The circle to check if the point is in.
    * @param {five.Point} p - The point.
    * @returns Boolean
    */
    circVsPoint: function(c, p) {
        return new five.Point(c.x, c.y).distanceTo(p) <= c.radius;
    }
};