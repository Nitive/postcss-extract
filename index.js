/* eslint-disable no-unused-vars */

import 'babel-polyfill'
import postcss from 'postcss'
import path from 'path'
import fs from 'fs'


const fromHere = relativePath => {
  return path.join(__dirname, relativePath)
}


const getRoot = atRule => {
  let rule = atRule
  while (rule.parent) {
    rule = rule.parent
  }
  return rule
}


export default postcss.plugin('postcss-extract', (options = {}) => {
  return (css, result) => {
    const atRules = options.extract
    Object.keys(atRules).forEach(atRule => {
      const extracted = postcss.root()
      css.walkAtRules(atRule, rule => {
        extracted.append(getRoot(rule))
        rule.remove()
      })

      // clean all rules except rules inside our at-rule
      extracted.walkRules(rule => {
        if (rule.parent.name === atRule) return
        rule.remove()
      })

      // remove at-rule wrapper
      extracted.walkAtRules(atRule, rule => {
        rule.replaceWith(rule.nodes)
      })

      fs.writeFileSync(`${atRules[atRule]}`, extracted.toResult().css)
    })
  }
})
