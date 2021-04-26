// from https://github.com/behnammodi/polyfill/blob/master/array.polyfill.js
if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, 'flat', {
        configurable: true,
        writable: true,
        value: function () {
            var depth =
                typeof arguments[0] === 'undefined' ? 1 : Number(arguments[0]) || 0;
            var result = [];
            var forEach = result.forEach;

            var flatDeep = function (arr, depth) {
                forEach.call(arr, function (val) {
                    if (depth > 0 && Array.isArray(val)) {
                        flatDeep(val, depth - 1);
                    } else {
                        result.push(val);
                    }
                });
            };

            flatDeep(this, depth);
            return result;
        },
    });
}