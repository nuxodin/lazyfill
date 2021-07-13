/* IE11 contains-bug, textNodes are not containing  */
!function(d){
    var t = d.createTextNode(''), el = d.createElement('span');
    el.appendChild(t);
    if (!el.contains(t)) {
        HTMLElement.prototype.contains = function(contains) {
            return function(el) {
                return contains.call(this, !el || el.nodeType === 1 ? el : el.parentNode);
            };
        }(HTMLElement.prototype.contains);
    }
}(document);
