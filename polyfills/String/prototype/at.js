if (!String.prototype.at) {
    Object.defineProperty(String.prototype, "at",
        {
            value: function (n) {
                // ToInteger() abstract op
                n = Math.trunc(n) || 0;
                // Allow negative indexing from the end
                if (n < 0) n += this.length;
                // OOB access is guaranteed to return undefined
                if (n < 0 || n >= this.length) return undefined;
                // Otherwise, this is just normal property access
                return this[n];
            },
            writable: true,
            enumerable: false,
            configurable: true
        });
}