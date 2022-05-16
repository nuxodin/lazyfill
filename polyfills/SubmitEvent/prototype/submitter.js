!function(){ 'use strict';
    var lastBtn = null
    addEventListener('click',function(e){
        if (!e.target.closest) return;
        lastBtn = e.target.closest('button, input[type=submit]');
    }, true);
    addEventListener('submit',function(e){
        if ('submitter' in e) return;
        var canditates = [document.activeElement, lastBtn];
        lastBtn = null;
        for (var i=0; i < canditates.length; i++) {
            var candidate = canditates[i];
            if (!candidate) continue;
            if (!candidate.form) continue;
            if (!candidate.matches('button, input[type=button], input[type=image]')) continue;
            e.submitter = candidate;
            return;
        }
        e.submitter = e.target.querySelector('button, input[type=button], input[type=image]')
    }, true);
}();
