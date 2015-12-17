angular
    .module('fridge')
    .directive('frgNav', function(){
        return {
            restrict: "E",
            replace: true,
            bindToController: true,
            controllerAs: 'nav',
            templateUrl:"js/layout/frg-nav.html",
            controller: [
                'Layout',
                function ( Layout ) {
                    this.showMenu = Layout.showMenu;
                    this.setMenu = Layout.setMenu;
                    this.isOffset = Layout.isOffset;
                }
            ]
        }
    });