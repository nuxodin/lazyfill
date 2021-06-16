!function(window, document){ 'use strict';

var urls = {
    'cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js':{
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
};

addCombo('polyfill.io/v3/polyfill.min.js?features=Intl', {
    DateTimeFormat:{
        prototype:{
            formatToParts:1
        }
    },
    DisplayNames:1,
    ListFormat:1,
    Locale:1,
    PluralRules:1,
    RelativeTimeFormat:1,
    getCanonicalLocales:1,
}, Intl);

addCombo('cdn.jsdelivr.net/gh/nuxodin/lazyfill@0.8.0/polyfills/Element/combo.js', {
    matches:1,
    closest:1,
    prepend:1,
    append:1,
    before:1,
    after:1,
    replaceWidth:1,
    remove:1,
    blur:1, // to use in SVGElement:
    focus:1,
//    contains:1, // moved to Node.prototype
    classList:1,
    getElementsByClassName:1,
    children:1,
}, Element.prototype);

/* blank object "CSS" needed */
if (!window.CSS) window.CSS = {};
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
            findLast:1,
            findLastIndex:1,
            flat:1,
            flatMap:1,
            includes:1,
            keys:1,
            values:1,
        }
    },
    CSS:{
        escape:1,
        supports:1,
    },
    document:{
        currentScript:1,
        caretRangeFromPoint:1,
    },
    Node:{
        prototype:{
            contains:1,
            isConnected:1,
            //inserAfter:1, draft
        },
    },
    Element:{
        prototype:{
            toggleAttribute:1
        }
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
        entries:1,
        fromEntries:1,
        is:1,
        values:1,
        hasOwn:1,
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
    crypto:{
        randomUUID:1,
    },
};
function addFsStruct(obj, realObj, rootUrl){
    var prop;
    for (prop in obj) {
        if (obj[prop] === 1) {
            var url = rootUrl + prop + '.min.js'
            if (!urls[url]) urls[url] = {};
            if (!urls[url][prop]) urls[url][prop] = [];
            urls[url][prop].push(realObj);
        } else {
            addFsStruct(obj[prop], realObj[prop], rootUrl + prop + '/');
        }
    }
}
addFsStruct(lazyfills, window, 'cdn.jsdelivr.net/gh/nuxodin/lazyfill@0.8.0/polyfills/');


var url;
for (url in urls) addGetters(url, urls[url]);

console.log('lazyfill: getters added');

function addCombo(url, obj, target) {
    var prop;
    if (!urls[url]) urls[url] = {};
    for (prop in obj) {
        if (obj[prop] === 1) {
            if (!urls[url][prop]) urls[url][prop] = [];
            urls[url][prop].push(target);
        } else {
            addCombo(url, obj[prop], target[prop]);
        }
    }
}

/* */
// other libaries should check properties like so: if (prop in obj) { ... }; so the getter will not fire

function addGetters(url, props) {
    var prop, i, targets, target, propsNeeded = {};
    for (prop in props) {
        targets = props[prop];
        for (i=0; target=targets[i++] ;) {
            if (prop in target) continue; // not needed
            if (!propsNeeded[prop]) propsNeeded[prop] = [];
            propsNeeded[prop].push(target);
            //console.log('"'+prop+'" not supported, adding getter');
            addGetter(target, prop, url);
        }
    }
    function addGetter(obj, prop, url) {
        Object.defineProperty(obj, prop, {
            configurable: true,
            get: function() {
                // try { throw new Error(); } catch (e) { console.log(e.stack) } // track where it has been added
                //delete obj[prop];
                deleteGetters(); // we have to delete all assigned getters for a url, otherwise the script is parsed anew with every polyfill!
                console.log(prop+' needed > loading sync, you may want to add the polyfill '+url);
                loadScriptSync('https://'+url);
                //if (this[prop] === undefined) console.error('lazyfill: the polyfill should have added the property "'+prop+'"');
                return this[prop];
            },
            set: function(v) {
                //deleteGetters();
                delete obj[prop]; // needed? the getter has already deleted the property!??
                obj[prop] = v;
            }
        });
    }
    function deleteGetters() {
        var prop, targets, target;
        for (prop in propsNeeded) {
            targets = props[prop];
            for (i=0; target=targets[i++];) {
                delete target[prop];
            }
        }
    }
};
function loadScriptSync(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send(null);
    if (xhr.status === 200) {
        var elem = document.createElement('script');
        elem.text = xhr.responseText;
        document.documentElement.firstChild.appendChild(elem);
        elem.setAttribute('data-src',path);
    } else {
        console.warn('lazyfill: failed to load '+path)
    }
}


/*
if (!('contains' in Node.prototype)) {
    Node.prototype.contains = function(el){
        if (el instanceof CharacterData) {
            if (!el.parentNode) return false;
            el = el.parentNode;
        }
        if (this === el) return true;
        if (this instanceof Document) {
            return this.documentElement.contains(el)
        }
        return HTMLElement.prototype.contains.call(this, el);
    }
}
if (!('isConnected' in Node.prototype)) {
    Object.defineProperty(Node.prototype, 'isConnected',{
        get:function(){
            return this.ownerDocument.contains(this);
        }
    })
}
*/

/* very small polyfills, they are not worth adding to the service */
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
