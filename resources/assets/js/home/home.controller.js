angular
    .module('fridge')
    .controller('HomeController', [
            'ItemRepository',
            '$timeout',
            'Navigator',
            function( ItemRepository, $timeout, Navigator){
                var _this = this;
                var id;
                this.keyword = "";
                this.items = [];
                this.createdItem = {};
                this.status = ItemRepository.status;
                this.hasSearched = false;

                this.search = function(){
                    this.createdItem = {};
                    this.items.length = 0;

                    if(_this.keyword) {
                        $timeout.cancel(id);

                        _this.hasSearched = false;

                        id = $timeout(function () {
                            ItemRepository.search(_this.keyword)
                                .then(function(list) {
                                    angular.copy(list, _this.items);
                                    _this.hasSearched = true;
                                });
                        }, 250);
                    }
                };

                this.findOrCreate = function(){
                    ItemRepository.hasItem(_this.keyword)
                        .then(function(e){ Navigator.to.item(e.slug);  })
                        .catch(ItemRepository.create.bind(ItemRepository, _this.keyword))
                        .then(function(e) { angular.copy(e, _this.createdItem ); });
                };
            }
        ]
    );