angular
    .module('fridge')
    .directive('frgDropdown', [
            '$timeout',
            '$document',
            function($timeout,$document){
                var _items = [];
                var _id = 0;

                function _register(controller){
                    var iid = _id++;
                    _items.push({controller: controller, id: iid});

                    return iid;
                }

                function _closeOthers(except){
                    for(var i = 0; i< _items.length; i++){
                        if(_items[i].controller !== except) {
                            _items[i].controller.isVisible = false;
                        }
                    }
                }

                return {
                    restrict: "E",
                    template: [
                        '<div class="dropdown" ng-class="{ \'is-active\': dropdown.isVisible }">',
                            '<div class="selected"',
                                'aria-haspopup="true"',
                                'ng-click="dropdown.isVisible = !dropdown.isVisible"',
                                'tabindex="0">',
                                '<strong class="visually-hidden">{{ dropdown.description }}</strong>',
                            '   {{ dropdown.active.label }}',
                                '<span class="icon-angle-down"></span>',
                            ' </div>',

                            '<ul class="options"',
                            'ng-style="{ \'top\': dropdown.getOffset() + \'em\'}"',
                            'ng-show="dropdown.isVisible"',
                            'role="listbox"',
                            'aria-live="assertive"',
                            'aria-activedescendant="opt-{{dropdown.id}}-{{dropdown.active.value}}"   >',
                                ' <li role="option"',
                                ' id="opt-{{dropdown.id}}-{{option.value}}"',
                                ' tabindex="0"',
                                'ng-click="dropdown.setItem( option, $event )"',
                                'ng-repeat="option in dropdown.options"',
                                'ng-class="{\'is-selected\': dropdown.active === option }">',
                                '{{ option.label }}',
                                ' </li>',
                            '</ul>',
                        '</div>'
                    ].join(''),
                    replace: true,
                    bindToController: true,
                    controllerAs: 'dropdown',
                    link: function(scope, element, attr, controller){
                        /*
                            needs clean up + $destroy
                        */

                        controller.id = _register(controller);

                        $($document).on('click keydown touchstart', function(event) {
                            //close menu if click outside/enter
                            if((event.type == "click"  || event.type == "touchstart" ) || (event.type=="keydown" && event.which == 13)) {
                                scope.$apply(function () {
                                    controller.isVisible = false;
                                });
                            }
                        });

                        element.find('div, ul').on('click touchstart', function(event) {
                            event.stopPropagation();
                            scope.$apply(function(){
                                _closeOthers(controller);
                            });
                        });

                        $timeout(function(){
                            var offsetTop = $(element).offset().top;
                            var elementHeight = $(element).find('div').outerHeight() * 1.25;
                            var bottom = $(document).height() - ( offsetTop + elementHeight);

                            controller.top = Math.floor(offsetTop / elementHeight);
                            controller.bottom = Math.floor(bottom / elementHeight) ;
                        }, 0);
                    },
                    controller: function(){
                        var _this= this;
                        this.isVisible = false;
                        this.offset = 0;
                        this.active =  this.options.find(function(e){ return e.value === _this.active });

                        this.getOffset = function() {
                            return  -this.getMaxOffset() * (2.25 -.35);
                        };

                        this.getMaxOffset = function() {
                            if(_this.offset >=  _this.top)
                                return _this.top;

                            if(_this.options.length - 1 - _this.offset >= _this.bottom)
                                return _this.options.length - _this.bottom - 1;

                            return _this.offset;
                        };

                        this.setItem = function(item, $event) {
                            $event.stopPropagation();
                            $event.preventDefault();

                            _this.active = item;
                            _this.isVisible = false;
                            $timeout(function(){ _this.offset = getIndex(item);  }, 250);
                        };

                        function getIndex(item) {
                            return _this.options.findIndex(function(e) { return e === item; });
                        }
                    },
                    scope: {
                        'active': '=',
                        'options': '='
                    }
                }
            }
        ]
    );