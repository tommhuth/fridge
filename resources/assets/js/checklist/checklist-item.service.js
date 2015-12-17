angular
    .module('fridge')
    .factory('ChecklistItem',[
            'Item',
            '$resource',
            '$http',
            function( Item, $resource, $http ){
                var ChecklistItem = $resource(
                    '/api/checklist-items/:id',
                    { id: '@id' },
                    {
                        get: {
                            isArray: true,
                            transformResponse: $http.defaults.transformResponse.concat(parseResponseList)
                        },
                        query: {
                            isArray: true,
                            transformResponse: $http.defaults.transformResponse.concat(parseResponseList)
                        },
                        update: {
                            method: 'PUT'
                        }
                    }
                );

                ChecklistItem.getCurrentDate = function () {
                    var date = new Date();

                    return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
                };

                function parseResponseList(response){
                    angular.forEach(response, function (item, i) {
                        var checklistItem = new ChecklistItem(item);
                        checklistItem.item = new Item(item.item);

                        response[i] = checklistItem;
                    });

                    return response;
                }

                return ChecklistItem;
            }
        ]
    );