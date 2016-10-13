const gulp = require('gulp');
const depLinker = require('dep-linker');

const organiser = require('gulp-organiser');

module.exports = organiser.register((task) => {
  gulp.task(task.name, () => depLinker.linkDependenciesTo(task.dest));
});
