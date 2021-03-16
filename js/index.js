const alphabet = [
	'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и',
	'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т',
	'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь',
	'э', 'ю', 'я',
	'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И',
	'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
	'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
	'Э', 'Ю', 'Я',
	'і', 'ї', 'ґ', 'І', 'Ї', 'Ґ',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
	'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
	'u', 'v', 'w', 'x', 'y', 'z',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
	'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
	'U', 'V', 'W', 'X', 'Y', 'Z',
	'@', '#', '$', '_', '&', '-', '+', '(', ')', '/',
	'*', '"', "'", ':', ';', '!', '?', '.', ',', '=',
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	' '
];


function createTable (alphabet) {
	let table = [];
	for (let i in alphabet) {
		let line = alphabet.slice();

		// move
		let oldFirstElements = line.splice(0, i);
		line = line.concat(oldFirstElements);

		table[i] = line;
	}

	return table;
}

function encrypt (mess, key, table) {
	let messEncrypted = '';

	let alphabet = table[0];

	for (let i in mess) {
		let messSymbol = mess[i];
		let keySymbol = key[i % key.length];

		let messSymbolPosition = symbolPosition(messSymbol, alphabet);
		let keySymbolPosition = symbolPosition(keySymbol, alphabet);
		let messSymbolEncrypted = table[keySymbolPosition][messSymbolPosition];

		messEncrypted += messSymbolEncrypted;
	}

	return messEncrypted;
}

function decrypt (mess, key, table) {
	let messDecrypted = '';

	let alphabet = table[0];

	for (let i in mess) {
		let messSymbol = mess[i];
		let keySymbol = key[i % key.length];

		let keySymbolPosition = symbolPosition(keySymbol, alphabet);
		let messSymbolPosition = symbolPosition(messSymbol, table[keySymbolPosition]);
		let messSymbolDecrypted = alphabet[messSymbolPosition];

		messDecrypted += messSymbolDecrypted;
	}

	return messDecrypted;
}

function symbolPosition (symbol, array) {
	for (let i in array)
		if (array[i] == symbol) return i;
}

let table = createTable(alphabet);


// program
/*
let table = createTable(alphabet);
console.log(table);

let key = 'москва';
let mess = 'встретимсянапушкинскойввосемь';

let messEncrypted = encrypt(mess, key, table);
console.log(messEncrypted);

let messDecrypted = decrypt(messEncrypted, key, table);
console.log(messDecrypted);
*/