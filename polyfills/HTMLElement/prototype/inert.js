
if (!('inert' in HTMLElement.prototype)) {

  Object.defineProperty(HTMLElement.prototype, 'inert', {
    enumerable: true,
    get: function() {
      return this.hasAttribute('inert');
    },
    set: function(inert) {
      inert ? this.setAttribute('inert','') : this.removeAttribute('inert');
    },
  });

}
