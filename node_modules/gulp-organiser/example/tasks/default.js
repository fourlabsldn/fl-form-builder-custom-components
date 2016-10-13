const gulp = require('gulp');
const watch = require('./watch');
const build = require('./build');
const organiser = require('gulp-organiser');

const tasks = [build, watch].map(t => t.name);

module.exports = organiser.register((task) => {
  gulp.task(task.name, tasks);
});
