if (RegExp.prototype.flags === undefined) {
    Object.defineProperty(RegExp.prototype, 'flags', {
        configurable: true,
        get: function () {
            return this.toString().match(/[gimuy]*$/)[0];
        }
    });
}
