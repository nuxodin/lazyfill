// classList.toggle(x, force!) ie11
!function(){
    var cl = document.createElement('div').classList;
    cl.toggle('test',false);
    if (!cl.contains('test')) return;
	var original = DOMTokenList.prototype.toggle;
	DOMTokenList.prototype.toggle = function(name, force){
		if (force!==undefined) {
			this[force?'add':'remove'](name);
			return force;
		}
		return original.call(this, name);
	}
}();
