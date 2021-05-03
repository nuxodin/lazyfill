// https://raw.githubusercontent.com/behnammodi/polyfill/master/array.polyfill.js

if (!Array.prototype.findLast) {
    Object.defineProperty(Array.prototype, "findLast", {
        value: function (predicate, thisArg) {
            let idx = this.length - 1;
            while (idx >= 0) {
                const value = this[idx];
                if (predicate.call(thisArg, value, idx, this)) {
                    return value;
                }
                idx--;
            }
            return undefined;
        }
        ,
        writable: true,
        enumerable: false,
        configurable: true
    });
}
