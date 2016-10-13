const requireDir = require('require-dir-all');
const { processPaths, createTask } = require('./taskHandling');
const _ = require('lodash/fp');
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

const requireGulpfile = () => {
  const projectRoot = process.cwd();
  const gulpFilename = fs.readdirSync(projectRoot).find(f => /^gulpfile.js$/i.test(f));
  return require(path.join(projectRoot, gulpFilename)); // eslint-disable-line global-require
};

const tasksPaths = (function () {
  let paths = null;
  let pathRequestCount = 0;
  return {
    set: (p) => (paths = processPaths(p)),
    get: () => {
      if (paths) { return paths; }
      if (pathRequestCount > 0) {
        throw new Error('Path not set in Gulpfile.');
      }
      requireGulpfile(); // Gulpfile should call a function to set the paths
      pathRequestCount++;
      if (!paths) {
        throw new Error('Path not set in Gulpfile.');
      } else {
        return paths;
      }
    },
  };
}());

// Impure
// File to first require this script
const primaryInvokingFilePath = () => {
  return module.parent ? module.parent.filename : null;
};

// Impure
// File that invoked this script right now
const invokingFilePath = () => {
  const originalFunc = Error.prepareStackTrace;
  let filename;
  try {
    const err = new Error();

    Error.prepareStackTrace = (e, stack) => stack;
    const currentFile = err.stack[0].getFileName();

    let callerFile;
    let needle = 0;
    while (err.stack[needle]) {
      callerFile = err.stack[needle].getFileName();
      if (callerFile !== currentFile) {
        filename = callerFile;
        break;
      }
      needle++;
    }
  } catch (err) {
    throw new Error('Error getting task file name');
  }

  Error.prepareStackTrace = originalFunc;
  return filename;
};

const getFileName = (filePath) => path.parse(filePath).name;

const isFirstInvocation = () => invokingFilePath() === primaryInvokingFilePath();

// Load all npm modules of a folder
const requireFolder = (folder) => {
  const options = { recursive: true };
  return requireDir(folder, options);
};

function registerAll(tasksFolder, paths) {
  tasksPaths.set(paths);

  if (isFirstInvocation()) {
    const p = invokingFilePath();
    const invokingDir = path.parse(p).dir;
    const tasksFolderAbsolute = path.join(invokingDir, tasksFolder);
    // load tasks
    requireFolder(tasksFolderAbsolute);
  }
}


// Register task --------------------------------------------------------------
// registerTask :: Object -> function -> void
const registerTask = _.curry((paths, func, conf) => {
  conf && func(conf, paths); // eslint-disable-line no-unused-expressions, max-len
});

// Whether the array contains subtasks or just one main task.
// isJustMaintask :: String -> [Object] -> Boolean
const isJustMainTask = _.curry((mainTaskName, tasks) => {
  return tasks.length === 1 && tasks[0].name === mainTaskName;
});

// Registers the function for one main task and its subTasks
// Returns an object describing the function
// register :: Function -> Object
function register(registrationFunc) {
  const paths = tasksPaths.get();
  const taskName = getFileName(invokingFilePath());

  // We do allow empty tasks
  const task = paths[taskName] || createTask(taskName, []);

  if (!isJustMainTask(taskName, task.tasks)) {
    gulp.task(taskName, task.tasks.map(_.get('name')));
  }

  // Put tasks in an array
  const allTasks = _.values(paths);
  task.tasks.map(registerTask(allTasks, registrationFunc));
  return task;
}

// -----------------------------------------------------------------------------

const getDirectory = p => path.parse(p).dir;

const requireFolderRelativeToInvokingFile = folder => {
  const p = invokingFilePath();
  const invokingDir = getDirectory(p);
  const tasksDirAbsolute = path.join(invokingDir, folder);
  // load tasks
  return requireFolder(tasksDirAbsolute);
};

function loadFrom(folderPath) {
  const tasksObj = requireFolderRelativeToInvokingFile(folderPath);
  const tasksArray = _.values(tasksObj);
  return tasksArray;
}

module.exports = { registerAll, register, loadFrom };
