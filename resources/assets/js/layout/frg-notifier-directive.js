angular
    .module('fridge')
    .factory('Notifier', [
        '$timeout',
        function($timeout){
            var duration = 2000;
            var tid;
            var active = false;
            var inited = false;
            var service = {
                messages: [],
                make: make,
                dismiss: dismiss,
                empty: empty,
                active : function() { return active; }
            };

            return service;

            /////////////////////////////////////////////

            function empty() {
                $timeout.cancel(tid);
                service.messages.length =0 ;
            }

            function make(title, error){
                service.messages.push({
                    title: title,
                    error: error
                });

                if(!inited) delayRemove();
            }

            function delayRemove(){
                inited = true;
                active = true;

                tid = $timeout(function(){
                    $timeout(function(){
                        close();

                        if(service.messages.length) {
                            delayRemove();
                        } else {
                            inited = false;
                        }
                    }, 500);

                    active = false;
                }, duration);
            }

            function close(){
                service.messages.splice(0,1);
            }

            function dismiss(){
                $timeout.cancel(tid);
                active = false;

                $timeout(function(){
                    close();

                    if(service.messages.length) {
                        delayRemove();
                    }else {
                        inited = false;
                    }
                }, 500);
            }
        }
    ])
    .directive('frgNotifier', [
        '$rootScope',
        'Notifier',
        function($rootScope, Notifier){
            return {
                restrict: "E",
                replace: true,
                bindToController: true,
                controllerAs:'notifier',
                template: [
                    '<div tabindex="-1"  role="dialog" aria-describedby="panel-description" class="panel" ng-show="notifier.messages[0] && notifier.active()" ng-class="{ error:notifier.messages[0].error }">',
                        '<p id="panel-description">{{ notifier.messages[0].title }}</p>',
                        '<button class="clean-button"  type="button" ng-click="notifier.dismiss()">Dismiss</button>',
                    '</div>'
                ].join(''),
                link: function(scope, element, attrs) {
                    $rootScope.$on('$routeChangeStart', function(){
                        Notifier.empty();
                    });
                },
                controller: [
                    function ( ) {
                        var id = 0;
                        this.messages = Notifier.messages;
                        this.active = Notifier.active;
                        this.dismiss = Notifier.dismiss;
                    }
                ]
            }
        }
    ]);