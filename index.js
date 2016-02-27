/* eslint-disable no-unused-vars */
import 'babel-polyfill'
import postcss from 'postcss'

export default postcss.plugin('postcss-extract', (options = {}) => {
  return (css, result) => {
    Object.keys(options.extract).forEach(atRule => {
      css.walkAtRules(atRule, rule => {
        rule.remove()
      })
    })
  }
})
