const unicodeSize = 1114112;
// 65536
// 1114112

/*
function encrypt (original, key, doKeyTransforming = true) {
	let encrypted = "";

	//if (doKeyTransforming) key = transformKey(key);

	for (let i in original) {
		const originalSymbolCode = original.charCodeAt(i);
		const keySymbolCode = key.charCodeAt(i % key.length);

		let ecryptedSymbolCode = originalSymbolCode + keySymbolCode;
		if (ecryptedSymbolCode >= unicodeSize) ecryptedSymbolCode -= unicodeSize;

		encrypted += String.fromCharCode(ecryptedSymbolCode);
	}

	console.log(encrypted);
	return encrypted;
}
*/

function encrypt (original, key, doKeyTransforming = true) {
	let encrypted = "";

	if (doKeyTransforming) key = transformKey(key);

	let keyIndex = 0;
	for (let i = 0; i < original.length; i++) {
		if (i > 0 && original.codePointAt(i - 1) != original.charCodeAt(i - 1)) continue;

		let originalSymbolCode = original.codePointAt(i);

		const keySymbolCode = key.codePointAt(keyIndex);
		keyIndex++;
		if (keyIndex == key.length) keyIndex = 0;

		let encryptedSymbolCode = originalSymbolCode + keySymbolCode;
		if (encryptedSymbolCode >= unicodeSize) encryptedSymbolCode -= unicodeSize;
		
		//console.log(i)
		//console.log("original codePoint ", originalSymbolCode)
		//console.log("key codePoint      ", keySymbolCode)
		//console.log("encrypted charCode ", String.fromCodePoint(encryptedSymbolCode).charCodeAt(0))
		//console.log("encrypted codePoint", encryptedSymbolCode);
		//console.log("----------------------------")

		encrypted += String.fromCodePoint(encryptedSymbolCode);
	}

	return encrypted;
}


function decrypt (encrypted, key, doKeyTransforming = true) {
	let original = '';

	if (doKeyTransforming) key = transformKey(key);

	let keyIndex = 0;
	for (let i = 0; i < encrypted.length; i++) {

		if (i > 0 && encrypted.codePointAt(i - 1) != encrypted.charCodeAt(i - 1)) {
			//console.log("skipped", i);
			//console.log("encrypted charCode ", encrypted.charCodeAt(i - 1))
			//console.log("encrypted codePoint", encrypted.codePointAt(i - 1))
			//console.log("----------------------------")
			continue;
		}


		const encryptedSymbolCode = encrypted.codePointAt(i);
		const keySymbolCode = key.codePointAt(keyIndex);
		keyIndex++;
		if (keyIndex == key.length) keyIndex = 0;

		let originalSymbolCode = encryptedSymbolCode - keySymbolCode;
		if (originalSymbolCode < 0) originalSymbolCode += unicodeSize;

		//console.log(i)
		//console.log("encrypted charCode ", encrypted.charCodeAt(i));
		//console.log("encrypted codePoint", encryptedSymbolCode);
		//console.log("key codePoint      ", keySymbolCode)
		//console.log("original codePoint ", originalSymbolCode)
		//console.log("----------------------------")


		let symbol = String.fromCodePoint(originalSymbolCode);

		original += symbol;
	}

	return original;
}

function transformKey (key) {
	key = encrypt(key, "%X5bL6r4#z", false);

	let newKey = key;

	for (let i = 1; i < key.length; i++)
		newKey = encrypt(newKey, key[i], false);

	return newKey;
}












/*! https://mths.be/codepointat v0.2.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function() {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
    var defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var codePointAt = function(position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      // `ToInteger`
      var index = position ? Number(position) : 0;
      if (index != index) { // better `isNaN`
        index = 0;
      }
      // Account for out-of-bounds indices:
      if (index < 0 || index >= size) {
        return undefined;
      }
      // Get the first code unit
      var first = string.charCodeAt(index);
      var second;
      if ( // check if it’s the start of a surrogate pair
        first >= 0xD800 && first <= 0xDBFF && // high surrogate
        size > index + 1 // there is a next code unit
      ) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
      }
      return first;
    };
    if (defineProperty) {
      defineProperty(String.prototype, 'codePointAt', {
        'value': codePointAt,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  }());
}




/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
if (!String.fromCodePoint) {
  (function() {
    var defineProperty = (function() {
      // IE 8 поддерживает метод `Object.defineProperty` только на элементах DOM
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    var fromCodePoint = function() {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;
      if (!length) {
        return '';
      }
      var result = '';
      while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (
          !isFinite(codePoint) ||       // `NaN`, `+Infinity` или `-Infinity`
          codePoint < 0 ||              // неверная кодовая точка Юникода
          codePoint > 0x10FFFF ||       // неверная кодовая точка Юникода
          floor(codePoint) != codePoint // не целое число
        ) {
          throw RangeError('Invalid code point: ' + codePoint);
        }
        if (codePoint <= 0xFFFF) { // кодовая точка Базовой многоязыковой плоскости (БМП)
          codeUnits.push(codePoint);
        } else { // Астральная кодовая точка; делим её на суррогатную пару
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = (codePoint % 0x400) + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    if (defineProperty) {
      defineProperty(String, 'fromCodePoint', {
        'value': fromCodePoint,
        'configurable': true,
        'writable': true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  }());
}