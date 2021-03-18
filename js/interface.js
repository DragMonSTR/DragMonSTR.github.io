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
	setTimeout(
		() => {
			notificationTextEl.style.display = "none";
			notificationDetailsEl.style.display = "block";
			setTimeout(() => closeDetailsBtnEl.style.display = "block", 0);
			notificationEl.style.height = "calc(100vh - 15vw)";
			notificationEl.style.marginTop = "5vw";
		},
		0
	);
}

function closeDetailsBtnElOnclick () {
	notificationTextEl.style.display = "block";
	notificationDetailsEl.style.display = "none";
	closeDetailsBtnEl.style.display = "none";

	notificationEl.style.height = "14vw";
	notificationEl.style.marginTop = "18vw";
}


// move content when focus or blur input elements
keyInputEl.addEventListener("focus", inputFieldsOnfocus, false);
messInputEl.addEventListener("focus", inputFieldsOnfocus, false);
keyInputEl.addEventListener("blur", inputFieldsOnblur, false);
messInputEl.addEventListener("blur", inputFieldsOnblur, false);

function inputFieldsOnfocus () {
	setTimeout(
		() => {
			appNameEl.style.marginTop = "-15vw";
			notificationEl.style.marginTop = "3vw";
		},
		0
	);
}

function inputFieldsOnblur () {
	setTimeout(
		() => {
			appNameEl.style.marginTop = "0";
			notificationEl.style.marginTop = "18vw";
		},
		0
	);
}


// change notification when typing in input fields
keyInputEl.addEventListener("input", inputFieldsOninput, false);
messInputEl.addEventListener("input", inputFieldsOninput, false);
messInputEl.addEventListener("input", messInputElOninput, false);

function inputFieldsOninput () {
	const notificationText = notificationTextEl.innerHTML;

	resultBlockEl.style.display = "none";

	if (notificationText == "Как пользоваться?") {
		if (keyInputEl.value.length || messInputEl.value.length)
			notificationEl.style.backgroundColor = "#b89dce";
		else
			notificationEl.style.backgroundColor = "#9775b3";
	}

	else if (notificationText == "Введите ключ") {
		if (keyInputEl.value.length)
			notificationEl.style.backgroundColor = "#b3758b";
		else
			notificationEl.style.backgroundColor = "#994161";
	}

	else if (notificationText == "Введите сообщение") {
		if (messInputEl.value.length)
			notificationEl.style.backgroundColor = "#b3758b";
		else
			notificationEl.style.backgroundColor = "#994161";
	}


	if (checkFieldsValidity()) {
		changeNotificationType("accepted");
		notificationTextEl.innerHTML = "Данные введены";

		encryptActionBtnEl.classList.remove("action-btn-unavailable");
		decryptActionBtnEl.classList.remove("action-btn-unavailable");
	}
	else {
		if (notificationType == "accepted") {
			changeNotificationType("tip");
			notificationTextEl.innerHTML = "Как пользоваться?";
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


// additional functions
function changeNotificationType (type) {
	notificationType = type;

	if (type == "tip") {
		notificationEl.style.background = "#9775b3";
	}
	else if (type == "warning") {
		notificationEl.style.background = "#994161";
	}
	else if (type == "accepted") {
		notificationEl.style.background = "#a3c69a";
	}
	else if (type == "message") {
		notificationEl.style.background = "#699c5b";
	}
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