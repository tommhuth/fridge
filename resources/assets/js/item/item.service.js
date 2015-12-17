angular
    .module('fridge')
    .factory('Item',[
            '$resource',
            '$http',
            function( $resource, $http ){
                var Item = $resource(
                    '/api/items/:id',
                    { id: '@id' },
                    {
                        query: {
                            isArray: true,
                            transformResponse:  $http.defaults.transformResponse.concat(function (response) {
                                angular.forEach(response, function (item, i) {
                                    response[i] = new Item(item);
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

                Item.prototype.getAmount = function(){
                    return !this.isFractionAmount() ?  this.amount : Math.floor(this.amount);
                };

                Item.prototype.isFractionAmount = function(){
                    return !(Math.floor(this.amount) === this.amount);
                };

                Item.prototype.toggleFavorite = function(){
                    this.favorite = !this.favorite;

                    this.$update();
                };

                return Item;
            }
        ]
    );