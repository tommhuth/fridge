angular
    .module('fridge')
    .directive('frgSplash', [
            '$timeout',
            '$rootScope',
            'ErrorHandler',
            function($timeout, $rootScope, ErrorHandler){
                return {
                    controllerAs: 'splash',
                    bindToController: true,
                    controller: function(){
                      this.error = ErrorHandler.status;
                    },
                    link: function(scope, element, attrs, controller) {
                        angular.element('body').addClass('disabled');

                        $rootScope.$on('$routeChangeSuccess', function(){
                            $timeout(function(){
                                element.remove();
                                angular.element('body').removeClass('disabled');
                            }, 200);
                        });
                    }
                }
            }
        ]
    );