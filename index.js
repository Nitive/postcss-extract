import 'babel-polyfill'
import postcss from 'postcss'

export default postcss.plugin('postcss-extract', (options = {}) => {
  // Work with options here

  return (css, result) => {
    // Transform CSS AST here
    console.log({ css, result, options })
  }
})
