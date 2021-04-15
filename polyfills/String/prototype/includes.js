if (!String.prototype.includes) {
    Object.defineProperty(String.prototype, 'includes', {
        configurable: true,
        writable: true,
        value: function (search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }
            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        },
    });
}