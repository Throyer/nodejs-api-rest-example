module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/models',
        '@middlewares': './src/middlewares',
        '@transformers': './src/transformers',
        '@services': './src/services',
        '@shared': './src/shared',
        '@utils': './src/utils',
        '@validators': './src/validators',
        '@errors': './src/errors',
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': false }]
  ],
}
