require('chai').should()
import postcss from 'postcss'
import fs from 'fs'
import path from 'path'

import plugin from '../src'


const run = (input, output, opts = {}) => {
  return postcss([plugin(opts)])
    .process(input)
    .then(result => {
      result.warnings().length.should.be.equal(0)
      result.css.should.be.equal(output)
    })
}


const getFileContentInDirectory = dir => file => {
  return fs.readFileSync(path.join(dir, file)).toString().trim()
}


const fromHere = relativePath => path.join(__dirname, relativePath)


describe('fixtures', () => {
  const fixturesDir = fromHere('fixtures')
  fs.readdirSync(fixturesDir).forEach(caseName => {
    if (caseName.indexOf('[notest]') !== -1) return

    const fixtureDir = path.join(fixturesDir, caseName)
    if (!fs.lstatSync(fixtureDir).isDirectory()) return
    const getFile = getFileContentInDirectory(fixtureDir)

    const options = {
      extract: {
        important: fromHere(`fixtures/${caseName}/extracted-actual.css`),
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
})
