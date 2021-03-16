const keyInputEl = document.getElementById("key-input");
const messInputEl = document.getElementById("mess-input");

const notificationEl = document.getElementsByClassName("notification")[0];

const encryptActionBtnEl = document.getElementsByClassName("action-btn")[0];
const decryptActionBtnEl = document.getElementsByClassName("action-btn")[1];

const resultEl = document.getElementsByClassName("result")[0];

let notificationType = "tip";


// change notification when typing in input fields
keyInputEl.addEventListener("input", inputFieldsChanged, false);
messInputEl.addEventListener("input", inputFieldsChanged, false);

function inputFieldsChanged () {
	const notificationText = notificationEl.innerHTML;

	if (notificationText == "Как пользоваться?") {
		if (keyInputEl.value.length || messInputEl.value.length)
			notificationEl.style.opacity = "0.3";
		else
			notificationEl.style.opacity = "0.6";
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


// action btns processing
encryptActionBtnEl.addEventListener("click", tryEncrypt, false);
decryptActionBtnEl.addEventListener("click", tryDecrypt, false);

function tryEncrypt () {
	if (!checkFieldsValidity(true)) return;

	let result = encrypt(messInputEl.value, keyInputEl.value, table);

	showResult(result);
}

function tryDecrypt () {
	if (!checkFieldsValidity(true)) return;

	let result = decrypt(messInputEl.value, keyInputEl.value, table);

	showResult(result);
}



// additional functions
function changeNotificationType (type) {
	notificationType = type;

	if (type == "tip") {
		notificationEl.style.background = "#470c75";
		notificationEl.style.color = "#fff";
		notificationEl.style.opacity = "0.6";
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

function showResult (result) {
	resultEl.innerHTML = result;


	//navigator.clipboard.writeText(result);
	if (navigator.clipboard) {
		// поддержка имеется, включить соответствующую функцию проекта.
		document.getElementsByTagName("body")[0].style.background = 'green';
	} else {
		// поддержки нет. Придётся пользоваться execCommand или не включать эту функцию.
		document.getElementsByTagName("body")[0].style.background = 'red';
	}

	changeNotificationType("message");
	notificationEl.innerHTML = "Скопировано";
}
