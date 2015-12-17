angular
    .module('fridge')
    .factory('Navigator', [
            '$location',
            function($location){
                var service =  {
                    to: {
                        item: toItem,
                        error: error
                    }
                };

                return service;

                /////////////////////

                function toItem(id, replace) {
                    if(replace) $location.replace();

                    $location.path('/items/' + id);
                }

                function error (){
                    $location.path('/ooops').replace();
                }
            }
        ]
    );