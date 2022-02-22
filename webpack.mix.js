const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('./tailwind.config.js') ],
    })
    .react('resources/js/common/SetClearLamp.js', 'public/js/common')
    .react('resources/js/common/SpecifyAbility.js', 'public/js/common')
    .react('resources/js/common/ChartDetail.js', 'public/js/common')
    .react('resources/js/common/chartDetail/BarometerView.js', 'public/js/common/chartDetail')
    .react('resources/js/common/chartDetail/ClearHistory.js', 'public/js/common/chartDetail')
    .react('resources/js/header/index.js', 'public/js/header')
    .react('resources/js/scores/index.js', 'public/js/scores')
    .react('resources/js/scores/Chart.js', 'public/js/scores')
    .react('resources/js/scores/ChartListHeader.js', 'public/js/scores')
    .react('resources/js/scores/ChartList.js', 'public/js/scores')
    .react('resources/js/scores/ChartListController.js', 'public/js/scores')
    .react('resources/js/statistics/index.js', 'public/js/statistics')
    .react('resources/js/statistics/Widgets.js', 'public/js/statistics')
    .react('resources/js/statistics/widgets/ClearLampDetails.js', 'public/js/statistics/widgets')
    .react('resources/js/statistics/widgets/ClearResultsChanges.js', 'public/js/statistics/widgets')
    .react('resources/js/statistics/widgets/CpiResultsDetails.js', 'public/js/statistics/widgets')
    .react('resources/js/statistics/widgets/RecommendCharts.js', 'public/js/statistics/widgets')
    .react('resources/js/statistics/widgets/DanILamps.js', 'public/js/statistics/widgets');

