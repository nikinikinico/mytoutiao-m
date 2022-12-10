module.exports = {
  plugins: {
    // vue cli内部已配置了，所以不要重新配置
    /*  'autoprefixer': {
                         browsers: ['Android >= 4.0', 'iOS >= 8']
                     }, */
    'postcss-pxtorem': {
      // 用lib-flexible的解决方法，把一行分成十份，所以rootvalue应该设置为设计稿宽度的十分之一
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转化的css属性，*表示所有
      propList: ['*'],
      exclude: 'markdown'
    }
  }
}
