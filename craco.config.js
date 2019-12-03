const CracoAlias = require("craco-alias");
const CracoAntDesignPlugin = require("craco-antd");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const path = require("path");

// Don't open the browser during development
process.env.BROWSER = "none";

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
        ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
        : [])
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/styles/antd.custom.less"
        )
      }
    },
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        aliases: {
          "@styles": "src/styles",
          "@ducks": "src/ducks",
          "@store": "src/store",
          "@components": "src/components",
          "@utils": "src/utils"
        }
      }
    }
  ]
};

/*
customizeTheme: {
    "@primary-color": "#FF33DA",
    "@link-color": "#FF33DA"
}

*/
/*
customizeThemeLessPath: path.join(
    __dirname,
    "src/styles/antd.custom.less"
)
*/
