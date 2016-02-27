/* eslint-disable no-unused-vars */
import 'babel-polyfill'
import postcss from 'postcss'

export default postcss.plugin('postcss-extract', (options = {}) => {
  return (css, result) => {
    css.walkAtRules('important', rule => {
      rule.remove()
    })
  }
})
