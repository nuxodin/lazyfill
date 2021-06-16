/*! (c) Andrea Giammarchi - ISC */
/*
https://github.com/ungap/insert-after/blob/main/index.js
*/
if (!('insertAfter' in Node.prototype))
  Node.prototype.insertAfter = function insertAfter(node, ref) {
    return this.insertBefore(node, ref ? ref.nextSibling : this.firstChild);
  };