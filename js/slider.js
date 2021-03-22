const maxSliderStep = 3;

const sliderEl = getElByClassName("guide-slider");
const guideBlockEl = getElByClassName("guide-block");

const additionalBtnEl = getElByClassName("guide-additional-btn");
const mainBtnEl = getElByClassName("guide-main-btn");


function getElByClassName (className, i = 0) {
	return document.getElementsByClassName(className)[i];
}


let sliderStep = 0;
let additionalBtnAction = "close guide";
let mainBtnAction = "next";


additionalBtnEl.addEventListener("click", () => slide("additional"), false);
mainBtnEl.addEventListener("click", () => slide("main"), false);

function slide (buttonType) {
	let action;
	if (buttonType === "additional") action = additionalBtnAction;
	else action = mainBtnAction;
	
	// if need to close
	if (action === "close guide") {
		guideBlockEl.style.marginTop = "-100vh";
		return;
	}

	// else
	if (action === "next") sliderStep++;
	else if (action === "previous") sliderStep--;

	getElByClassName("guide-step-indicator-active").classList.remove(
		"guide-step-indicator-active");
	getElByClassName("guide-step-indicator", sliderStep).classList.add(
		"guide-step-indicator-active");

	sliderEl.style.marginLeft = (-100 * sliderStep) + "vw";

	// change additionalBtnAction & mainBtnAction
	// change btns text
	if (sliderStep === 0) {
		additionalBtnAction = "close guide";
		mainBtnAction = "next";

		additionalBtnEl.innerHTML = "Пропустить";
		mainBtnEl.innerHTML = "Далее";

		guideBlockEl.style.backgroundColor = "#4f85c6";
	}
	else if (sliderStep === 1 || sliderStep === 2) {
		additionalBtnAction = "previous";
		mainBtnAction = "next";

		additionalBtnEl.innerHTML = "Назад";
		mainBtnEl.innerHTML = "Далее";

		if (sliderStep === 1) guideBlockEl.style.backgroundColor = "#d4515f";
		if (sliderStep === 2) guideBlockEl.style.backgroundColor = "#4f8d5f";
	}
	else if (sliderStep === 3) {
		additionalBtnAction = "previous";
		mainBtnAction = "close guide";

		additionalBtnEl.innerHTML = "Назад";
		mainBtnEl.innerHTML = "Приступить";
		guideBlockEl.style.backgroundColor = "#e6cc68";
	}
}