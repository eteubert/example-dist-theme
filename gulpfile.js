var gulp = require('gulp');
var runSequence = require('run-sequence');
var githubConfig = require('github-config');
var dist = require('/Users/ericteubert/code/br-wordpress-gulp-dist');
// var dist = require('br-wordpress-gulp-dist');
var path = require('path');

var config = {
    themeFile: path.resolve('./style.css'),
    manifest:  path.resolve('./package.json'),
    token:     githubConfig().token,
    archive: {
        // name: 'the-theme'
    }
};

var release = dist(config);

gulp.task('release', function() {
    runSequence(
        'bump-version',
        'update-theme-file-version',
        'commit-changes',
        'push',
        // add css/js processing here if necessary
        'make-asset',
        'github-release-with-asset'
    );
});

gulp.task('bump-version', release.bumpVersion);
gulp.task('update-theme-file-version', release.updateWordPressThemeFile);
gulp.task('make-asset', release.makeReleaseAsset);
gulp.task('github-release-with-asset', release.deployReleaseAsset);
gulp.task('commit-changes', release.commitAllChanges);
gulp.task('push', release.push);
