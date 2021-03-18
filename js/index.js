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

function decrypt (original, key) {
	let decrypted = '';

	for (let i in original) {
		const originalSymbolCode = original.charCodeAt(i);
		const keySymbolCode = key.charCodeAt(i % key.length);

		let decryptedSymbolCode = originalSymbolCode - keySymbolCode;
		if (decryptedSymbolCode < 0) decryptedSymbolCode += 65536;

		decrypted += String.fromCharCode(decryptedSymbolCode);
	}

	return decrypted;
}