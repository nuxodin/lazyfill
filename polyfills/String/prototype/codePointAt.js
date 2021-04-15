if (!String.prototype.codePointAt) {
    (function () {
        var codePointAt = function (position) {
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            var size = string.length;
            var index = position ? Number(position) : 0;
            if (index != index) {
                index = 0;
            }
            if (index < 0 || index >= size) {
                return undefined;
            }
            var first = string.charCodeAt(index);
            var second;
            if (first >= 0xd800 && first <= 0xdbff && size > index + 1) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xdc00 && second <= 0xdfff) {
                    return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
                }
            }
            return first;
        };
        if (Object.defineProperty) {
            Object.defineProperty(String.prototype, 'codePointAt', {
                value: codePointAt,
                configurable: true,
                writable: true,
            });
        } else {
            String.prototype.codePointAt = codePointAt;
        }
    })();
}