var gulp = require('gulp');
var runSequence = require('run-sequence');
var githubConfig = require('github-config');
var dist = require('br-wordpress-gulp-dist');
var path = require('path');

var config = {
    themeFile: path.resolve('./style.css'),
    manifest:  path.resolve('./package.json'),
    token:     githubConfig().token
};

gulp.task('release', function() {
    runSequence(
        'bump-version',
        'update-theme-file-version',
        'commit-changes',
        'push',
        // add css/js processing here if necessary
        'make-asset',
        'deploy-asset'
    );
});

gulp.task('bump-version', dist.bumpVersion);
gulp.task('update-theme-file-version', function() {
    return dist.updateWordPressThemeFile(config);
});
gulp.task('make-asset', dist.makeReleaseAsset);
gulp.task('deploy-asset', function() {
    return dist.deployReleaseAsset(config);
});
gulp.task('commit-changes', dist.commitAllChanges);
gulp.task('push', dist.push);
