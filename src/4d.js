/*
Language: 4D
Author: Guillaume Kotulski <guillaume.kotulski@4d.com>
Website: https://www.4d.com
*/

module.exports = function (hljs) {
  //Does not support unicode characters (should be replaced by \p{L} when possible)

  const regex = hljs.regex;

  const KEYWORDS = ["Begin SQL", "End SQL", "For each", "End for each", 
  "If", "Else", "End if", "Case of", "End case", "For", "End", "if",
  "End for", "Use", "End use", "While", 
  "End while", "Repeat", "Until", "Class extends", 
  "Class constructor", "Function", "var", 
  "property", "return", "break", "continue", "DECLARE"]

  var keywords = {
    keyword: KEYWORDS,
    $pattern:/(\w+)/,
    relevance:10,
    literal: ["False", "True", "Null", "Undefined", "This", "Variant", "Integer", "Picture", "Text", "Collection", "Object", "Pointer", "Real", "4D", "cs"]
  }

  var functions = {
    scope:'property.function',
    begin: '\\.[a-zA-Z0-9]+(?=\\()',
  }

  var commands = {
    scope:'function',
    begin: '\\b(?!('+KEYWORDS.join('|')+')\\b)((\\p{L}+\\s?)+)(?=\\()',
  }

  const OPERATORS = [/:=/, /\|\|/, /&&/];

  var operator = {
    scope:'operator',
    match: regex.either(...OPERATORS)
  }

  var members = {
    scope:'property',
    begin: '\\.[a-zA-Z0-9]+',
  }

  var dates = {
    scope: 'literal',
    begin: '![0-9]+',
    end: '!'
  }

  var hours = {
    scope: 'literal',
    begin: '\\?[0-9]+',
    end: '\\?'
  }
  var numbers = {
    scope: 'number',
    begin: '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b[\\d]+(\\.[\\d]*)?|\\.[\\d]+)([eE][-+]?[\\d]+)?)(?!D)'
  };
  var variables = {
    scope: 'variable.global',
    match: regex.either(/\p{L}+/u)
  }

  var localVariables = {
    scope: 'variable.local',
    match: regex.either(/\$\p{L}+/u)
  }

  var interprocessVariables = {
    className: 'variable.interprocess',
    begin: '<>' + variables.begin,
  }

  var strings = {
    scope: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  }

  var variablesArray = {
    className: 'variable.array',
    begin: '\\[{2}',
    end: '\\]{2}'
  }

  var INLINE_COMMENT = hljs.COMMENT('//', '[^\\\\]$');
  var INLINE_COMMENT_OLD = hljs.COMMENT('`', '[^\\\\]$');

  return {
    unicodeRegex: true,
    aliases: ['4d'],
    keywords: keywords,
    contains: [
      INLINE_COMMENT, // single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // comment blocks
      INLINE_COMMENT_OLD,
      {
        begin: 'Begin SQL', end: 'End SQL',
        subLanguage: 'sql',
        relevance: 0
      },
      commands,
      operator,
      dates,
      hours,
      interprocessVariables,
      localVariables,
      variablesArray,
      functions,
      members,
      strings,
      numbers,
    ]
  };
}