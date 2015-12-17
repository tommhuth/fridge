angular
    .module('fridge')
    .controller('ChecklistIndexController',[
            'items',
            'ChecklistItem',
            function( items, ChecklistItem ){
                this.items = items;

                this.clearList = function(){
                    this.items.length = 0;

                    ChecklistItem.delete({id: ChecklistItem.getCurrentDate() });
                }
            }
        ]
    );