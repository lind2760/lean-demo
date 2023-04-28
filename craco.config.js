const path = require("path");
const CracoLessPlugin = require("craco-less");
const WebpackBar = require("webpackbar"); // 进度条

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    plugins: [new WebpackBar({ profile: true })],
  },
  presets: ["react-app"],
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
