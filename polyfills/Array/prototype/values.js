if (!Array.prototype.values) {
    Array.prototype.values = function () {
        function Iterator() { }

        Iterator.prototype.next = function () {
            if (index > selfThis.length - 1) {
                done = true;
            }
            if (done) {
                return { value: undefined, done: true };
            }
            return { value: selfThis[index++], done: false };
        };

        var selfThis = this;
        var index = 0;
        var done;

        return new Iterator();
    };
}