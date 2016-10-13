require('../index.js'); // Just ignore this line.


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
