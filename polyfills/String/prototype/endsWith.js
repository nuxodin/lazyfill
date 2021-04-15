if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        configurable: true,
        writable: true,
        value: function (searchString, position) {
            var subjectString = this.toString();
            if (
                typeof position !== 'number' ||
                !isFinite(position) ||
                Math.floor(position) !== position ||
                position > subjectString.length
            ) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.lastIndexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        },
    });
}