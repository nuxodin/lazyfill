!function (window, document) { 'use strict';


/* onElement */
var listeners = [],
    root = document,
    Observer;

function qsa(el, selector) {
    try {
        return el.querySelectorAll(selector);
    } catch (e) {
        return [];
    }
}
function onElement(selector, callback) {
    var listener = {
        selector: selector,
        callback: callback,
        elements: new WeakMap(),
    };
    var els = qsa(root, listener.selector), i = 0, el;
    while (el = els[i++]) {
        listener.elements.set(el, true);
        listener.callback.call(el, el);
    }
    listeners.push(listener);
    if (!Observer) {
        Observer = new MutationObserver(checkMutations);
        Observer.observe(root, {
            childList: true,
            subtree: true
        });
    }
    checkListener(listener);
}
function checkListener(listener, target) {
    var i = 0, el, els = [];
    try {
        target && target.matches(listener.selector) && els.push(target);
    } catch (e) { }
    if (loaded) { // ok? check inside node on innerHTML - only when loaded
        Array.prototype.push.apply(els, qsa(target || root, listener.selector));
    }
    while (el = els[i++]) {
        if (listener.elements.has(el)) continue;
        listener.elements.set(el, true);
        listener.callback.call(el, el);
    }
}
function checkListeners(inside) {
    var i = 0, listener;
    while (listener = listeners[i++]) checkListener(listener, inside);
}
function checkMutations(mutations) {
    var j = 0, i, mutation, nodes, target;
    while (mutation = mutations[j++]) {
        nodes = mutation.addedNodes, i = 0;
        while (target = nodes[i++]) target.nodeType === 1 && checkListeners(target);
    }
}
var loaded = false;
document.addEventListener('DOMContentLoaded', function () {
    loaded = true;
});
/* /onElement */


var polyfills = {
    dialog: {
        supports: 'HTMLDialogElement' in window,
        js: 'https://cdn.jsdelivr.net/gh/nuxodin/dialog-polyfill@0.5.7/dist/dialog-polyfill.min.js',
        //js: 'https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.6/dist/dialog-polyfill.min.js',
        //css: 'https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.6/dialog-polyfill.css',
        //onfound: function(el){
        //    dialogPolyfill.registerDialog(el);
        //}
    },
    "[focusgroup]": { // waiting for but to fix: https://github.com/MicrosoftEdge/MSEdgeExplainers/pull/581
        supports: 'focusgroup' in document.head,
        js: 'https://cdn.jsdelivr.net/gh/MicrosoftEdge/MSEdgeExplainers/Focusgroup/focusgroup_polyfill.js',
    },
    "[inert]": {
        supports: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'inert')?.enumerable === true, // hacky test, mod.js adds inert property support
        js: 'https://cdn.jsdelivr.net/npm/wicg-inert/dist/inert.min.js',
    },
}

Object.keys(polyfills).forEach(function(selector){
    var data = polyfills[selector];
    if (data.supports) return;
    console.log(selector, data.supports)
    onElement(selector, function (el) {
        onScript(data.js, function(){
            data.onfound && data.onfound(el)
        });
    });
});


var scripts = {};
function onScript(path, cb){
    if (!scripts[path]) {
        scripts[path] = {
            callbacks:[cb]
        };
        loadScript(path, function(){
            scripts[path].callbacks.forEach(cb);
            scripts[path].loaded = true;;
        })
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



}(window, document);