angular
    .module('fridge')
    .directive('frgViewSpinner', [
            'Spinner',
            '$rootScope',
            function(Spinner, $rootScope){
                return {
                    replace: true,
                    template: [
                        '<div class="view-spinner" ng-show="spinner.status.visible"><span class="icon-repeat" ></span></div>'
                    ].join(''),
                    controllerAs: 'spinner',
                    bindToController: true,
                    controller: [
                        function(){
                            this.status = Spinner.status;
                        }
                    ],
                    link: function(scope, element, attrs, controller) {
                        $rootScope.$on('$routeChangeStart', Spinner.show);

                        $rootScope.$on('$routeChangeSuccess', Spinner.hide);

                        $rootScope.$on('$routeChangeError', Spinner.hide);
                    }
                }
            }
        ]
    );