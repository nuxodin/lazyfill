if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        configurable: true,
        writable: true,
        value: function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        },
    });
}