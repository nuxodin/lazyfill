// https://github.com/zloirock/core-js/blob/d7409d106383f252ab25215a287d9b8160785918/packages/core-js/modules/es.string.replace-all.js#L23
if (!''.replaceAll) {
    !function(){

        var stringIndexOf = function (string, searchValue, fromIndex) {
            if (fromIndex > string.length) return -1;
            if (searchValue === '') return fromIndex;
            return string.indexOf(searchValue, fromIndex);
        };

        var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
        var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
        function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
          var tailPos = position + matched.length;
          var m = captures.length;
          var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
          if (namedCaptures !== undefined) {
            namedCaptures = toObject(namedCaptures);
            symbols = SUBSTITUTION_SYMBOLS;
          }
          return ''.replace.call(replacement, symbols, function (match, ch) {
            var capture;
            switch (ch.charAt(0)) {
              case '$': return '$';
              case '&': return matched;
              case '`': return str.slice(0, position);
              case "'": return str.slice(tailPos);
              case '<':
                capture = namedCaptures[ch.slice(1, -1)];
                break;
              default: // \d\d?
                var n = +ch;
                if (n === 0) return match;
                if (n > m) {
                  var f = Math.floor(n / 10);
                  if (f === 0) return match;
                  if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                  return match;
                }
                capture = captures[n - 1];
            }
            return capture === undefined ? '' : capture;
          });
        };

        Object.defineProperty(String.prototype, 'replaceAll', {
            configurable: true,
            writable: true,
            value: function replaceAll(searchValue, replaceValue) {
                if (this == null) throw TypeError("Can't call method on " + this);
                var O = this;
                var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
                var position = 0;
                var endOfLastMatch = 0;
                var result = '';
                if (searchValue != null) {
                    IS_REG_EXP = searchValue instanceof RegExp;
                    if (IS_REG_EXP) {
                        flags = String(searchValue.flags);
                        if (!~flags.indexOf('g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
                    }
                    replacer = window.Symbol && searchValue[Symbol.replace];
                    var IS_PURE = true; // ??
                    if (replacer !== undefined) {
                        return replacer.call(searchValue, O, replaceValue);
                    } else if (IS_PURE && IS_REG_EXP) {
                        return String(O).replace(searchValue, replaceValue);
                    }
                }
                string = String(O);
                searchString = String(searchValue);
                functionalReplace = typeof replaceValue === 'function';
                if (!functionalReplace) replaceValue = String(replaceValue);
                searchLength = searchString.length;
                advanceBy = Math.max(1, searchLength);
                position = stringIndexOf(string, searchString, 0);
                while (position !== -1) {
                    if (functionalReplace) {
                        replacement = String(replaceValue(searchString, position, string));
                    } else {
                        replacement = GetSubstitution(searchString, string, position, [], undefined, replaceValue);
                    }
                    result += string.slice(endOfLastMatch, position) + replacement;
                    endOfLastMatch = position + searchLength;
                    position = stringIndexOf(string, searchString, position + advanceBy);
                }
                if (endOfLastMatch < string.length) {
                    result += string.slice(endOfLastMatch);
                }
                return result;
            }
        });



    }();

}
