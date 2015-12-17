angular
    .module('fridge')
    .run([
        '$http',
        'MetaData',
        function($http, MetaData) {
            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            $http.defaults.headers.common['X-API-KEY'] = MetaData.get('X-API-KEY');
        }]
    )
    .config([
        '$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push([
                '$q',
                '$injector',
                '$window',
                'ErrorHandler',
                'Notifier',
                function($q, $injector, $window, ErrorHandler, Notifier) {
                    return {
                        responseError: function(rejection) {
                            if(rejection.status === 403) {
                                $window.location.href="/logout";
                            }

                            ErrorHandler.make(rejection.status, "Ooops");
                            Notifier.make("Ooops, something went wrong!", true);

                            return $q.reject(rejection);
                        }
                    };
                }
            ]);
        }
    ]);