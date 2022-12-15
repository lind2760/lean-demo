const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
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
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
