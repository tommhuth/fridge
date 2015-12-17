angular
    .module('fridge')
    .directive('frgLayout',[
            '$rootScope',
            'Layout',
            '$route',
            function($rootScope, Layout , $route){
               return {
                   restrict: "A",
                   controllerAs: 'layout',
                   bindToController: true,
                   controller: function(){
                        this.showMenu = Layout.showMenu;
                        this.isOffset = Layout.isOffset;
                   },
                   link: function(scope, element) {
                       $rootScope.$on('$viewContentLoaded', function(current) {
                           if($route.current.$$route.isSpecial) {
                               element.addClass('is-special');
                           }else {
                               element.removeClass('is-special');

                               setTimeout(function(){
                                   element[0].className += "";
                               }, 100);
                           }
                       });
                   }
               };
            }
        ]
    );