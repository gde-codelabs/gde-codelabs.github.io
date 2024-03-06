var topElement = document.getElementsByTagName("google-codelab")[0];
var title = topElement.getAttribute("codelab-title");
var authors = topElement.getAttribute("authors");
console.log(title);
console.log(authors);

var steps = document.getElementsByTagName("google-codelab-step");

var innerBeforeIntruction = document.querySelectorAll(".instructions")[0];
var innerBefore = steps[0].querySelectorAll(".instructions .inner")[0];

var innerNewTitleInstruction = document.createElement("div");
innerNewTitleInstruction.className = "instructions about-title";

var innerTitle = document.createElement("div");
innerTitle.className = "inner inner-title";
innerTitle.innerHTML = `
        ${title}
        `;
innerNewTitleInstruction.append(innerTitle);

var innerNewAboutInstruction = document.createElement("div");
innerNewAboutInstruction.className = "instructions about-card";

var innerAuthor = document.createElement("div");
innerAuthor.className = "inner inner-author";
innerAuthor.innerHTML = `
        <div class="about-this-codelab">About this codelab</div>
        <i class="material-icons" style="font-size:25px;">account_circle</i> Written by ${authors}
        `;
innerNewAboutInstruction.append(innerAuthor);

steps[0].insertBefore(innerNewTitleInstruction, innerBeforeIntruction);
steps[0].insertBefore(innerNewAboutInstruction, innerBeforeIntruction);
