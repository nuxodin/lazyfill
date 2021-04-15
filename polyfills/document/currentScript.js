if (!('currentScript' in document)) {

    Object.defineProperty(document,'currentScript',{
        get:function(){
            var e = new Error();
            if (!e.stack) console.error('error.stack not available');
            console.error('to be implemented');
        }
    });

}