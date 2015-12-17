<!DOCTYPE html >
<html lang="en">
    <head>
        <title>Fridge</title>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/df392b0b-c023-4472-9c52-822294458377.css"/>
        <link rel="stylesheet" href="<?php echo elixir('css/app.css') ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="X-API-KEY" content="{{ $key }}" />
        <base href="/">
    </head>
    <body ng-app="fridge" frg-layout tabindex="-1">
        <a href="#main" class="skip-to-content" ng-show="!layout.showMenu() && !layout.isOffset()">Skip to content</a>

        @include('partials.splash')

        <frg-nav></frg-nav>

        <main id="main" ng-show="!layout.showMenu()" >
            <article ng-view></article>
        </main>

        <frg-notifier></frg-notifier>

        <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="{{ elixir('js/app.js') }}"></script>
    </body>
</html>
