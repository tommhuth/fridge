var elixir = require('laravel-elixir');
var gulp = require('gulp');
var watch = require('gulp-watch');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.extend('copyViews', function() {
    gulp.task('copyViews', function () {
        gulp.src('resources/assets/js/*/**/*.html')
            .pipe(watch('resources/assets/js/*/**/*.html'))
            .pipe(gulp.dest('public/js/'));
    });

    this.registerWatcher('copyViews', 'resources/assets/js/*/**/*');

    return this.queueTask('copyViews');
});

elixir(function(mix) {
    mix
        .scripts(
            [
                'js/vendor/*.js',
                'js/app.js',
                'js/app.config.js',
                'js/app.routes.js',
                'js/services/*.js',
                'js/layout/*.js',
                'js/home/*.js',
                'js/checklist/*.js',
                'js/about/*.js',
                'js/item/*.js',
            ],
            'public/js/app.js', 'resources/assets'
        );

   mix
       .sass('app.scss', 'public/css/app.css')
       .version(['css/app.css', 'js/app.js']);

    mix.copy('resources/assets/sass/font', 'public/font');


    mix.copyViews();
});
