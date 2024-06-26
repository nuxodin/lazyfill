!function(window, document){ 'use strict';
// other libaries should check properties like so: if (prop in obj) { ... }; so the getter will not fire

var root = 'cdn.jsdelivr.net/gh/nuxodin/lazyfill@1.7.14/';
var ending = '.min.js';

//var root = 'localhost/github/lazyfill/'; var ending = '.js';

/* very small polyfills, they are not worth adding to the service */
if (!NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach; // ie11
if (!document.scrollingElement) document.scrollingElement = document.documentElement; // ie11
if (!window.crypto) window.crypto = window.msCrypto; // ie11
if (!window.SubmitEvent) window.SubmitEvent = Event; // safari v?

var urls = {
    'cdn.jsdelivr.net/npm/cookie-store@3.0.0/index.min.js': {
        'cookieStore': [window],
    },
    'cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js':{
        'fetch':[window],
        //'Headers':[window], 'Request':[window], 'Response':[window],
    },
    'cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js':{
        'Promise':[window]
    },
    'polyfill.io/v3/polyfill.min.js?features=IntersectionObserver':{
        'IntersectionObserver':[window]
    },
    'cdn.jsdelivr.net/npm/@juggle/resize-observer@3.3.1/lib/exports/resize-observer.umd.js':{ // dit not work: 'polyfill.io/v3/polyfill.min.js?features=ResizeObserver'
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
    /* not ready yet, exposes window.temportal.Temporal */
    'cdn.jsdelivr.net/npm/@js-temporal/polyfill@0.4.0/dist/index.umd.min.js':{
        Temporal:[window],
        temporal:[window],
    },
    'unpkg.com/@ungap/custom-elements@0.1.15/es.js':{
        'customElements':[window],
    },
    // 'cdn.jsdelivr.net/gh/nuxodin/structured-clone@2.4.0/index.min.js':{ // makes problems in safari
    //     'structuredClone':[window],
    // },
    'cdn.jsdelivr.net/npm/urlpattern-polyfill@1.0.0-rc5/dist/index.umd.js':{
        'URLPattern':[window],
    },
    'unpkg.com/web-streams-polyfill@3.2.1/dist/polyfill.min.js':{
	    'ReadableStream':[window],
    },
    //'raw.githubusercontent.com/mozilla/sanitizer-polyfill/main/dist/sanitizer-polyfill.min.js':{
    'mozilla.github.io/sanitizer-polyfill/dist/sanitizer-polyfill.min.js':{
	    'Sanitizer':[window],
        'setHTML':[Element.prototype],
    },
};


var path = 'cdn.jsdelivr.net/gh/tc39/proposal-change-array-by-copy@main/polyfill.min.js';
addCombo(path, {
    toReversed:1,
    toSorted:1,
    with:1,
}, Object.getPrototypeOf(Int8Array.prototype));
addCombo(path, {
    toReversed:1,
    toSorted:1,
    with:1,
    toSpliced:1,
}, Array.prototype);

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

addCombo(root+'polyfills/Element/combo'+ending, {
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
    classList:1,
    getElementsByClassName:1,
    children:1,
}, Element.prototype);


/* set methods, stage 2
addCombo('cdn.jsdelivr.net/npm/set-extensions@1.5.0/dist/index'+ending, {
    intersection:1,
    union:1,
    difference:1,
    symmetricDifference:1,
    isSubsetOf:1,
    isDisjointFrom:1,
    isSupersetOf:1,
}, Set.prototype);
*/

/* iterator helpers, stage 2
var getPrototypeOf = Object.getPrototypeOf;
var AsyncIteratorPrototype = getPrototypeOf(getPrototypeOf(getPrototypeOf((async function* () {})()[Symbol.asyncIterator]())));
var IteratorPrototype = getPrototypeOf(getPrototypeOf([][Symbol.iterator]()));
var props = {
    map:1,
    chain:1,
    count:1,
    cycle:1,
    drop:1,
    dropWhile:1,
    every:1,
    filter:1,
    find:1,
    findIndex:1,
    flatMap:1,
    forEach:1,
    fuse:1,
    join:1,
    map:1,
    max:1,
    min:1,
    partition:1,
    reduce:1,
    some:1,
    take:1,
    takeWhile:1,
    toArray:1,
    zip:1,
}
console.log(IteratorPrototype)
path = 'cdn.jsdelivr.net/npm/iterator-polyfill@1.0.9/dist/index.min.js';
addCombo(path, props, IteratorPrototype);
addCombo(path, props, AsyncIteratorPrototype);
*/


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
        registerProperty:1,
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
            toggleAttribute:1,
            isVisible:1,
            scrollIntoViewIfNeeded:1,
            replaceChildren:1,
        }
    },
    HTMLElement:{
        prototype:{
            inert:1
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
    HTMLSlotElement:{
        prototype:{
            assignedElements:1
        }
    },
    Math:{
        trunc:1,
        sign:1,
    },
    navigator:{
        share:1
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
        any:1,
        withResolvers:1,
    },
    RegExp:{
        prototype:{
            flags:1,
        }
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
            startsWith:1,
            replaceAll:1,
        }
    },
    SubmitEvent:{
        prototype:{
            submitter:1
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
            var url = rootUrl + prop + ending
            if (!urls[url]) urls[url] = {};
            if (!urls[url][prop]) urls[url][prop] = [];
            urls[url][prop].push(realObj);
        } else {
            if (realObj[prop]===undefined) {
                console.warn('💊 lazyfill: Object '+prop+' not defined to polyfill its properties!');
            } else {
                addFsStruct(obj[prop], realObj[prop], rootUrl + prop + '/');
            }

        }
    }
}
addFsStruct(lazyfills, window, root+'polyfills/');


for (let url in urls) addGetters(url, urls[url]);

/* To list polyfills in the readme: *
//IteratorPrototype.name = 'Iterator';
//AsyncIteratorPrototype.name = 'AsyncIterator';
CSS.name = 'CSS';
let supports = {};
Object.values(urls).forEach(function(props){
    Object.entries(props).forEach(([prop, objects])=>{
        objects.forEach(obj=>{
            let name = obj[Symbol.toStringTag] || obj.name || obj.constructor.name
            if (!supports[name]) supports[name] = [];
            supports[name].push(prop)
        })
    })
});
let output = '\n<ul>';
Object.entries(supports).map(([obj, props])=>{
    output += '\n   <li>'+obj
    output += '\n   <ul>'+props.map(prop => `\n      <li>${prop}`).join('')+'\n   </ul>';
})
output += '\n</ul>'
console.log(output)
/* */

console.log('💊 lazyfill: getters added, ready!');

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
                deleteGetters(); // we have to delete all assigned getters for a url, otherwise the script is parsed anew with every polyfill!
                console.log('💊 lazyfill: "'+prop+'" polyfilled (sync!), you need the polyfill '+url);

                // umd
                window.exports = {};
                window.module = true; // todo: needed by umd but i dont know why?
                loadScriptSync('https://'+url);
                // if (!this[prop]) this[prop] = exports[prop]; // todo: loop exports?
                // new: polyfill the prototype, not the instance, ok?
                if (!obj[prop]) obj[prop] = exports[prop]; // todo: loop exports?
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


/* Monkey Patches */
var monkeyPatches = {
    focusOptions:1,
    elContainsText:1,
    forceToggle:1,
    addEventListenerSignal:1,
};
var dummyEl = document.createElement('i');
// focus options
dummyEl.focus({
    get preventScroll() {
        delete monkeyPatches.focusOptions;
    },
});
// IE11 contains-bug, textNodes are not containing
dummyEl.innerHTML = ' ';
if (dummyEl.contains(dummyEl.firstChild)) delete monkeyPatches.elContainsText;

// classList.toggle force options
var cl = dummyEl.classList;
cl.toggle('test',false);
if (!cl.contains('test')) delete monkeyPatches.forceToggle

// addEventListener signal option
dummyEl.addEventListener('click',()=>{}, {
    get signal() {
        delete monkeyPatches.addEventListenerSignal;
    },
});

// load patches
for (let patch in monkeyPatches) {
    console.log(patch)
    loadScriptAsync('https://'+root + 'monkeyPatches/' + patch + ending, true);
}



/* helpers */
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
        console.warn('💊 lazyfill: load failed '+path)
    }
}
function loadScriptAsync(path) {
    var elem = document.createElement('script');
    elem.async = false;
    elem.src = path;
    //elem.setAttribute('src',path);
    document.documentElement.firstChild.appendChild(elem);
}


/* more *
// iterators, available on ch/ff, not useable for ie11
if (window.Symbol && Symbol.iterator) {
	[HTMLCollection,NodeList,StyleSheetList,window.CSSRuleList].forEach(function(Interface){
		if (!Interface) return;
		var proto = Interface.prototype;
		if (proto[Symbol.iterator]) return;
		proto[Symbol.iterator] = Array.prototype[Symbol.iterator];
	});
}
/* */


}(window, document);
