!function(window, document){ 'use strict';

var urls = {
    'polyfill.io/v3/polyfill.min.js?features=Intl':{
        formatToParts: [Intl.DateTimeFormat.prototype],
        DisplayNames: [Intl],
        ListFormat: [Intl],
        Locale: [Intl],
        PluralRules: [Intl],
        RelativeTimeFormat: [Intl],
        getCanonicalLocales: [Intl],
    },
    'cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/fetch.js':{
        'fetch':[window],
        //'Headers':[window],
        //'Request':[window],
        //'Response':[window],
    },
    'cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js':{
        'Promise':[window]
    },
    'polyfill.io/v3/polyfill.min.js?features=IntersectionObserver':{
        'IntersectionObserver':[window]
    },
    'polyfill.io/v3/polyfill.min.js?features=ResizeObserver':{
        'ResizeObserver':[window]
    },
    'polyfill.io/v3/polyfill.min.js?features=AbortController':{
        'AbortController':[window],
        //'AbortSignal': [window]
    },
    'polyfill.io/v3/polyfill.min.js?features=URL':{
        //'URL':[window], // ie11: this will not work as it has "URL" but not as a constructor, what should we do?
        'URLSearchParams':[window]
    },
    'unpkg.com/@ungap/custom-elements@0.1.15/es.js':{
        'customElements':[window],
    },
    'cdn.jsdelivr.net/gh/nuxodin/lazyfill@0.2.5/polyfills/Element/combo.js':{
        'matches':[Element.prototype],
        'closest':[Element.prototype],
        'prepend':[Element.prototype],
        'append':[Element.prototype],
        'before':[Element.prototype],
        'after':[Element.prototype],
        'replaceWidth':[Element.prototype],
        'remove':[Element.prototype],
        // to use in SVGElement:
        'blur':[Element.prototype],
        'focus':[Element.prototype],
        'contains':[Element.prototype],
        'classList':[Element.prototype],
        'getElementsByClassName':[Element.prototype],
        'children':[Element.prototype],
    },
};

var lazyfills = {
    Array:{
        from:1,
        of:1,
        prototype:{
            at:1,
            copyWithin:1,
            entries:1,
            fill:1,
            find:1,
            findIndex:1,
            flat:1,
            flatMap:1,
            includes:1,
            keys:1,
            values:1,
        }
    },
    document:{
        currentScript:1,
        caretRangeFromPoint:1,
    },
    Element:{
        toggleAttribute:1
    },
    HTMLFormElement:{
        prototype:{
            reportValidity:1,
            requestSubmit:1,
        }
    },
    HTMLInputElement:{
        prototype:{
            reportValidity:1
        }
    },
    Math:{
        trunc:1,
        sign:1,
    },
    Number:{
        isInteger:1
    },
    Object:{
        assign:1,
        is:1,
        values:1,
    },
    Promise:{
        allSettled:1,
        any:1
    },
    String:{
        fromCodePoint:1,
        prototype:{
            at:1,
            codePointAt:1,
            endsWith:1,
            includes:1,
            padEnd:1,
            padStart:1,
            repeat:1,
            startsWith:1
        }
    },
    SVGStyleElement:{
        prototype:{
            sheet:1
        }
    },
    requestIdleCallback:1,
    cancelIdleCallback:1,
    WeakSet:1,
};

function createUrls(obj, realObj, rootUrl){
    var prop;
    for (prop in obj) {
        if (obj[prop] === 1) {
            var url = rootUrl + prop + '.min.js'
            if (!urls[url]) urls[url] = {};
            if (!urls[url][prop]) urls[url][prop] = [];
            urls[url][prop].push(realObj);
        } else {
            createUrls(obj[prop], realObj[prop], rootUrl + prop + '/');
        }
    }
}
console.log(urls)
createUrls(lazyfills, window, 'cdn.jsdelivr.net/gh/nuxodin/lazyfill@0.2.5/polyfills/');


var url, props, prop, obj, objects, i;
for (url in urls) {
    props = urls[url];
    for (prop in props) {
        objects = props[prop];
        for (i=0; obj=objects[i++];) {
            if (prop in obj) {
                //console.log('not needed '+prop+' in '+url+'<br>')
                continue;
            }
            //console.log('"'+prop+'" not supported, adding getter');
            addGetter(obj, prop, url);
        }
    }
}
console.log('lazyfill: everything is polyfilled');

//addGetter(window, 'fetch', 'cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/fetch.js');

function addGetter(obj, prop, url) {
    if (obj.hasOwnProperty(prop)) return;
    /* other libaries should check properties like so: if (prop in obj) { ... }; so the getter will not fire */
    Object.defineProperty(obj, prop, {
        configurable: true,
        get: function() {
            delete obj[prop];
            console.log(prop+' needed > loading sync, you may want to add the polyfill '+url);
            loadScriptSync('https://'+url);
            return this[prop];
        },
        set: function(v) {
            delete obj[prop];
            obj[prop] = v;
        }
    });
};

function loadScriptSync(path) {
    var request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send(null);
    if (request.status === 200) {
        var elem = document.createElement('script');
        elem.text = request.responseText;
        document.documentElement.firstChild.appendChild(elem);
        elem.setAttribute('data-src',path);
    } else {
        console.warn('failed to load '+path)
    }
}


if (!NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach; // ie11
if (!document.scrollingElement) document.scrollingElement = document.documentElement; // ie11

/* more *
// iterators, available on ch/ff, not useable for ie11
if (window.Symbol && Symbol.iterator) {
	[HTMLCollection,NodeList,StyleSheetList,window.CSSRuleList].forEach(function(Interface){
		if (!Interface) return;
		var proto = Interface.prototype;
		if (proto[Symbol.iterator]) return;
        console.log('not needed on '+Interface)
		proto[Symbol.iterator] = Array.prototype[Symbol.iterator];
	});
}
/* */


}(window, document);
