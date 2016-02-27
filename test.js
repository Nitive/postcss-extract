require('chai').should()
import postcss from 'postcss'
import fs from 'fs'
import path from 'path'

import nesting from 'postcss-nesting'
import plugin from './'


const run = (done, input, output, opts = {}) => {
  return postcss([nesting({ bubble: 'important' }), plugin(opts)])
    .process(input)
    .then(result => {
      result.warnings().length.should.be.equal(0)
      result.css.should.be.equal(output)
      done()
    })
    .catch(done)
}


const getFileContent = (dir, file) => {
  return fs.readFileSync(path.join(dir, file)).toString().trim()
}


const fixturesDir = path.join(__dirname, 'fixtures')
fs.readdirSync(fixturesDir).forEach(caseName => {
  if (caseName.includes('[notest]')) return

  const options = {
    extract: {
      important: `fixtures/${caseName}/extracted-actual.css`,
    },
  }

  const fixtureDir = path.join(fixturesDir, caseName)
  if (!fs.lstatSync(fixtureDir).isDirectory()) return
  it(caseName, done => {
    const input = getFileContent(fixtureDir, 'input.css')
    const output = getFileContent(fixtureDir, 'output.css')
    const extracted = getFileContent(fixtureDir, 'extracted.css')
    const extractedActual = getFileContent(fixtureDir, 'extracted-actual.css')
    extracted.should.be.equal(extractedActual)
    run(done, input, output, options)
  })
})
