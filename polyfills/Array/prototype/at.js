if (!Array.prototype.at) {
    Array.prototype.at = function(n){
        //n = Math.trunc(n) || 0; not in ie11
        n = n < 0 ? Math.ceil(n) : Math.floor(n);
        if (n < 0) n += this.length;
        if (n < 0 || n >= this.length) return undefined;
        return this[n];
    }
}