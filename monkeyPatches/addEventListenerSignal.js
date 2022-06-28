// idea from https://gist.github.com/samthor/2e11de5976fe673557b0ee14a3cb621a#file-eventlistener-signal-support-js


!function(){

    let supported = false;
    document.createElement('i').addEventListener('click',()=>{}, {
        get signal() {
            supported = true;
            return;
        },
    });
    if (supported) return;

    if (typeof window.AbortController === 'undefined') throw new Error(`can't add, AbortController not supported`);

    const orig = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (eventName, fn, options) {
        if (options && options.signal) {
            // if (!(options.signal instanceof AbortSignal)) throw new Error(`unexpected type (not AbortSignal) for signal arg`);
            if (options.signal.aborted) return; // do nothing, already aborted

            // copy so user can't change us: unlike the fn, the options arg can change, as long as it has the same values
            // const localOptions = { ...options }; // do we really have to be so precise

            options.signal.addEventListener('abort', () => this.removeEventListener(eventName, fn, options) );
        }
        return orig.call(this, eventName, fn, options);
    };


}();
