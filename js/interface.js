const cardEl = getElByClassName("card");

const keyInputEl = document.getElementById("key-input");
const messInputEl = document.getElementById("mess-input");

const encryptActionBtnEl = getElByClassName("action-btn", 0);
const decryptActionBtnEl = getElByClassName("action-btn", 1);

const clearBtnEl = getElByClassName("clear-btn");

const notificationBlockEl = getElByClassName("notification-block");
const notificationEl = getElByClassName("notification");

function getElByClassName (className, i = 0) {
	return document.getElementsByClassName(className)[i];
}

let notificationType = "tip";


// move content when focus/blur input elements
keyInputEl.addEventListener("focus", inputFieldsOnfocus, false);
messInputEl.addEventListener("focus", inputFieldsOnfocus, false);
keyInputEl.addEventListener("blur", inputFieldsOnblur, false);
messInputEl.addEventListener("blur", inputFieldsOnblur, false);

function inputFieldsOnfocus () {
	setTimeout(() => {
			cardEl.style.marginTop = "4vw";
		}, 0);
}

function inputFieldsOnblur () {
	setTimeout(() => {
			cardEl.style.marginTop = "7vw";
		}, 0);
}


// change notification when typing in input fields
keyInputEl.addEventListener("input", keyInputElOninput, false);
messInputEl.addEventListener("input", messInputElOninput, false);

function keyInputElOninput () {

}

function messInputElOninput () {
	
}

function inputFieldsOninput () {
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
	if (type == "warning") backgroundColor = "#994161";
	else if (type == "accepted") backgroundColor = "#a3c69a";

	notificationBlockEl.style.backgroundColor = backgroundColor;
}

function checkFieldsValidity (needToshowNotification = false) {
	if (!keyInputEl.value.length) {
		if (!needToshowNotification) return false;
		showNotification("warning", "Введите ключ!");
		return false;
	}

	if (!messInputEl.value.length) {
		if (!needToshowNotification) return false;
		showNotification("warning", "Введите сообщение!");
		return false;
	}

	return true;
}

function showNotification (notificationType, notificationText) {
	if (notificationType == "warning")
		notificationBlockEl.style.backgroundColor = "#994161";
	else if (notificationType == "accepted")
		notificationBlockEl.style.backgroundColor = "#a3c69a";

	notificationEl.innerHTML = notificationText;

	notificationBlockEl.style.display = "flex";
	notificationBlockEl.style.bottom = "0";
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