const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Disable source maps completely
      webpackConfig.devtool = false;
      
      // Configure resolve aliases for face-api.js
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'face-api.js': path.resolve(__dirname, 'node_modules/face-api.js/build/es6')
      };
      
      // Remove ModuleScopePlugin to allow imports from node_modules
      const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        plugin => !(plugin instanceof ModuleScopePlugin)
      );
      
      // Add Node.js polyfills for browser compatibility
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        os: false,
        stream: false,
        buffer: false
      };
      
      // Ignore source map warnings
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        /Failed to parse source map/
      ];
      
      return webpackConfig;
    }
  }
};
