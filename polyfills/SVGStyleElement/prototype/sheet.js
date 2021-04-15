// ie11
if (!('sheet' in SVGStyleElement.prototype)) {
    Object.defineProperty(SVGStyleElement.prototype, 'sheet', {
        get:function(){
            var all = d.styleSheets;
            for (var i=0, sheet; sheet=all[i++];) {
                if (sheet.ownerNode === this) return sheet;
            }
        }
    });
}
