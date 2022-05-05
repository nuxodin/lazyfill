
if (!HTMLInputElement.prototype.showPicker) {
    let types = {'date':1, 'month':1, 'week':1, 'time':1, 'datetime-local':1, 'color':1, 'file':1};
    HTMLInputElement.prototype.showPicker = function() {
        if (this.type in types) {
            this.click();
        }
    };
}