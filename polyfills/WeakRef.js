
/**


Works in IE and Firefox
not in Chrome and Safari :(

Not very efficient, as it creates a HTMLCollection in the constructor and for deref()
AND as it dont work for safari and chrome, it looses even more memory as the HTMLCollections are not garbage collected

inspiration: https://github.com/whatwg/dom/issues/706
"Creating new HTMLCollection instances everytime will increase management cost."


Todo: any other solutions / hacks?

*/

console.log('dont use this!');

if (!window.WeakRef) {
    let el = document.createElement('div');
    window.WeakRef = function(value) {
        this.id = Math.random();
        let collection = el.getElementsByTagName("x"+this.id);
        collection.expando = value;
        collection = null;
    }
    WeakRef.prototype = {
        deref: function() {
            return el.getElementsByTagName("x"+this.id).expando;
        }
    }
}

/* todo: how to?
function FinalizationGroup(fn) {

}
FinalizationGroup.prototype = {
    register(value, name) {
    },
    unregister(value, name) {
    },
    cleanupSome(fn) {
    }
}
*/