const mainBlockEl = getElByClassName("main-block");

const cardEl = getElByClassName("card");

const keyInputEl = getElByClassName("key-input");
const messInputEl = getElByClassName("mess-input");

const encryptActionBtnEl = getElByClassName("action-btn", 0);
const decryptActionBtnEl = getElByClassName("action-btn", 1);

const clearBtnEl = getElByClassName("clear-btn");

const notificationBlockEl = getElByClassName("notification-block");
const notificationEl = getElByClassName("notification");

const showGuideBtnBlockEl = getElByClassName("show-guide-btn-block");
const showGuideBtnEl = getElByClassName("show-guide-btn");

const encryptedStatusMessageEl = getElByClassName("encrypted-status-message");

const resultBlockEl = getElByClassName("result-block");
const decryptedMessageEl = getElByClassName("decrypted-message");

const decryptedMessageBlockBackBtnEl = resultBlockEl.getElementsByClassName("main-btn")[0];
const decryptedMessageBlockCopyBtnEl = resultBlockEl.getElementsByClassName("additional-btn")[0];

let notificationType = "tip";


// move content when focus/blur input elements
keyInputEl.addEventListener("focus", inputFieldsOnfocus, false);
messInputEl.addEventListener("focus", inputFieldsOnfocus, false);
keyInputEl.addEventListener("blur", inputFieldsOnblur, false);
messInputEl.addEventListener("blur", inputFieldsOnblur, false);

function inputFieldsOnfocus () {
	setTimeout(() => {
			hideNotification();
			cardEl.style.marginTop = "4vw";
		}, 0);
}

function inputFieldsOnblur () {
	setTimeout(() => {
			cardEl.style.marginTop = "7vw";
		}, 0);
}


// light and dark action btns
keyInputEl.addEventListener("input", inputFieldsOninput, false);
messInputEl.addEventListener("input", inputFieldsOninput, false);

function inputFieldsOninput () {
	showGuideBtnBlockEl.style.display = "flex";
	encryptedStatusMessageEl.style.display = "none";

	if (keyInputEl.value.length && messInputEl.value.length) {
		encryptActionBtnEl.classList.remove("action-btn-unavailable");
		decryptActionBtnEl.classList.remove("action-btn-unavailable");
	}
	else {
		encryptActionBtnEl.classList.add("action-btn-unavailable");
		decryptActionBtnEl.classList.add("action-btn-unavailable");
	}
}


// show/hide clear btn
messInputEl.addEventListener("input", updateClearBtnVisibility, false);
messInputEl.addEventListener("focus", updateClearBtnVisibility, false);
messInputEl.addEventListener("blur", hideClearBtn, false);

function updateClearBtnVisibility () {
	if (messInputEl.value.length)
		clearBtnEl.style.display = "block";
	else
		clearBtnEl.style.display = "none";
}

function hideClearBtn () {
	setTimeout(() => clearBtnEl.style.display = "none",
		0);
}


// clear btn processing
clearBtnEl.addEventListener("click", clearBtnElOnclick, false);

function clearBtnElOnclick () {
	messInputEl.value = "";
	messInputEl.focus();

	encryptActionBtnEl.classList.add("action-btn-unavailable");
	decryptActionBtnEl.classList.add("action-btn-unavailable");
}


// action btns processing
encryptActionBtnEl.addEventListener("click", tryEncrypt, false);
decryptActionBtnEl.addEventListener("click", tryDecrypt, false);

function tryEncrypt () {
	if (!checkFieldsValidity(true)) return;

	const resultContent = encrypt(messInputEl.value, keyInputEl.value);
	
	copy(resultContent);

	showGuideBtnBlockEl.style.display = "none";
	encryptedStatusMessageEl.style.display = "block";

	showNotification("success", "скопировано");
}

function tryDecrypt () {
	if (!checkFieldsValidity(true)) return;

	const resultContent = decrypt(messInputEl.value, keyInputEl.value);

	resultBlockEl.style.display = "block";
	setTimeout(() => resultBlockEl.style.left = "0vw", 0);
	decryptedMessageEl.innerHTML = resultContent;
	setTimeout(() => mainBlockEl.style.display = "none", 200);
}


// decrypted block back btn processing
decryptedMessageBlockBackBtnEl.addEventListener("click", decryptedMessageBlockBackBtnElOnclick, false);
decryptedMessageBlockCopyBtnEl.addEventListener("click", decryptedMessageBlockCopyBtnElOnclick, false);

function decryptedMessageBlockBackBtnElOnclick () {
	mainBlockEl.style.display = "block";
	resultBlockEl.style.left = "100vw";
	setTimeout(() => resultBlockEl.style.display = "none", 300);
}

function decryptedMessageBlockCopyBtnElOnclick () {
	let decryptedMess = decryptedMessageEl.innerHTML;
	copy(decryptedMess);
}


// show guide btn processing
showGuideBtnEl.addEventListener("click", showGuideBtnElOnclick, false);

function showGuideBtnElOnclick () {
	guideBlockEl.style.display = "block";
	setTimeout(() => guideBlockEl.style.marginTop = "0", 0);
	setTimeout(() => mainBlockEl.style.display = "none", 300);
}


// additional functions
function checkFieldsValidity (changeDom = false) {
	if (!keyInputEl.value.length) {
		if (!changeDom) return false;
		keyInputEl.classList.add("wrong-input-field");
		showNotification("warning", "Введите ключ!");
		return false;
	}

	if (!messInputEl.value.length) {
		if (!changeDom) return false;
		messInputEl.classList.add("wrong-input-field");
		showNotification("warning", "Введите сообщение!");
		return false;
	}

	return true;
}

function showNotification (notificationType, notificationText) {
	if (notificationType == "warning")
		notificationBlockEl.style.backgroundColor = "#d4515f";
	else if (notificationType == "success")
		notificationBlockEl.style.backgroundColor = "#a3c69a";

	notificationEl.innerHTML = notificationText;

	notificationBlockEl.style.display = "flex";
	notificationBlockEl.style.bottom = "0";
}

function hideNotification () {
	notificationBlockEl.style.display = "none";
	notificationBlockEl.style.bottom = "-20vw";
}

function copy (text) {
	let tmpEl = document.createElement('textarea');
	document.getElementsByTagName('body')[0].append(tmpEl);
	tmpEl.value = text;
	tmpEl.select();
	document.execCommand('copy');
	tmpEl.remove();
}