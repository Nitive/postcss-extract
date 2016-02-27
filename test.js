import 'babel-register'
import postcss from 'postcss'
import test from 'ava'
import fs from 'fs'
import path from 'path'

import plugin from './'


function run(t, input, output, opts = {}) {
  return postcss([plugin(opts)]).process(input)
    .then(result => {
      t.same(result.css, output)
      t.same(result.warnings().length, 0)
    })
}

const fixturesDir = path.join(__dirname, 'fixtures')
fs.readdirSync(fixturesDir).forEach(caseName => {
  if (caseName.includes('[notest]')) return

  test(caseName, t => {
    const fixtureDir = path.join(fixturesDir, caseName)

    const actual = fs.readFileSync(path.join(fixtureDir, 'actual.css')).toString()
    const expected = fs.readFileSync(path.join(fixtureDir, 'expected.css')).toString()

    return run(t, actual, expected, {})
  })
})
