// List all available tasks

const organiser = require('gulp-organiser');
organiser.registerAll('./gulp-tasks', {
  'transpile-react': {
    src: './src/fl-form-builder-custom-components.js',
    dest: 'dist',
    config: {
      external: ['react', 'react-dom'],
    },
  },
  'link-dependencies': {
    dest: './examples/dependencies',
  },
});
