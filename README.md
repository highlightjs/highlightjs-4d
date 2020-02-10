# highlightjs-4d

![version](https://badgen.net/npm/v/highlightjs-4d)

## Description
4d - a language grammar for highlightjs

### Static website or simple usage
 
```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" charset="UTF-8"
  src="/path/to/highlightjs-4d/dist/4d.min.js"></script>
<script type="text/javascript">
  hljs.initHighlightingOnLoad();
</script>
```

### Using directly from the UNPKG CDN

```html
<script type="text/javascript"
  src="https://unpkg.com/highlightjs-4d@1.0.0/dist/4d.min.js"></script>
```

- More info: <https://unpkg.com>

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsRobotsTxt = require('highlightjs-4d');

hljs.registerLanguage("4d", hljsRobotsTxt);
hljs.initHighlightingOnLoad();
```
