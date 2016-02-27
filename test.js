require('chai').should()
import postcss from 'postcss'
import fs from 'fs'
import path from 'path'

import plugin from './'


function run(done, input, output, opts = {}) {
  return postcss([plugin(opts)]).process(input)
    .then(result => {
      result.warnings().length.should.be.equal(0)
      result.css.should.be.equal(output)
      done()
    })
    .catch(done)
}

const options = {
  extract: {
    important: 'extracted.css',
  },
}

const fixturesDir = path.join(__dirname, 'fixtures')
fs.readdirSync(fixturesDir).forEach(caseName => {
  if (caseName.includes('[notest]')) return

  it(caseName, done => {
    const fixtureDir = path.join(fixturesDir, caseName)
    const input = fs.readFileSync(path.join(fixtureDir, 'input.css')).toString()
    const output = fs.readFileSync(path.join(fixtureDir, 'output.css')).toString()
    run(done, input, output, options)
  })
})
