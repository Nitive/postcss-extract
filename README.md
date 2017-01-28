# PostCSS Extract [![Build Status][ci-img]][ci] [![codecov.io][codecov-img]][codecov]

[![Greenkeeper badge](https://badges.greenkeeper.io/Nitive/postcss-extract.svg)](https://greenkeeper.io/)

[PostCSS] plugin to extract css inside @at-rules into separate files.

[PostCSS]:     https://github.com/postcss/postcss
[ci-img]:      https://travis-ci.org/Nitive/postcss-extract.svg
[ci]:          https://travis-ci.org/Nitive/postcss-extract
[codecov-img]: https://codecov.io/github/Nitive/postcss-extract/coverage.svg?branch=master
[codecov]:     https://codecov.io/github/Nitive/postcss-extract?branch=master

```css
.foo {
  @critical {
    height: 40px;
  }
  text-decoration: underline;
}

@critical {
  .bar {
    background-color: tomato;
  }
}
```

styles.css
```css
.foo {
  text-decoration: underline;
}
```

extracted.css
```css
.foo {
  height: 40px;
}
.bar {
  background-color: tomato;
}
```

## Usage

```js
postcss([
  require('postcss-extract')({
    extract: {
      // keys are @at-rules, values are files to extract @at-rules content
      critical: path.join(__dirname, './relative/path/to/file.css')
    }
  })
])
```

See [PostCSS] docs for examples for your environment.

## [License](/LICENSE)
MIT © [Maxim Samoilov](http://twitter.com/_nitive)
