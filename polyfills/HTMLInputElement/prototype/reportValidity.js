if (!HTMLInputElement.prototype.reportValidity) {
    HTMLInputElement.prototype.reportValidity = function(){
        if (this.checkValidity()) return true
        var tmpForm;
        if (!this.form) {
            var tmpForm = d.createElement('form');
            tmpForm.style.display = 'inline';
            this.before(tmpForm);
            tmpForm.append(this);
        }
        var siblings = Array.from(this.form.elements).filter(function(input){
            return input !== this && !!input.checkValidity && !input.disabled;
        },this);
        siblings.forEach(function(input){
            input.disabled = true;
        });
        this.form.reportValidity();
        siblings.forEach(function(input){
            input.disabled = false;
        });
        if (tmpForm) {
            tmpForm.before(this);
            tmpForm.remove();
        }
        this.focus();
        this.selectionStart = 0;
        return false;
    };
}