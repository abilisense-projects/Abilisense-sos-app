module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      }],
      // [
      //   "i18next-extract",
      //   {
      //     locales: ["en"],
      //     outputPath: "locales/{{locale}}/{{ns}}.json",
      //     keyAsDefaultValue: ["en"],
      //     keySeparator: null,
      //     nsSeparator: null,
      //   },
      // ],
      // ...other plugins here
    ],
  };
};
