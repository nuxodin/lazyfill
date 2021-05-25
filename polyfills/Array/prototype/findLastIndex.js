// https://raw.githubusercontent.com/behnammodi/polyfill/master/array.polyfill.js

if (!Array.prototype.findLastIndex) {
    Object.defineProperty(Array.prototype, 'findLastIndex', {
        value: function (predicate, thisArg) {
            let idx = this.length - 1;
            while (idx >= 0) {
                const value = this[idx];
                if (predicate.call(thisArg, value, idx, this)) {
                    return idx;
                }
                idx--;
            }
            return -1;
        }
        ,
        writable: true,
        enumerable: false,
        configurable: true
    });
}