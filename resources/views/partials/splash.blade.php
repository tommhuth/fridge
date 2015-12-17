<div class="splash" frg-splash>
    <div class="icon" ng-show="!splash.error.hasError">
        <span class="icon-repeat"></span>
    </div>
    <div class="icon" ng-if="splash.error.hasError" ng-cloak>
        <span class="icon-cross" ng-if="splash.error.hasError"></span>
    </div>

    <p class="visually-hidden">Loading the fridge</p>
    <p class="error-message" ng-class="{ on: splash.error.hasError }"><strong>Ooops!</strong> Something went horribly wrong.</p>
</div>