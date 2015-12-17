angular
    .module('fridge')
    .factory('ItemRepository',[
            'Item',
            '$rootScope',
            '$q',
            function (Item,$rootScope, $q){
                var service = {
                    items: [],
                    currentResult: [],
                    currentKey: "",
                    search: search,
                    find: find,
                    create: create,
                    hasItem:hasItem,
                    getItem: getItem,
                    createdItem: {},
                    status:  {
                        isWorking: null,
                        isSearching: null
                    }
                };

                return service;

                /////////////////////

                function search(keyword) {
                    service.currentKey = keyword;
                    service.status.isSearching = true;

                    return Item
                        .query({search: keyword})
                        .$promise
                        .then(function(result) {
                            service.currentResult.length = 0;

                            for(var i = 0; i < result.length; i++) {
                                var item = result[i];

                                service.currentResult.push(item);
                               store(item);
                            }

                            return result;
                        })
                        .finally(function(){
                            service.status.isSearching = false;
                        });
                }

                function hasItem(name) {
                    var deferred = $q.defer();
                    var cached = service.items.find(function(e){ return e.name.trim().toLowerCase() === name.trim().toLowerCase(); });

                    if(cached) {
                        deferred.resolve(cached);
                    } else {
                        Item.query({search: name}).$promise
                            .then(function(list) {
                                var item = list.find(function(e) {return e.name.trim().toLowerCase() === name.trim().toLowerCase(); });

                                if(item) {
                                    deferred.resolve(item);
                                } else {
                                    deferred.reject()
                                }
                            })
                            .finally(function(){ service.status.isSearching = false; });
                    }

                    service.status.isSearching = true;

                    return deferred.promise;
                }

                function getItem(id) {
                    var cached = service.items.find(function(e){ return e.name.trim() === name.trim(); });

                    if(cached) {
                        return cached;
                    }else {
                        return Item.get({id: id}, store).$promise;
                    }
                }

                function store(item){
                    var hasItem = service.items.find(function(e){ return e.id === item.id;});

                    if(!hasItem) {
                        service.items.push(item);
                    }
                }

                function create(name){
                    var item = new Item();
                    item.name = name;

                    service.status.isCreating = true;

                    return item.$save().finally(function(){ service.status.isCreating = false; });
                }

                function find(exp){
                    return service.items.find(exp);
                }
            }
        ]
    );