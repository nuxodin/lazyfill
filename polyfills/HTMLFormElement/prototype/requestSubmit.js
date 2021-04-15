if (!HTMLFormElement.prototype.requestSubmit) {
    HTMLFormElement.prototype.requestSubmit = function(submitter) {
        let submitBtn = submitter;
        if (!submitBtn) {
            submitBtn = document.createElement('input');
            submitBtn.type = 'submit';
            submitBtn.hidden = true;
            this.appendChild(submitBtn);
        }
        submitBtn.click();
        !submitter && this.removeChild(submitBtn);
    };
}
