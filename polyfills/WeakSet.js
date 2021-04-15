if (!window.WeakSet) { 'use strict'
    WeakSet = function(iterable){
        this.Map = new WeakMap();
        iterable && iterable.forEach(this.add, this);
    }
    WeakSet.prototype = {
        add:function(value){
            this.Map.set(value, 1);
            return this;
        },
        delete:function(value){ return this.Map.delete(value); },
        has:function(value){ return this.Map.has(value); }
    }
}
