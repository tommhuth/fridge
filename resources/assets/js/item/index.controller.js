angular
    .module('fridge')
    .controller('ItemIndexController', [
            'items',
            'Notifier',
            'CategoriesRepository',
            'ChecklistItem',
            function(items, Notifier, CategoriesRepository, ChecklistItem){
                var _this = this;
                this.items = items;
                this.category = 0;
                this.categories  = CategoriesRepository.generate(items);
                this.stock = 0;
                this.stocks = [
                    { value: 0, label: "In and out of stock"},
                    { value: 1, label: "In stock"},
                    { value: 2, label: "Out of stock"}
                ];

                this.filterExpression = function(value) {
                    if(_this.category.value === -1 && !value.favorite) {
                        return false;
                    }

                    if(_this.category.value > 0 && value.category_id != _this.category.value) {
                        return false;
                    }

                    if(_this.stock.value === 1 && !value.amount) {
                        return false;
                    }

                    if(_this.stock.value === 2 && value.amount) {
                        return false;
                    }

                    return value;
                };

                this.checklistItem = function(item) {
                    var checklistItem = new ChecklistItem();
                    checklistItem.item_id = item.id;

                    checklistItem.$save();

                    item.current_checklist_item = true;
                    Notifier.make(item.name + " added to today's checklist.");
                };
            }
        ]
    );