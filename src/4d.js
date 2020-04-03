/*
Language: 4D
Author: Guillaume Kotulski <guillaume.kotulski@4d.com>
Website: https://www.4d.com
*/

module.exports = function(hljs) {

  var KEYWORDS = {
    className: 'keyword',
    begin: '[\\s]*\\b(Begin SQL|End SQL|For each|End for each|If|Else|End if|Case of|End case|For|End for|Use|End use|While|End while|Repeat|Until|Class extends|Class constructor|Function)\\b'
  };
  
  var LITERALS = {
    className: 'literal',
    begin: '\\b(False|True|Null|Undefined|This)',
  };

  var FUNCTIONS = {
    className: 'function',
    begin: '\\w[\\w ]+\\w(?=\\()',
  }

  var DATE = {
    className: 'literal',
    begin: '![0-9]+',
    end: '!'
  }

  var HOUR = {
    className: 'literal',
    begin: '\\?[0-9]+',
    end: '\\?'
  }

  var NUMBERS = {
    className: 'number',
    begin: '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b[\\d]+(\\.[\\d]*)?|\\.[\\d]+)([eE][-+]?[\\d]+)?)(?!D)'
  };

  var VARIABLE = {
    className: 'variable',
    begin: '[\\w]+',
    end: '(?!\\w)|$'
  }

  var LOCAL_VARIABLE = {
    className: 'variable',
    begin: '\\$',
    end: VARIABLE.end
  }

  var INTERPROCESS_VARIABLE = {
    className: 'variable',
    begin: '<>',
    end: VARIABLE.end
  }

  var STRINGS = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    relevance: 0
  }

  var VARIABLE_ARRAY = {
    className: 'variable',
    begin: '\\[{2}',
    end: '\\]{2}'
  }

  var INLINE_COMMENT = hljs.COMMENT('//', '[^\\\\]$');
  var INLINE_COMMENT_OLD = hljs.COMMENT('`', '[^\\\\]$');

  return {
    aliases: [ '4d' ],
    keyword:KEYWORDS,
    contains: [
      INLINE_COMMENT, // single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // comment blocks
      INLINE_COMMENT_OLD,
      {
        begin: 'Begin SQL', end: 'End SQL',
        subLanguage: 'sql',
        relevance: 0
      },

      DATE,
      HOUR,
      KEYWORDS,
      INTERPROCESS_VARIABLE,
      LOCAL_VARIABLE,
      VARIABLE_ARRAY,
      STRINGS,
      NUMBERS,
      LITERALS,
      FUNCTIONS,
    ]
  };
}