import {SelectorObserver} from 'https://cdn.jsdelivr.net/gh/u1ui/SelectorObserver.js@3.0.1/SelectorObserver.min.js'

const scripts = {};

var polyfills = {
    dialog: {
        supports: 'HTMLDialogElement' in window,
        js: 'https://cdn.jsdelivr.net/gh/nuxodin/dialog-polyfill@0.5.7/dist/dialog-polyfill.min.js',
    },
    "[focusgroup]": { // waiting for but to fix: https://github.com/MicrosoftEdge/MSEdgeExplainers/pull/581
        supports: 'focusgroup' in document.head,
        js: 'https://cdn.jsdelivr.net/gh/MicrosoftEdge/MSEdgeExplainers/Focusgroup/focusgroup_polyfill.js',
    },
    "[inert]": {
        supports: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'inert')?.enumerable === true, // hacky test, mod.js adds inert property support
        js: 'https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js',
    },
}

Object.keys(polyfills).forEach(selector => {
    var data = polyfills[selector];
    if (data.supports) return;

    /*
    SO.once(selector, el => {
        onScript(data.js, () => {
            console.log('💊 lazyfill: "'+selector+'" polyfilled, you need the polyfill: '+data.js);
            //data.onfound && data.onfound(el)
        });
    });
    */

    const obs = new SelectorObserver({
        on: (el) => {
            onScript(data.js, () => {
                console.log('💊 lazyfill: "'+selector+'" polyfilled, you need the polyfill: '+data.js);
                //data.onfound && data.onfound(el)
            });
            obs.disconnect();
        },
    })
    obs.observe(selector);
});


function onScript(path, cb){
    if (!scripts[path]) {
        scripts[path] = {
            callbacks:[cb]
        };
        loadScript(path, function(){
            scripts[path].callbacks.forEach(cb);
            scripts[path].loaded = true;;
        });
    }
    if (scripts[path].loaded) cb();
    else scripts[path].callbacks.push(cb);
}
function loadScript(path, cb, eb) {
    var elem = document.createElement('script');
    elem.async   = false;
    elem.src     = path;
    elem.onload  = cb;
    elem.onerror = eb;
    document.documentElement.firstChild.appendChild(elem);
}