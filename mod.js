!function(){

var urls {
    'https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/fetch.js':{
        'fetch':[window]
        'Headers':[window]
        'Request':[window]
        'Response':[window]
    },
    'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js':{
        'Promise':[window]
    }
    'https://polyfill.io/v3/polyfill.min.js?features=Intl':{
        'Intl':[window]
    }
    'https://polyfill.io/v3/polyfill.min.js?features=Intl':{
        'Intl':[window]
    }
    'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver':{
        'IntersectionObserver':[window]
    }
    'https://polyfill.io/v3/polyfill.min.js?features=AbortController':{
        'AbortController':[window]
    }
    'https://polyfill.io/v3/polyfill.min.js?features=URL':{
        'URL':[window]
        'URLSearchParams':[window]
    }
};
    
var url, props, prop, obj, objects;
for (url in urls) {
    props = urls[url];
    for (prop in props) {
        objects = props[prop];
        for (var i=0; obj; obj=objects[i++];) {
            addGetter(obj, prop, url);
        }
    }
}

//addGetter(window, 'fetch', 'https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/fetch.js');

function addGetter(obj, prop, url) {
    if (obj.hasOwnProperty(prop)) return;
    //if (hasOwn.call(obj, prop)) return;
    /* other libaries should check properties like so: if (prop in obj) { ... }; so the getter will not fire */
    Object.defineProperty(obj, prop, {
        configurable: true,
        get: function() {
            delete obj[prop];
            loadScriptSync(url)
            //return c1Use.call(this, prop);
        },
        set: function(v) { // needed?
            delete obj[prop];
            obj[prop] = v;
        }
    });
};

function loadScriptSync(path, cb, eb) {
    var request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send(null);
    if (request.status === 200) {
        var elem = d.createElement('script');
        elem.text = request.responseText;
        d.documentElement.firstChild.appendChild(elem);
        elem.setAttribute('data-c1-src',path);
        cb({type:'load'});
    } else {
        eb({type:'error'});
    }
    console.warn('deprecated to load '+path+' sync');
}





}();

