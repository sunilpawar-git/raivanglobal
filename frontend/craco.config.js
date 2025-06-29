module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Find the rule that contains source-map-loader
      const sourceMapRule = webpackConfig.module.rules.find(
        (rule) => rule.loader && rule.loader.includes('source-map-loader')
      );

      if (sourceMapRule) {
        // Exclude @mediapipe from source map processing
        const excludes = [];
        if (sourceMapRule.exclude) {
          excludes.push(...(Array.isArray(sourceMapRule.exclude) 
            ? sourceMapRule.exclude 
            : [sourceMapRule.exclude]));
        }
        excludes.push(/@mediapipe\/.*/);
        sourceMapRule.exclude = excludes;
      }

      // Add fallback for Node.js core modules if needed
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
      };

      return webpackConfig;
    },
  },
  babel: {
    presets: ['@babel/preset-react'],
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@mediapipe/(.*)$': '<rootDir>/node_modules/@mediapipe/$1',
      },
    },
  },
};
