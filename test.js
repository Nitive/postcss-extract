require('chai').should()
import postcss from 'postcss'
import fs from 'fs'
import path from 'path'

import nesting from 'postcss-nesting'
import plugin from './'


const run = (input, output, opts = {}) => {
  return postcss([nesting({ bubble: 'important' }), plugin(opts)])
    .process(input)
    .then(result => {
      result.warnings().length.should.be.equal(0)
      result.css.should.be.equal(output)
    })
}


const getFileInDirectoryContent = dir => file => {
  return fs.readFileSync(path.join(dir, file)).toString().trim()
}


const fixturesDir = path.join(__dirname, 'fixtures')
fs.readdirSync(fixturesDir).forEach(caseName => {
  if (caseName.includes('[notest]')) return

  const fixtureDir = path.join(fixturesDir, caseName)
  if (!fs.lstatSync(fixtureDir).isDirectory()) return
  const getFile = getFileInDirectoryContent(fixtureDir)

  const options = {
    extract: {
      important: `fixtures/${caseName}/extracted-actual.css`,
    },
  }

  it(caseName, () => {
    const input = getFile('input.css')
    const output = getFile('output.css')
    return run(input, output, options).then(() => {
      const extracted = getFile('extracted.css')
      const extractedActual = getFile('extracted-actual.css')
      extracted.should.be.equal(extractedActual)
    })
  })
})
