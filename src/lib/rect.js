five.rect = function(loc, size) {
    // factory
    return new five._Rect(loc, size);
};

five._Rect = function(loc, size) {
    this.x = loc.x;
    this.y = loc.y;
    this.w = size.w;
    this.h = size.h;
};

// center point getter
Object.defineProperty(five._Rect.prototype, 'center', {
    get: function() {
        return five.point(this.x + this.w / 2, this.y + this.h / 2);
    }
});

// diagonal size getter
Object.defineProperty(five._Rect.prototype, 'diagonal', {
    get: function() {
        return five.size(this.w, this.h).diagonal;
    }
});

// four corners getter
Object.defineProperty(five._Rect.prototype, 'corners', {
    get: function() {
        return [
            five.point(this.x, this.y),
            five.point(this.x + this.w, this.y),
            five.point(this.x + this.w, this.y + this.h),
            five.point(this.x, this.y + this.h)
        ];
    }
});