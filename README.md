# PostCSS Extract [![Build Status][ci-img]][ci] [![codecov.io][codecov-img]][codecov]

[PostCSS] plugin to extract css inside @at-rules into separate files.

[PostCSS]:     https://github.com/postcss/postcss
[ci-img]:      https://travis-ci.org/Nitive/postcss-extract.svg
[ci]:          https://travis-ci.org/Nitive/postcss-extract
[codecov-img]: https://codecov.io/github/Nitive/postcss-extract/coverage.svg?branch=master
[codecov]:     https://codecov.io/github/Nitive/postcss-extract?branch=master

```css
.foo {
  height: 40px;
  @extract-alias {
    text-decoration: underline;
  }
}
```

styles.css
```css
.foo {
  height: 40px;
}
```

extracted.css
```css
.foo {
  text-decoration: underline;
}
```

## Usage

```js
postcss([ require('postcss-extract')({
  extract: {
    'extract-alias': path.join(__dirname, './relative/path/to/file.css')
  }
}) ])
```

See [PostCSS] docs for examples for your environment.

## [License](/LICENSE)
MIT © Maxim Samoilov
