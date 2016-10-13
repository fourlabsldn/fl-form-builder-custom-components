// List all available tasks

const organiser = require('gulp-organiser');
organiser.registerAll('./gulp-tasks', {
  'transpile-react': {
    src: './src/main,js',
    dest: 'dist',
    config: {
      external: ['react', 'react-dom'],
    },
  },
});
