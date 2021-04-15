if (!Math.trunc) {
    Math.trunc = function (n) {
        return n < 0 ? Math.ceil(n) : Math.floor(n);
    };
}