(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{1436:function(e,n,t){"use strict";function a(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var i=t.tokenStack=[];t.code=t.code.replace(o,function(e){if("function"==typeof r&&!r(e))return e;for(var o,c=i.length;-1!==t.code.indexOf(o=n(a,c));)++c;return i[c]=e,o}),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var o=0,r=Object.keys(t.tokenStack);!function i(c){for(var u=0;u<c.length&&!(o>=r.length);u++){var p=c[u];if("string"==typeof p||p.content&&"string"==typeof p.content){var s=r[o],g=t.tokenStack[s],l="string"==typeof p?p:p.content,f=n(a,s),k=l.indexOf(f);if(k>-1){++o;var d=l.substring(0,k),m=new e.Token(a,e.tokenize(g,t.grammar),"language-"+a,g),h=l.substring(k+f.length),y=[];d&&y.push.apply(y,i([d])),y.push(m),h&&y.push.apply(y,i([h])),"string"==typeof p?c.splice.apply(c,[u,1].concat(y)):p.content=y}}else p.content&&i(p.content)}return c}(t.tokens)}}}})}(e)}e.exports=a,a.displayName="markupTemplating",a.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.f1137197044fed457cba.js.map