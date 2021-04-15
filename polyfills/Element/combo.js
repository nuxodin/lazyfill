!function(){ 'use strict';

var ElProto = Element.prototype;

var poly = {
	matches: ElProto.msMatchesSelector || ElProto.webkitMatchesSelector,
	closest: function(sel) {
		return this.matches(sel) ? this : (this.parentNode && this.parentNode.closest ? this.parentNode.closest(sel) : null);
	},
	prepend: function prepend() {
		this.insertBefore(mutationMacro(arguments) , this.firstChild);
	},
	append: function append() {
		this.appendChild(mutationMacro(arguments));
	},
	before: function before() {
		var parentNode = this.parentNode;
		parentNode && parentNode.insertBefore(mutationMacro(arguments), this);
	},
	after: function after() {
		var parentNode = this.parentNode;
		parentNode && parentNode.insertBefore(mutationMacro(arguments) , this.nextSibling);
	},
	replace: function replace() {
		var parentNode = this.parentNode;
		parentNode && parentNode.replaceChild(mutationMacro(arguments), this);
	},
	remove: function remove() {
		var parentNode = this.parentNode;
		parentNode && parentNode.removeChild(this);
	}
};
for (var prop in poly) {
    if (!(prop in ElProto)) ElProto[prop] = poly[prop];
}
function textNodeIfString(node) {
	return typeof node === 'string' ? d.createTextNode(node) : node;
}
function mutationMacro(nodes) {
	if (nodes.length === 1) return textNodeIfString(nodes[0]);
	for (var
		fragment = d.createDocumentFragment(),
		list = slice.call(nodes),
		i = 0;
		i < nodes.length;
		i++
	) {
		fragment.appendChild(textNodeIfString(list[i]));
	}
	return fragment;
}


// copy from HTMLElement.proto to Element.proto (mainly for SVGElements ie11)
var props = [
    'blur', // ie11
    'focus',
    'contains',
    'classList',
    'getElementsByClassName',
    // 'className',
    // 'insertAdjacentElement',
    // 'insertAdjacentHTML',
    // 'insertAdjacentText',
    'children' // bug, webkit, chrome, ie has not children on the prototype
];
function copyProperty(prop, from, to){
    var desc = Object.getOwnPropertyDescriptor(from, prop);
    Object.defineProperty(to, prop, desc);
}
for (var i=0, prop; prop = props[i++];) {
    !(prop in ElProto) && copyProperty(prop, HTMLElement.prototype, ElProto);
}



}();
