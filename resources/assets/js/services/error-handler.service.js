angular
    .module('fridge')
    .factory('ErrorHandler', function(){
        var service = {
            make: make,
            status: {
                code: 0,
                message: "",
                hasError: false
            }
        };

        return service;

        ///////////////////////////7

        function make(code, message){
            service.status.code = code;
            service.status.message = message;
            service.status.hasError = true;
        }
    });