const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  outputDir: './server/public',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8800',
      },
    },
  },
})
