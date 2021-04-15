if (!('currentScript' in document)) {

    Object.defineProperty(document, 'currentScript', {
        get: function () {
            // todo: find script without src
            try { throw new Error(); }
            catch (e) {
                if (!e.stack) throw new Error('error.stack not available');
                var i = 0;
                var res = ((/.*at [^(]*\((.*):.+:.+\)$/ig).exec(e.stack) || [false])[1];
                var scripts = document.scripts;
                for (i = 0; i < scripts.length; i++) {
                    if (scripts[i].src == res || scripts[i].readyState == "interactive") {
                        return scripts[i];
                    }
                }
            }
            console.warn('currentScript not found')
        }
    });

}