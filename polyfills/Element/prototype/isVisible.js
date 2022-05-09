// todo
// wpt: https://github.com/web-platform-tests/wpt/blob/ff7c98f8fa23c8c36099d267ac258c0005f81180/css/cssom-view/isVisible.html

if (!Element.prototype.isVisible) {
    Element.prototype.isVisible = function(options){

        // If this does not have an associated layout box, return false.
        if (!this.offsetParent) return false;
        if (this.offsetWidth === 0 || this.offsetHeight === 0) return false;

        // If a shadow-inclusive ancestor of this has content-visibility: hidden, return false.
        // can we skip "this"? It probably won't make offsetHeight.
        let oParent = this;
        while (oParent) {
            const style = getComputedStyle(oParent);
            if (style.getPropertyValue('content-visibility') === 'hidden') return false;
            oParent = this.offsetParent;
        }

        // If the checkAriaHidden dictionary member of options is true, and this is hidden (in the ARIA sense), return false. (removed from spec?)

        // If the checkInert dictionary member of options is true, and this is inert, return false.
        if (options && options.checkInert && this.closest('[inert]')) return false;

        // If the checkOpacity dictionary member of options is true, and this, or a shadow-inclusive ancestor of this, has a computed opacity value of 0, return false.
        if (options && options.checkOpacity && (style.getPropertyValue('opacity') === '0' || style.getPropertyValue('opacity') === '0.0')) return false;

        // If the checkVisibilityCSS dictionary member of options is true, and this is invisible, return false.
        if (options && options.checkVisibilityCSS && style.getPropertyValue('visibility') === 'hidden') return false;

        return true;

    }
}
