const maxSliderStep = 3;

const sliderEl = getElByClassName("guide-slider");

let sliderStep = 0;

function getElByClassName (className, i = 0) {
	return document.getElementsByClassName(className)[i];
}


function sliderNext () {
	sliderStep++;	
	updateStylesAfterSliding();
}

function sliderBack () {
	sliderStep--;	
	updateStylesAfterSliding();
}

function updateStylesAfterSliding () {
	getElByClassName("guide-step-indicator-active").classList.remove("guide-step-indicator-active");
	getElByClassName("guide-step-indicator", sliderStep).classList.add("guide-step-indicator-active");

	sliderEl.style.marginLeft = (-100 * sliderStep) + "vw";
}