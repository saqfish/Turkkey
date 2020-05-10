module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@common': './src/common.js',
          '@utils': './src/utils.js',
          '@styles': './src/styles.js',
          '@package': './package.json',
        },
      },
    ],
  ],
};
