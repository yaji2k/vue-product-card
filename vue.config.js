module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://dev.smartleo.ru',
      },
    },
  },
};