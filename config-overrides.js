const { override } = require('customize-cra');
const path = require('path');

module.exports = override(
  function(config, env) {
    // Disable source maps completely
    config.devtool = false;
    
    // Configure resolve aliases and fallbacks
    if (!config.resolve) {
      config.resolve = {};
    }
    
    // Set up aliases for face-api.js to use ES6 build
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'face-api.js': path.resolve(__dirname, 'node_modules/face-api.js/build/es6')
    };
    
    // Remove the ModuleScopePlugin to allow imports from node_modules
    const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
    config.resolve.plugins = (config.resolve.plugins || []).filter(
      plugin => !(plugin instanceof ModuleScopePlugin)
    );
    
    // Add a less restrictive ModuleScopePlugin
    config.resolve.plugins.push(
      new ModuleScopePlugin([
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules')
      ], [
        path.resolve(__dirname, 'node_modules')
      ])
    );
    
    // Ignore source map warnings for specific modules
    if (config.ignoreWarnings) {
      config.ignoreWarnings.push(/Failed to parse source map/);
    } else {
      config.ignoreWarnings = [/Failed to parse source map/];
    }
    
    // Add Node.js polyfills for browser compatibility
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    
    // Provide empty implementations of Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      os: false,
      stream: false,
      buffer: false
    };
    
    return config;
  }
);
