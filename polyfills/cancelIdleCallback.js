if (!window.cancelIdleCallback) {
    window.cancelIdleCallback = function (id) {
        clearTimeout(id);
    };
}