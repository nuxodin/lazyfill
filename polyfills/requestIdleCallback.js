if (!window.requestIdleCallback) {
    window.requestIdleCallback = function (callback, options) {
        var options = options || {};
        var relaxation = 1;
        var timeout = options.timeout || relaxation;
        var start = performance.now();
        return setTimeout(function () {
            callback({
                get didTimeout() {
                    return options.timeout ? false : (performance.now() - start) - relaxation > timeout;
                },
                timeRemaining: function () {
                    return Math.max(0, relaxation + (performance.now() - start));
                },
            });
        }, relaxation);
    };
}