angular
    .module('fridge')
    .factory('Category',[
            '$resource',
            '$http',
            function( $resource, $http ){
                var Category = $resource(
                    '/api/categories/:id',
                    { id: '@id' },
                    {
                        query: {
                            isArray: true,
                            transformResponse:  $http.defaults.transformResponse.concat(function (response) {
                                angular.forEach(response, function (item, i) {
                                    response[i] = new Category(item);
                                });

                                return response;
                            })
                        },
                        save: {
                            method: "POST"
                        },
                        update: {
                            method: 'PUT'
                        }
                    }
                );

                return Category;
            }
        ]
    );