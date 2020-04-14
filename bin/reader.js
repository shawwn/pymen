var delimiters = {
  "(": true,
  ")": true,
  ";": true,
  ",": true,
  "\r": true,
  "\n": true
};
var closing_delimiters = {")": true};
var whitespace = {
  " ": true,
  "\t": true,
  "\r": true,
  "\n": true
};
var stream = function (str, more) {
  return {
    pos: 0,
    string: str,
    len: _35(str),
    more: more
  };
};
var peek_char = function (s) {
  var ____id = s;
  var __pos = has(____id, "pos");
  var __len = has(____id, "len");
  var __string = has(____id, "string");
  if (__pos < __len) {
    return char(__string, __pos);
  }
};
var read_char = function (s) {
  var __c = peek_char(s);
  if (__c) {
    s.pos = s.pos + 1;
    return __c;
  }
};
var skip_non_code = function (s) {
  while (true) {
    var __c1 = peek_char(s);
    if (nil63(__c1)) {
      break;
    } else {
      if (has63(whitespace, __c1)) {
        read_char(s);
      } else {
        if (__c1 === ";") {
          while (__c1 && !( __c1 === "\n")) {
            __c1 = read_char(s);
          }
          skip_non_code(s);
        } else {
          break;
        }
      }
    }
  }
};
var read_table = {};
var eof = {};
var read_1 = function (s) {
  skip_non_code(s);
  var __c2 = peek_char(s);
  if (is63(__c2)) {
    return (has(read_table, __c2) || has(read_table, ""))(s);
  } else {
    return eof;
  }
};
var read = function (s) {
  var __form = read_1(s);
  if ("," === peek_char(s)) {
    var __r6 = [",", __form];
    while (true) {
      read_char(s);
      __form = read_1(s);
      if (__form === eof) {
        return expected(s, "tuple");
      }
      add(__r6, __form);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r6;
  } else {
    return __form;
  }
};
var read_all = function (s) {
  var __l = [];
  while (true) {
    var __form1 = read(s);
    if (__form1 === eof) {
      break;
    }
    add(__l, __form1);
  }
  return __l;
};
read_string = function (str, more) {
  var __x1 = read(stream(str, more));
  if (!( __x1 === eof)) {
    return __x1;
  }
};
var key63 = function (atom) {
  return string63(atom) && (_35(atom) > 1 && char(atom, edge(atom)) === ":");
};
var flag63 = function (atom) {
  return string63(atom) && (_35(atom) > 1 && char(atom, 0) === ":");
};
var expected = function (s, c) {
  if (is63(s.more)) {
    return s.more;
  } else {
    throw new Error("Expected " + (c + (" at " + s.pos)));
  }
};
var wrap = function (s, x) {
  var __y = read(s);
  if (__y === s.more) {
    return __y;
  } else {
    return [x, __y];
  }
};
var hex_prefix63 = function (str) {
  var __e = undefined;
  if (code(str, 0) === 45) {
    __e = 1;
  } else {
    __e = 0;
  }
  var __i = __e;
  var __id1 = code(str, __i) === 48;
  var __e1 = undefined;
  if (__id1) {
    __i = __i + 1;
    var __n = code(str, __i);
    __e1 = __n === 120 || __n === 88;
  } else {
    __e1 = __id1;
  }
  return __e1;
};
var maybe_number = function (str) {
  if (hex_prefix63(str)) {
    return parseInt(str, 16);
  } else {
    if (number_code63(code(str, edge(str)))) {
      return number(str);
    }
  }
};
var real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
read_table[""] = function (s) {
  var __str = "";
  while (true) {
    var __c3 = peek_char(s);
    if (__c3 && (! has63(whitespace, __c3) && ! has63(delimiters, __c3))) {
      __str = __str + read_char(s);
    } else {
      break;
    }
  }
  if (__str === "true") {
    return true;
  } else {
    if (__str === "false") {
      return false;
    } else {
      var __n1 = maybe_number(__str);
      if (real63(__n1)) {
        return __n1;
      } else {
        return __str;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r18 = undefined;
  var __l1 = [];
  while (nil63(__r18)) {
    skip_non_code(s);
    var __c4 = peek_char(s);
    if (__c4 === ")") {
      read_char(s);
      __r18 = __l1;
    } else {
      if (nil63(__c4)) {
        __r18 = expected(s, ")");
      } else {
        var __x3 = read(s);
        if (key63(__x3)) {
          var __k = clip(__x3, 0, edge(__x3));
          var __v = read(s);
          __l1 = object(__l1);
          __l1[__k] = __v;
        } else {
          if (flag63(__x3)) {
            __l1 = object(__l1);
            __l1[clip(__x3, 1)] = true;
          } else {
            add(__l1, __x3);
          }
        }
      }
    }
  }
  return __r18;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
var read_matching = function (opener, closer, s) {
  var __r21 = undefined;
  var __pos1 = s.pos;
  var __str1 = "";
  var __i1 = 0;
  while (__i1 < _35(opener)) {
    __str1 = __str1 + (read_char(s) || "");
    __i1 = __i1 + 1;
  }
  if (__str1 === opener) {
    while (nil63(__r21)) {
      if (clip(s.string, s.pos, s.pos + _35(closer)) === closer) {
        var __i2 = 0;
        while (__i2 < _35(closer)) {
          __str1 = __str1 + read_char(s);
          __i2 = __i2 + 1;
        }
        __r21 = __str1;
      } else {
        if (nil63(peek_char(s))) {
          __r21 = expected(s, closer);
        } else {
          __str1 = __str1 + read_char(s);
          if (peek_char(s) === "\\") {
            __str1 = __str1 + read_char(s);
          }
        }
      }
    }
  }
  return __r21;
};
read_table["\""] = function (s) {
  if (string_starts63(s.string, "\"\"\"", s.pos)) {
    return read_matching("\"\"\"", "\"\"\"", s);
  } else {
    var __i3 = s.pos;
    var __j = search(s.string, "\"", __i3 + 1);
    var __b = either(search(s.string, "\\", __i3 + 1), __j);
    if (is63(__j) && (__j < s.len && __b >= __j)) {
      s.pos = __j + 1;
      return clip(s.string, __i3, __j + 1);
    } else {
      var __r23 = undefined;
      read_char(s);
      while (nil63(__r23)) {
        var __c5 = peek_char(s);
        if (__c5 === "\"") {
          read_char(s);
          __r23 = clip(s.string, __i3, s.pos);
        } else {
          if (nil63(__c5)) {
            __r23 = expected(s, "\"");
          } else {
            if (__c5 === "\\") {
              read_char(s);
            }
            read_char(s);
          }
        }
      }
      return __r23;
    }
  }
};
read_table["|"] = function (s) {
  var __i4 = s.pos;
  var __j1 = search(s.string, "|", __i4 + 1);
  if (is63(__j1) && __j1 < s.len) {
    s.pos = __j1 + 1;
    return clip(s.string, __i4, __j1 + 1);
  } else {
    return expected(s, "|");
  }
};
read_table["'"] = function (s) {
  read_char(s);
  return wrap(s, "quote");
};
read_table["`"] = function (s) {
  read_char(s);
  return wrap(s, "quasiquote");
};
read_table[","] = function (s) {
  read_char(s);
  var __c6 = peek_char(s);
  if (nil63(__c6) || (has63(whitespace, __c6) || has63(closing_delimiters, __c6))) {
    return ",";
  } else {
    if (__c6 === "@") {
      read_char(s);
      return wrap(s, "unquote-splicing");
    } else {
      return wrap(s, "unquote");
    }
  }
};
exports.stream = stream;
exports.read = read;
exports["read-all"] = read_all;
exports.read_all = read_all;
exports["read-string"] = read_string;
exports.read_string = read_string;
exports["read-table"] = read_table;
exports.read_table = read_table;
