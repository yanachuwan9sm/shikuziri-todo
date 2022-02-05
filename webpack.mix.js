const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    // .react()
    .ts("resources/ts/index.tsx", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .version();
//npm run devをしてもキャッシュが残っていて変更が反映されない場合が
//あるため .version()を追加する
