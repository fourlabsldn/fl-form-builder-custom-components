const _ = require('lodash/fp');

// Returns a new object with same keys where each new value is the result
// of applying the callback function to the primary value.
// mapKeys :: Function -> Object -> Object
const mapKeys = _.curry((f, obj) => {
  const newObj = {};
  Object.keys(obj).forEach(k => {
    newObj[k] = f(k, obj[k]);
  });
  return newObj;
});

// Gets an object and returns one with a subset of keys where each value is a
// possible task object if it fits the isTask check.
// toPossibleTasks :: Object -> Object
const toPossibleTasks = _.flow(
  // get only key/value pairs where the value is an object
  _.pickBy(_.isPlainObject),
  // Add the `key` string as name property of the value
  mapKeys((key, value) => Object.assign({}, value, { name: key }))
);

// isTask :: Object -> Boolean
const isTask = obj => _.isPlainObject(obj) && (obj.src || obj.dest);

// toArray :: a -> [b]
const toArray = v => {
  if (Array.isArray(v)) {
    return v;
  }
  if (v === null || v === undefined) {
    return [];
  }
  return [v];
};

// generateConfig :: String -> Object -> Object
const generateConfig = _.curry((mainTaskName, obj) => {
  const name = mainTaskName ? `${mainTaskName}:${obj.name}` : obj.name;
  const src = toArray(obj.src).filter(_.isString);
  return Object.assign({}, obj, { name, src });
});

// createArrayOfTasks :: Object -> [Object]
const createArrayOfTasks = obj => {
  const mainTaskName = obj.name;

  if (isTask(obj)) {
    const mainTask = generateConfig(null, obj);
    return [mainTask];
  }

  const subTasks = _.flow(
    toPossibleTasks,
    _.toArray, // make object into an array of values
    _.filter(isTask),
    _.map(generateConfig(mainTaskName))
  )(obj);

  return subTasks;
};

// gather :: [Object] -> String -> [a]
const gather = (arr, prop) => arr
  .map(_.get(prop))
  .map(toArray)
  .reduce((srcs, s) => srcs.concat(s), []);

// createEmptyTask :: String -> Object;
const createEmptyTask = name => generateConfig(null, { name });

// createTask :: String -> [Object] -> Object
const createTask = _.curry((mainTaskName, tasksArr) => {
  // There must be at least one task, otherwise we create an empty one.
  const tasks = tasksArr.length > 0 ? tasksArr : [createEmptyTask(mainTaskName)];

  const src = gather(tasks, 'src');
  const dest = gather(tasks, 'dest');
  return { src, dest, tasks, name: mainTaskName };
});

// toTasks :: Object<Object> -> Object<Array>
const toTasks = _.flow(
  toPossibleTasks,
  _.mapValues(createArrayOfTasks),
  mapKeys(createTask)
);

function processPaths(paths) {
  return toTasks(paths);
}

module.exports = { processPaths, createTask };
