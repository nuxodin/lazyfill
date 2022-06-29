// idea from https://gist.github.com/samthor/2e11de5976fe673557b0ee14a3cb621a#file-eventlistener-signal-support-js

!function(){

    let supported = false;
    document.createElement('i').addEventListener('click',()=>{}, {
        get signal() { supported = true; },
    });
    if (supported) return;
    if (!window.AbortController) throw new Error(`AbortController not supported`);

    const orig = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (eventName, fn, options) {
        if (options && options.signal) {
            if (options.signal.aborted) return; // do nothing, already aborted
            options.signal.addEventListener('abort', () => this.removeEventListener(eventName, fn, { ...options }) );
        }
        return orig.call(this, eventName, fn, options);
    };

}();
