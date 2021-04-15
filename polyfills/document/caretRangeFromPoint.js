if (!document.caretRangeFromPoint) { // polyfill for ff
    document.caretRangeFromPoint = function(x,y){
        let caretP = document.caretPositionFromPoint(x,y);
        let range = document.createRange();
        range.setStart(caretP.offsetNode, caretP.offset);
        return range;
    };
}
