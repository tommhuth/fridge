angular
    .module('fridge')
    .factory('CategoriesRepository',[
            'Category',
            function (Category){
                var service = {
                    items: [],
                    fetch: fetch,
                    generate:generate
                };

                return service;

                /////////////////////

                function generate(list) {
                    var result = [];

                    result.push({ label: "Everything", value: 0});
                    result.push({ label: "Favorites", value: -1});

                    for(var i = 0; i < list.length; i++) {
                        var item = list[i];
                        var exists = result.find(function(e) { return e.value === item.category_id ; });

                        if(!exists) {
                            result.push( { value: item.category_id, label: item.category.name  });
                        }
                    }

                    return result;
                }

                function fetch(){
                    return Category.query();
                }
            }
        ]
    );