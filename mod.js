!function(window, document){ 'use strict';

var urls = {
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
        'URL':[window], // ie11: this will not work as it has "URL" but not as a constructor, what should we do?
        'URLSearchParams':[window]
    },
    'unpkg.com/@ungap/weakset':{
        'WeakSet':[window]
    },
    'unpkg.com/@ungap/custom-elements@0.1.15/es.js':{
        'customElements':[document]
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
    }
};
function createUrls(obj, realObj, rootUrl){
    var prop;
    for (prop in obj) {
        if (obj[prop] === 1) {
            var url = rootUrl + prop + '.js'
            //addGetter(realObj, prop, url);
            urls[url] = {};
            urls[url][prop] = [realObj];
        } else {
            createUrls(obj[prop], realObj[prop], rootUrl + prop + '/');
        }
    }
}
createUrls(lazyfills, window, 'cdn.jsdelivr.net/gh/nuxodin/lazyfill@0.0.2/polyfills/');


var url, props, prop, obj, objects, i;
for (url in urls) {
    props = urls[url];
    for (prop in props) {
        objects = props[prop];
        for (i=0; obj=objects[i++];) {
            if (prop in obj) {
                console.log('not needed '+prop+' in '+url+'<br>')
                continue;
            }
            //console.log('"'+prop+'" not supported, adding getter');
            addGetter(obj, prop, url);
        }
    }
}

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
        elem.setAttribute('data-c1-src',path);
    } else {
        console.warn('failed to load '+path)
    }
}


}(window, document);
