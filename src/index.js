/* eslint-disable no-unused-vars */

import postcss from 'postcss'
import path from 'path'
import fs from 'fs'

import nesting from 'postcss-nesting'


const getRootAtRule = atRule => {
  return (atRule.parent && atRule.parent.type === 'atrule') ? getRootAtRule(atRule.parent) : atRule
}


const hasAtRuleInside = (rule, atRuleName) => {
  let hasAtRule = false
  rule.walkAtRules(atRuleName, () => {
    hasAtRule = true
  })
  return hasAtRule
}


export default postcss.plugin('postcss-extract', (options = {}) => {
  const instance = postcss()

  // atRules = Object where key is atRule and value is path where save file
  const atRules = options.extract

  // do nothing if no extract
  if (!atRules) return instance

  // bubble atRules
  instance.use(nesting({ bubble: Object.keys(atRules) }))

  const plugin = (css, result) => {
    Object.keys(atRules).forEach(atRuleToExract => {
      const extracted = postcss.root()
      css.walkAtRules(atRuleToExract, rule => {
        extracted.append(getRootAtRule(rule))
        rule.remove()
      })

      // clean all rules except rules inside at-rule to extract
      extracted.walkRules(rule => {
        if (rule.parent.name === atRuleToExract) return
        rule.remove()
      })

      extracted.walkAtRules(rule => {
        if (rule.name === atRuleToExract) {
          // remove at-rule to extract wrapper
          rule.replaceWith(rule.nodes)
          return
        }
        if (!hasAtRuleInside(rule, atRuleToExract)) {
          // remove at-rules without at-rule to extract
          rule.remove()
          return
        }
      })

      fs.writeFileSync(`${atRules[atRuleToExract]}`, extracted.toResult().css)
    })
  }

  return instance.use(plugin)
})
