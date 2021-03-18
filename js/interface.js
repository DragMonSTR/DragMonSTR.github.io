const appNameEl = document.getElementsByClassName("app-name")[0];

const keyInputEl = document.getElementById("key-input");
const messInputEl = document.getElementById("mess-input");

const notificationEl = document.getElementsByClassName("notification")[0];

const encryptActionBtnEl = document.getElementsByClassName("action-btn")[0];
const decryptActionBtnEl = document.getElementsByClassName("action-btn")[1];

const resultBlockEl = document.getElementsByClassName("result-block")[0];
const resultNameEl = document.getElementsByClassName("result-name")[0];
const resultContentEl = document.getElementsByClassName("result-content")[0];

const clearBtnEl = document.getElementsByClassName("clear-btn")[0];

let notificationType = "tip";


// move content when focus or blur input elements
keyInputEl.addEventListener("focus", inputFieldsOnfocus, false);
messInputEl.addEventListener("focus", inputFieldsOnfocus, false);
keyInputEl.addEventListener("blur", inputFieldsOnblur, false);
messInputEl.addEventListener("blur", inputFieldsOnblur, false);

function inputFieldsOnfocus () {
	setTimeout(
		() => appNameEl.style.marginTop = "-15vw",
		0
	);
}

function inputFieldsOnblur () {
	setTimeout(
		() => appNameEl.style.marginTop = "0",
		0
	);
}


// change notification when typing in input fields
keyInputEl.addEventListener("input", inputFieldsOninput, false);
messInputEl.addEventListener("input", inputFieldsOninput, false);
messInputEl.addEventListener("input", messInputElOninput, false);

function inputFieldsOninput () {
	const notificationText = notificationEl.innerHTML;

	resultBlockEl.style.display = "none";

	if (notificationText == "Как пользоваться?") {
		if (keyInputEl.value.length || messInputEl.value.length)
			notificationEl.style.opacity = "0.3";
		else
			notificationEl.style.opacity = "0.5";
	}

	else if (notificationText == "Введите ключ") {
		if (keyInputEl.value.length)
			notificationEl.style.opacity = "0.5";
		else
			notificationEl.style.opacity = "0.8";
	}

	else if (notificationText == "Введите сообщение") {
		if (messInputEl.value.length)
			notificationEl.style.opacity = "0.5";
		else
			notificationEl.style.opacity = "0.8";
	}


	if (checkFieldsValidity()) {
		changeNotificationType("accepted");
		notificationEl.innerHTML = "Данные введены";

		encryptActionBtnEl.classList.remove("action-btn-unavailable");
		decryptActionBtnEl.classList.remove("action-btn-unavailable");
	}
	else {
		if (notificationType == "accepted") {
			changeNotificationType("tip");
			notificationEl.innerHTML = "Как пользоваться?";
		}

		encryptActionBtnEl.classList.add("action-btn-unavailable");
		decryptActionBtnEl.classList.add("action-btn-unavailable");
	}
}

function messInputElOninput () {
	if (messInputEl.value.length)
		clearBtnEl.style.display = "block";
	else
		clearBtnEl.style.display = "none";
}


// action btns processing
encryptActionBtnEl.addEventListener("touchstart", tryEncrypt, false);
decryptActionBtnEl.addEventListener("touchstart", tryDecrypt, false);

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


// show clear message btn when textarea is focused
messInputEl.addEventListener("focus", messInputElOnfocus, false);
messInputEl.addEventListener("blur", messInputElOnblur, false);

function messInputElOnfocus () {
	if (messInputEl.value.length)
		clearBtnEl.style.display = "block";
}

function messInputElOnblur () {
	setTimeout(
		() => clearBtnEl.style.display = "none",
		0
	);
}


// clear btn processing
clearBtnEl.addEventListener("touchstart", clearBtnElOnclick, false);

function clearBtnElOnclick () {
	messInputEl.value = "";
	messInputEl.focus();
	resultBlockEl.style.display = "none";

	changeNotificationType("tip");
	notificationEl.innerHTML = "Как пользоваться?";
	encryptActionBtnEl.classList.add("action-btn-unavailable");
	decryptActionBtnEl.classList.add("action-btn-unavailable");
}


// additional functions
function changeNotificationType (type) {
	notificationType = type;

	if (type == "tip") {
		notificationEl.style.background = "#470c75";
		notificationEl.style.color = "#fff";
		notificationEl.style.opacity = "0.5";
	}
	else if (type == "warning") {
		notificationEl.style.background = "#7f113a";
		notificationEl.style.color = "#fff";
		notificationEl.style.opacity = "0.8";
	}
	else if (type == "accepted") {
		notificationEl.style.background = "#5c974c";
		notificationEl.style.color = "#fff";
		notificationEl.style.opacity = "0.5";
	}
	else if (type == "message") {
		notificationEl.style.background = "#5c974c";
		notificationEl.style.color = "#fff";
		notificationEl.style.opacity = "0.8";
	}
}

function checkFieldsValidity (changeNotification = false) {
	if (!keyInputEl.value.length) {
		if (!changeNotification) return false;
		changeNotificationType("warning");
		notificationEl.innerHTML = "Введите ключ";
		return false;
	}

	if (!messInputEl.value.length) {
		if (!changeNotification) return false;
		changeNotificationType("warning");
		notificationEl.innerHTML = "Введите сообщение";
		return false;
	}

	return true;
}

function showResult (resultName, resultContent) {
	resultBlockEl.style.display = "block";
	resultNameEl.innerHTML = resultName;
	resultContentEl.innerHTML = resultContent;

	changeNotificationType("message");
	notificationEl.innerHTML = "Скопировано";

	// coping result to copy buffer
	let tmpEl = document.createElement('textarea');
	document.getElementsByTagName('body')[0].append(tmpEl);
	tmpEl.value = resultContent;
	tmpEl.select();
	document.execCommand('copy');
	tmpEl.remove();
}