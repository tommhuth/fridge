angular
    .module('fridge')
    .config([
        '$locationProvider',
        '$routeProvider',
        function( $locationProvider, $routeProvider ) {
            $locationProvider.html5Mode(true);
            $routeProvider.caseInsensitiveMatch = true;

            $routeProvider
                .when('/', {
                    templateUrl: 'js/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrl'
                })
                .when('/about', {
                    templateUrl: 'js/about/about.html',
                    controllerAs: 'ctrl'
                })
                .when('/items', {
                    templateUrl: 'js/item/index.html',
                    controller: 'ItemIndexController',
                    controllerAs: 'ctrl',
                    resolve : {
                        items: [
                            'Item',
                            function( Item){
                                return Item.query().$promise
                            }
                        ]
                    }
                })
                .when('/items/:id', {
                    templateUrl: 'js/item/show.html',
                    controller: 'ItemShowController',
                    controllerAs: 'ctrl',
                    isSpecial: true,
                    resolve : {
                        item: [
                            'ItemRepository',
                            '$route',
                            function( ItemRepository,  $route ){
                                return ItemRepository.getItem($route.current.params.id);
                            }
                        ]
                    }
                })
                .when('/checklist', {
                    templateUrl: 'js/checklist/index.html',
                    controller: 'ChecklistIndexController',
                    controllerAs: 'ctrl',
                    resolve : {
                        items: [
                            'ChecklistItem',
                            function( ChecklistItem){
                                return ChecklistItem.get({id: ChecklistItem.getCurrentDate() }).$promise;
                            }
                        ]
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]
);