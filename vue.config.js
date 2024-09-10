const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  outputDir: './server/public',
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()],
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8800',
      },
    },
  },
})
