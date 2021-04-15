if (!HTMLFormElement.prototype.reportValidity) {
    HTMLFormElement.prototype.reportValidity = function() {
        if (this.checkValidity()) return true;
        if (this.noValidate) {
            this.noValidate = false;
            this.requestSubmit();
            this.noValidate = true;
        } else {
            this.requestSubmit();
        }
        return false;
    };
}

/* old
if (!HTMLFormElement.prototype.reportValidity) {
    HTMLFormElement.prototype.reportValidity = function() {
        if (this.checkValidity()) return true;
        var btn = d.createElement('button');
        this.appendChild(btn);
        btn.click();
        this.removeChild(btn);
        return false;
    };
}
*/