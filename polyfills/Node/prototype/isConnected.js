if (!('isConnected' in Node.prototype)) {
    Object.defineProperty(Node.prototype, 'isConnected',{
        get:function(){
            return this.ownerDocument.contains(this);
        }
    })
}
