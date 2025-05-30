module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@react-native-firebase/app': '@react-native-firebase/app/lib/index',
            '@react-native-firebase/auth': '@react-native-firebase/auth/lib/index',
            '@react-native-firebase/firestore': '@react-native-firebase/firestore/lib/index'
          }
        }
      ]
    ]
  };
}; 