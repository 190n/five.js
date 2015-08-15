five.Rect = function(loc, size) {
    this.x = loc.x;
    this.y = loc.y;
    this.w = size.w;
    this.h = size.h;
};

// center point getter
Object.defineProperty(five.Rect.prototype, 'center', {
    get: function() {
        return new five.Point(this.x + this.w / 2, this.y + this.h / 2);
    }
});

// diagonal size getter
Object.defineProperty(five.Rect.prototype, 'diagonal', {
    get: function() {
        return new five.Size(this.w, this.h).diagonal;
    }
});

// four corners getter
Object.defineProperty(five.Rect.prototype, 'corners', {
    get: function() {
        return [
            new five.Point(this.x, this.y),
            new five.Point(this.x + this.w, this.y),
            new five.Point(this.x + this.w, this.y + this.h),
            new five.Point(this.x, this.y + this.h)
        ];
    }
});