function encrypt (original, key) {
	let encrypted = '';

	for (let i in original) {
		const originalSymbolCode = original.charCodeAt(i);
		const keySymbolCode = key.charCodeAt(i % key.length);

		let ecryptedSymbolCode = originalSymbolCode + keySymbolCode;
		if (ecryptedSymbolCode >= 65536) ecryptedSymbolCode -= 65536;

		encrypted += String.fromCharCode(ecryptedSymbolCode);
	}

	return encrypted;
}

function decrypt (encrypted, key) {
	let original = '';

	for (let i in encrypted) {
		const encryptedSymbolCode = encrypted.charCodeAt(i);
		const keySymbolCode = key.charCodeAt(i % key.length);

		let originalSymbolCode = encryptedSymbolCode - keySymbolCode;
		if (originalSymbolCode < 0) originalSymbolCode += 65536;

		original += String.fromCharCode(originalSymbolCode);
	}

	return original;
}