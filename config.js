SystemJS.config({
  baseURL: 'https://unpkg.com/',
  defaultExtension: true,
  packages: {
    '.': {
      main: './app.js',
      defaultExtension: 'js'
    }
  },
  meta: {
    '*.js': {
      'babelOptions': {
        react: true
      }
    }
  },
  map: {
    'plugin-babel': 'systemjs-plugin-babel@latest/plugin-babel.js',
    'systemjs-babel-build': 'systemjs-plugin-babel@latest/systemjs-babel-browser.js',
    'react': 'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
    'react-dom': 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
    'react-router-dom': 'https://unpkg.com/react-router-dom@6/umd/react-router-dom.production.min.js'
  },
  transpiler: 'plugin-babel'
});

SystemJS.import('./app').catch(console.error.bind(console));