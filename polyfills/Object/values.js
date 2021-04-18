if (!Object.values) {
	Object.values = function values(O) {
        return Object.keys(O).map(function(key) {
            return O[key];
        });
	};
}
/*
Object.key available in ie11!
if (!Object.values) Object.values = function (o) {
    if (o !== Object(o)) throw new TypeError('Object.values called on a non-object');
    var values = [], key;
    for (key in o) if (Object.prototype.hasOwnProperty.call(o, key)) values.push(o[key]);
    return values;
}
*/