// eslint-disable-next-line no-undef
module.exports = {
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        // 拆了 ant design 和 react-dom 两个包，提高性能
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'react-dom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}
