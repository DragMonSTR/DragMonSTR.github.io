// sectors navigation
const headerEl = document.getElementsByTagName("header")[0];
const worksBlockEl = getElByClass("works-block");
const skillsBlockEl = getElByClass("skills-block");
const contactsBlockEl = getElByClass("contacts-block");

getElByClass("logo-block").onclick = () => scrollPageTo("logo");
getElByClass("works-btn").onclick = () => scrollPageTo("works");
getElByClass("header-btn-works").onclick = () => scrollPageTo("works");
getElByClass("header-btn-skills").onclick = () => scrollPageTo("skills");
getElByClass("header-btn-contacts").onclick = () => scrollPageTo("contacts");

function scrollPageTo (section) {
	let top = -headerEl.offsetHeight - 50;

	if (section === "logo")
		top += 0;
	else if (section === "works")
		top += worksBlockEl.offsetTop;
	else if (section === "skills")
		top += skillsBlockEl.offsetTop;
	else if (section === "contacts")
		top += contactsBlockEl.offsetTop;

	window.scroll({left: 0, top: top, behavior: "smooth"});
}


// copy btn clicking
getElByClass("copy-email-btn").onclick = () => {
	let tmpEl = document.createElement("textarea");
	document.getElementsByTagName("body")[0].append(tmpEl);
	tmpEl.value = getElByClass("email").innerHTML;
	tmpEl.select();
	document.execCommand("copy");
	tmpEl.remove();
}





// additional functions
function getElByClass(classname, index = 0) {
	return document.getElementsByClassName(classname)[index];
}






window.onload = () => {
	// google fonts
	let headEl = document.getElementsByTagName("head")[0];

	let link1El = document.createElement("link");
	link1El.rel = "preconnect";
	link1El.href = "https://fonts.gstatic.com";

	let link2El = document.createElement("link");
	link2El.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
	link2El.rel = "stylesheet";
	

	headEl.appendChild(link1El);
	headEl.appendChild(link2El);

	// photo
	getElByClass("photo").src = "img/photo-min.png";
}