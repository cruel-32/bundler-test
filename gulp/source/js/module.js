(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jQuery'], factory); //의존성
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jQuery')); //의존성
    } else {
        // Browser globals (root is window)
        root._wac = factory(root.jQuery);
    }
}(this, function ($) {//의존성
    'use strict';

    function JdPopup() {}
    return {
        JdPopup: JdPopup,
    };
}));