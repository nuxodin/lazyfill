if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, 'flat', {
        configurable: true,
        writable: true,
        value: function () {
            var stack = [].concat(this);
            var result = [];
            while (stack.length) {
                var next = stack.pop();
                if (Array.isArray(next)) {
                    stack.push.apply(stack, next);
                } else {
                    result.push(next);
                }
            }
            return result.reverse();
        },
    });
}