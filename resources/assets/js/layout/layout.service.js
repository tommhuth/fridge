angular
    .module('fridge')
    .factory('Layout', [
            function(){
                var offset = false;
                var menuVisible = false;

                var service =  {
                    isOffset: isOffset,
                    showMenu: showMenu,
                    setOffset: setOffset,
                    setMenu: setMenu
                };

                return service;

                /////////////////////

                function showMenu(){
                    return menuVisible;
                }

                function setMenu(state){
                    menuVisible = state;
                }

                function setOffset(value) {
                    offset = value;
                }

                function isOffset(){
                    return offset;
                }
            }
        ]
    );