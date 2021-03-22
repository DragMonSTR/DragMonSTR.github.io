const unicodeSize = 65536;

function encrypt (original, key, doKeyTransforming = true) {
	let encrypted = "";

	if (doKeyTransforming) key = transformKey(key);

	for (let i in original) {
		const originalSymbolCode = original.charCodeAt(i);
		const keySymbolCode = key.charCodeAt(i % key.length);

		let ecryptedSymbolCode = originalSymbolCode + keySymbolCode;
		if (ecryptedSymbolCode >= unicodeSize) ecryptedSymbolCode -= unicodeSize;

		encrypted += String.fromCharCode(ecryptedSymbolCode);
	}

	return encrypted;
}

function decrypt (encrypted, key, doKeyTransforming = true) {
	let original = '';

	if (doKeyTransforming) key = transformKey(key);

	for (let i in encrypted) {
		const encryptedSymbolCode = encrypted.charCodeAt(i);
		const keySymbolCode = key.charCodeAt(i % key.length);

		let originalSymbolCode = encryptedSymbolCode - keySymbolCode;
		if (originalSymbolCode < 0) originalSymbolCode += unicodeSize;

		original += String.fromCharCode(originalSymbolCode);
	}

	return original;
}

function transformKey (key) {
	let newKey = key;

	for (let i = 1; i < key.length; i++) {
		newKey = encrypt(newKey, key[i], false);
	}

	return newKey;
}