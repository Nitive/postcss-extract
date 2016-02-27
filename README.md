# PostCSS Extract [![Build Status][ci-img]][ci]

[PostCSS] plugin to extract css inside @at-rules into separate files.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/Nitive/postcss-extract.svg
[ci]:      https://travis-ci.org/Nitive/postcss-extract

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-extract') ])
```

See [PostCSS] docs for examples for your environment.
