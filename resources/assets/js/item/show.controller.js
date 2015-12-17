angular
    .module('fridge')
    .controller('ItemShowController', [
            'item',
            '$location',
            '$timeout',
            'CategoriesRepository',
            'Layout',
            'Navigator',
            function( item , $location, $timeout, CategoriesRepository, Layout, Navigator){
                var _this = this;
                var tid = null;

                this.isOffset = Layout.isOffset;
                this.item = item;
                this.categories = CategoriesRepository.fetch();
                this.editVisible = false;
                this.input = {
                    show: false,
                    amount: this.item.amount,
                    name: this.item.name,
                    category_id: this.item.category_id
                };

                this.toggleEdit  = function(state) {
                    this.input.amount= this.item.amount;
                    this.input.name= this.item.name;
                    this.editVisible = state;
                    Layout.setOffset(state);
                };

                this.increase = function(){
                    this.item.amount += .5;

                    $timeout.cancel(tid);
                    tid = $timeout(function(){
                        _this.item.$update();
                    }, 700);
                };

                this.decrease = function(){
                    if(!this.item.amount) return;

                    this.item.amount -= .5;

                    $timeout.cancel(tid);
                    tid = $timeout(function(){
                        _this.item.$update();
                    }, 700);
                };

                this.update = function(){
                    var oldSlug = this.item.slug;
                    this.item.name = this.input.name;
                    this.item.category_id = this.input.category_id;
                    this.item.amount = this.input.amount;

                    this.toggleEdit(false);
                    this.item.$update().then(function(result) {
                        if(result.slug != oldSlug) Navigator.to.item(result.slug, true);
                    });
                };
            }
        ]
    );