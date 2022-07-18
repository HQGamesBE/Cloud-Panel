/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

let collapse_templates = document.getElementById("collapse_templates");
let collapse_templates_arrow = document.getElementById("collapse_templates_arrow");

collapse_templates.addEventListener("hide.bs.dropdown", function () {
	console.log("Closed");
	collapse_templates_arrow.classList.remove("fa-angle-down");
	collapse_templates_arrow.classList.add("fa-angle-right");
});
collapse_templates.addEventListener("show.bs.dropdown.", function () {
	console.log("Opened");
	collapse_templates_arrow.classList.remove("fa-angle-right");
	collapse_templates_arrow.classList.add("fa-angle-down");
});