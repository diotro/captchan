(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{1522:function(n,a,t){"use strict";function e(n){n.languages.markdown=n.languages.extend("markup",{}),n.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,greedy:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,greedy:!0,inside:{punctuation:/^[*_]|[*_]$/}},strike:{pattern:/(^|[^\\])(~~?)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,greedy:!0,inside:{punctuation:/^~~?|~~?$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),["bold","italic","strike"].forEach(function(a){["url","bold","italic","strike"].forEach(function(t){a!==t&&(n.languages.markdown[a].inside[t]=n.languages.markdown[t])})}),n.hooks.add("after-tokenize",function(n){"markdown"!==n.language&&"md"!==n.language||function n(a){if(a&&"string"!=typeof a)for(var t=0,e=a.length;t<e;t++){var i=a[t];if("code"===i.type){var o=i.content[1],r=i.content[3];if(o&&r&&"code-language"===o.type&&"code-block"===r.type&&"string"==typeof o.content){var s="language-"+o.content.trim().split(/\s+/)[0].toLowerCase();r.alias?"string"==typeof r.alias?r.alias=[r.alias,s]:r.alias.push(s):r.alias=[s]}}else n(i.content)}}(n.tokens)}),n.hooks.add("wrap",function(a){if("code-block"===a.type){for(var t="",e=0,i=a.classes.length;e<i;e++){var o=a.classes[e],r=/language-(.+)/.exec(o);if(r){t=r[1];break}}var s=n.languages[t];if(s){var l=a.content.value.replace(/&lt;/g,"<").replace(/&amp;/g,"&");a.content=n.highlight(l,s,t)}}}),n.languages.md=n.languages.markdown}n.exports=e,e.displayName="markdown",e.aliases=["md"]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markdown.5ca8eb29ba392c5a4f71.js.map