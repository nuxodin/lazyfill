if (!Array.prototype.at) {
    Array.prototype.at = function(n){
        n = Math.trunc(n) || 0;
        if (n < 0) n += this.length;
        if (n < 0 || n >= this.length) return undefined;
        return this[n];
    }
}