https://github.com/ungap/promise-any/blob/master/index.js
var any = (Promise.any || function ($) {
    return new Promise(function (D, E, A, L) {
        A = [];
        L = $.map(function ($, i) {
            return Promise.resolve($).then(D, function (O) {
                return ((A[i] = O), --L) || E({ errors: A });
            });
        }).length;
    });
}).bind(Promise);