const appNameEl = getElByClassName("app-name");

const notificationEl = getElByClassName("notification");
const notificationTextEl = getElByClassName("notification-text");
const notificationDetailsEl = getElByClassName("notification-details");
const closeDetailsBtnEl = getElByClassName("close-details-btn");

const keyInputEl = document.getElementById("key-input");
const messInputEl = document.getElementById("mess-input");


const encryptActionBtnEl = getElByClassName("action-btn", 0);
const decryptActionBtnEl = getElByClassName("action-btn", 1);

const resultBlockEl = getElByClassName("result-block");
const resultNameEl = getElByClassName("result-name");
const resultContentEl = getElByClassName("result-content");

const clearBtnEl = getElByClassName("clear-btn");

function getElByClassName (className, i = 0) {
	return document.getElementsByClassName(className)[i];
}

let notificationType = "tip";


// tip communication
notificationTextEl.addEventListener("click", notificationTextElOnclick, false);
closeDetailsBtnEl.addEventListener("click", closeDetailsBtnElOnclick, false);

function notificationTextElOnclick () {
	const notificationText = notificationTextEl.innerHTML;
	if (notificationType != "tip" && notificationType != "tip-light") return;

	setTimeout(() => {
			changeNotificationType("tip");
			notificationTextEl.style.display = "none";
			notificationDetailsEl.style.display = "block";
			setTimeout(() => closeDetailsBtnEl.style.display = "block", 250);
			notificationEl.style.height = "calc(100vh - 25vw)";
			notificationEl.style.marginTop = "5vw";
		}, 0);
}

function closeDetailsBtnElOnclick () {
	notificationTextEl.style.display = "block";
	notificationDetailsEl.style.display = "none";
	closeDetailsBtnEl.style.display = "none";

	notificationEl.style.height = "14vw";
	notificationEl.style.marginTop = "18vw";
}


// move content when focus/blur input elements
keyInputEl.addEventListener("focus", inputFieldsOnfocus, false);
messInputEl.addEventListener("focus", inputFieldsOnfocus, false);
keyInputEl.addEventListener("blur", inputFieldsOnblur, false);
messInputEl.addEventListener("blur", inputFieldsOnblur, false);

function inputFieldsOnfocus () {
	setTimeout(() => {
			appNameEl.style.marginTop = "-10vw";
			notificationEl.style.marginTop = "3vw";
		}, 0);
}

function inputFieldsOnblur () {
	setTimeout(() => {
			appNameEl.style.marginTop = "5vw";
			notificationEl.style.marginTop = "18vw";
		}, 0);
}


// change notification when typing in input fields
keyInputEl.addEventListener("input", inputFieldsOninput, false);
messInputEl.addEventListener("input", inputFieldsOninput, false);

function inputFieldsOninput () {
	resultBlockEl.style.display = "none";

	const notificationText = notificationTextEl.innerHTML;
	const keyLength = keyInputEl.value.length;
	const messLength = messInputEl.value.length;

	if (keyLength && messLength) {
		encryptActionBtnEl.classList.remove("action-btn-unavailable");
		decryptActionBtnEl.classList.remove("action-btn-unavailable");

		changeNotificationType("accepted");
		notificationTextEl.innerHTML = "Данные введены";
	}
	else {
		encryptActionBtnEl.classList.add("action-btn-unavailable");
		decryptActionBtnEl.classList.add("action-btn-unavailable");

		if (notificationType == "tip") {
			if (keyLength || messLength)
				changeNotificationType("tip-light");
		}
		else if (notificationType == "tip-light") {
			if (!keyLength && !messLength)
				changeNotificationType("tip");
		}

		else if (notificationText == "Введите ключ") {
			if (keyLength)
				changeNotificationType("warning-light");
			else
				changeNotificationType("warning");
		}
		else if (notificationText == "Введите сообщение") {
			if (messLength)
				changeNotificationType("warning-light");
			else
				changeNotificationType("warning");
		}

		else if (notificationType == "accepted") {
			changeNotificationType("tip");
			notificationTextEl.innerHTML = "Как пользоваться?";
		}
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
	resultBlockEl.style.display = "none";

	changeNotificationType("tip");
	notificationTextEl.innerHTML = "Как пользоваться?";
	encryptActionBtnEl.classList.add("action-btn-unavailable");
	decryptActionBtnEl.classList.add("action-btn-unavailable");
}


// action btns processing
encryptActionBtnEl.addEventListener("click", tryEncrypt, false);
decryptActionBtnEl.addEventListener("click", tryDecrypt, false);

function tryEncrypt () {
	if (!checkFieldsValidity(true)) return;

	const resultContent = encrypt(messInputEl.value, keyInputEl.value);

	showResult("Зашифрованное сообщение:", resultContent);
}

function tryDecrypt () {
	if (!checkFieldsValidity(true)) return;

	const resultContent = decrypt(messInputEl.value, keyInputEl.value);

	showResult("Расшифрованное сообщение:", resultContent);
}


// additional functions
function changeNotificationType (type) {
	notificationType = type;

	let backgroundColor;
	if (type == "tip") backgroundColor = "#9775b3";
	else if (type == "tip-light") backgroundColor = "#b89dce";
	else if (type == "warning") backgroundColor = "#994161";
	else if (type == "warning-light") backgroundColor = "#b3758b";
	else if (type == "accepted") backgroundColor = "#a3c69a";
	else if (type == "message") backgroundColor = "#699c5b";

	notificationEl.style.backgroundColor = backgroundColor;
}

function checkFieldsValidity (changeNotification = false) {
	if (!keyInputEl.value.length) {
		if (!changeNotification) return false;
		changeNotificationType("warning");
		notificationTextEl.innerHTML = "Введите ключ";
		return false;
	}

	if (!messInputEl.value.length) {
		if (!changeNotification) return false;
		changeNotificationType("warning");
		notificationTextEl.innerHTML = "Введите сообщение";
		return false;
	}

	return true;
}

function showResult (resultName, resultContent) {
	resultBlockEl.style.display = "block";
	resultNameEl.innerHTML = resultName;
	resultContentEl.innerHTML = resultContent;

	changeNotificationType("message");
	notificationTextEl.innerHTML = "Скопировано";

	// coping result to copy buffer
	let tmpEl = document.createElement('textarea');
	document.getElementsByTagName('body')[0].append(tmpEl);
	tmpEl.value = resultContent;
	tmpEl.select();
	document.execCommand('copy');
	tmpEl.remove();
}