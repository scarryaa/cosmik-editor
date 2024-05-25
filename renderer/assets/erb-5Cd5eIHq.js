import html from './html-Eq4sA2a8.js';
import ruby from './ruby-5LGjs1Pm.js';
import './javascript-C67l1L3o.js';
import './css-DoNn9y_q.js';
import './xml-CGBdWXsr.js';
import './java-D1WhEMP8.js';
import './sql-yVRMvi0O.js';
import './c-RparLEUA.js';
import './shellscript-bBop2RGH.js';
import './lua-pd6nIbVt.js';

const lang = Object.freeze({ "displayName": "ERB", "fileTypes": ["erb", "rhtml", "html.erb"], "injections": { "text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)": { "patterns": [{ "begin": "(^\\s*)(?=<%+#(?![^%]*%>))", "beginCaptures": { "0": { "name": "punctuation.whitespace.comment.leading.erb" } }, "end": "(?!\\G)(\\s*$\\n)?", "endCaptures": { "0": { "name": "punctuation.whitespace.comment.trailing.erb" } }, "patterns": [{ "include": "#comment" }] }, { "begin": "(^\\s*)(?=<%(?![^%]*%>))", "beginCaptures": { "0": { "name": "punctuation.whitespace.embedded.leading.erb" } }, "end": "(?!\\G)(\\s*$\\n)?", "endCaptures": { "0": { "name": "punctuation.whitespace.embedded.trailing.erb" } }, "patterns": [{ "include": "#tags" }] }, { "include": "#comment" }, { "include": "#tags" }] } }, "name": "erb", "patterns": [{ "include": "text.html.basic" }], "repository": { "comment": { "patterns": [{ "begin": "<%+#", "beginCaptures": { "0": { "name": "punctuation.definition.comment.begin.erb" } }, "end": "%>", "endCaptures": { "0": { "name": "punctuation.definition.comment.end.erb" } }, "name": "comment.block.erb" }] }, "tags": { "patterns": [{ "begin": "<%+(?!>)[-=]?(?![^%]*%>)", "beginCaptures": { "0": { "name": "punctuation.section.embedded.begin.erb" } }, "contentName": "source.ruby", "end": "(-?%)>", "endCaptures": { "0": { "name": "punctuation.section.embedded.end.erb" }, "1": { "name": "source.ruby" } }, "name": "meta.embedded.block.erb", "patterns": [{ "captures": { "1": { "name": "punctuation.definition.comment.erb" } }, "match": "(#).*?(?=-?%>)", "name": "comment.line.number-sign.erb" }, { "include": "source.ruby" }] }, { "begin": "<%+(?!>)[-=]?", "beginCaptures": { "0": { "name": "punctuation.section.embedded.begin.erb" } }, "contentName": "source.ruby", "end": "(-?%)>", "endCaptures": { "0": { "name": "punctuation.section.embedded.end.erb" }, "1": { "name": "source.ruby" } }, "name": "meta.embedded.line.erb", "patterns": [{ "captures": { "1": { "name": "punctuation.definition.comment.erb" } }, "match": "(#).*?(?=-?%>)", "name": "comment.line.number-sign.erb" }, { "include": "source.ruby" }] }] } }, "scopeName": "text.html.erb", "embeddedLangs": ["html", "ruby"] });
var erb = [
  ...html,
  ...ruby,
  lang
];

export { erb as default };
