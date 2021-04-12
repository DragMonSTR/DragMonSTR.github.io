function getElByClassName (className, i = 0) {
	return document.getElementsByClassName(className)[i];
}


adaptive();
window.onresize = () => adaptive();

function adaptive () {
	const width = innerWidth;
	const height = innerHeight;
	const aspectRatio = width / height;
	const vw = 0.01 * screen.width;

	adaptiveGuideBlock();
	adaptiveResultBlock();

	function adaptiveGuideBlock () {
		let paddingBottom = 0;
		if (aspectRatio <= 9 / 18) paddingBottom = 3 * vw;
		if (aspectRatio <= 9 / 19) paddingBottom = 5 * vw;

		getElByClassName("guide-btns-block").style.marginTop = height - 20 * vw - paddingBottom + "px";
		getElByClassName("guide-step-block").style.marginTop = height - 33 * vw - paddingBottom + "px";
	}

	function adaptiveResultBlock () {
		getElByClassName("decrypted-message").style.height = height - 65 * vw + "px";
	}
}
