angular
    .module('fridge')
    .factory('Spinner', [
            function(){
                var service =  {
                    status: { visible: false },
                    show: show,
                    hide: hide
                };

                return service;

                /////////////////////

                function show(){
                    service.status.visible = true;
                }

                function hide(){
                    service.status.visible = false;
                }
            }
        ]
    );