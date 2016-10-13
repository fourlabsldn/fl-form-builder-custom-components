## API
### Gulpfile functions
``` javascript
/**
 * Registers the directory where gulp task registrations are
 * and provides the paths to be used in each task.
 * @param {String} tasksDir
 * @param {Object} paths
 * @return {Object} a task config object
 */
registerAll(tasksDir, paths)
```

### Tasks functions
``` javascript
/**
 * Registers a gulp task. To be called in task file
 * @param {Function} registrationFunc - receives two objects as arguments: (task, allTaks)
 */
register(registrationFunc)


/**
 * Tasks like `watch` or `build` may want to require other tasks.
 * Loads all tasks from a path into an array of task configurations
 * @param {String} folderPath
 * @return {Array<Object>} task configs
 */
loadFrom(folderPath)
```

## Example
### Gulpfile
``` javascript
// List all available tasks
const organiser = require('gulp-organiser');
// Paths are relative to project root.
const rootSrc = './example/example-resources/src';
const rootDest = './example/example-resources/dest';
// Tasks folder is relative to gulpfile.
const tasksFolder = './tasks';

organiser.registerAll(tasksFolder, {
  // Each object is key is a task.
  // Each task must have either an  'src' or a 'dest' key
  'sass': {
    // Tasks may have subtasks. Just add keys with an 'src' or 'dest' property.
    // If a task has subtasks, it is executed by 'gulp maintask:subtask'
    // or just 'gulp maintask', which executes all subtasks.
    'main': {
      'src': rootSrc + '/sass/main.scss',
      'dest': rootDest + '/sass',
    },
    'secondary': {
      'src': rootSrc + '/sass/secondary.scss',
      'dest': rootDest + '/sass',
    }
	},
	'copy-static': {
		'src':  rootSrc + '/static/**',
		'dest': rootDest + '/static/',

    // Tasks may have arbitrary keys which will be passed to the task
		'map': {
			 '/example-resources/src/js/**.json': rootDest + 'js'
		}
	},
  // Tasks may ommit either 'src' or 'dest'.
	'link-dependencies': {
		'dest': rootDest + '/dependencies',
	}
});
```

### Task
#### SASS
This is how a sass task could look like:

``` javascript
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const organiser = require('gulp-organiser');

// Register the task. The task name is equal to its file name.
// You must export the call to the `register` function just like here.
module.exports = organiser.register((task) => {
  gulp.task(task.name, () => {
    gulp.src(task.src) // The content of the 'src' key was set in the Gulpfile.
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['last 15 versions'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(task.dest)); // And so was the content of 'dest'
  });
});
```
#### Watch
You can use `loadFrom` to include your watch tasks, so that you don't have
to name them, and thus can just add and remove files without hastle.

``` javascript
const gulp = require('gulp');
const organiser = require('gulp-organiser');

module.exports = organiser.register((task) => {
  const watchTasks = organiser.loadFrom(`./${task.name}`);
  const watchTaskNames = watchTasks.map(t => t.name);
  gulp.task(task.name, watchTaskNames);
});
```

## License
The MIT License (MIT)

Copyright (c) 2016 Marcelo Lazaroni - Lazamar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
