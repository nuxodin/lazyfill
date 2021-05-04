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
