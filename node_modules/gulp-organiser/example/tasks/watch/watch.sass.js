const gulp = require('gulp');
const sass = require('../sass');
const organiser = require('gulp-organiser');

module.exports = organiser.register((task) => {
  gulp.task(task.name, () => gulp.watch(sass.src, [sass.name]));
});
