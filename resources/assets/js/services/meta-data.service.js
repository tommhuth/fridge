angular
    .module('fridge')
    .factory('MetaData', [
        '$document',
        function($document){
            var service = {
                get : get
            };

            return service;

            /////////////////////////////

            function get(name){
                return $document[0].querySelector('meta[name="' + name + '"]').content;
            }
        }
    ]);