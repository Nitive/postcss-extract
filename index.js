/* eslint-disable no-unused-vars */

import 'babel-polyfill'
import postcss from 'postcss'
import path from 'path'
import fs from 'fs'

import nesting from 'postcss-nesting'


const getRoot = atRule => {
  return atRule.parent ? getRoot(atRule.parent) : atRule
}


export default postcss
.plugin('postcss-extract', (options = {}) => {
  const instance = postcss()

  // atRules = Object where key is atRule and value is path where save file
  const atRules = options.extract

  // do nothing if no extract
  if (!atRules) return instance

  // bubble atRules
  for (const atRule of Object.keys(atRules)) {
    instance.use(nesting({ bubble: atRule }))
  }

  const plugin = (css, result) => {
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

  return instance.use(plugin)
})
