angular
    .module('fridge')
    .directive('frgCloseMenu',[
           '$rootScope',
           '$document',
            'Layout',
           function($rootScope, $document, Layout){
               return {
                   restrict: "A",
                   link: function(scope, element) {
                       element.on('click',   function(event){
                           if(event.target.nodeName === "A"){
                               scope.$apply(function(){
                                   Layout.setMenu(false);
                               });
                           }
                       });

                       $document.on('keyup',   function(event){
                           if(event.which === 27) {
                               scope.$apply(function(){
                                   Layout.setMenu(false);
                               });
                           }
                       });
                   }
               };
           }
        ]
    );