var topElement = document.getElementsByTagName("google-codelab")[0];
var title = topElement.getAttribute("codelab-title");
var authors = topElement.getAttribute("authors");
console.log(title);
console.log(authors);

var steps = document.getElementsByTagName("google-codelab-step");

var innerBeforeIntruction = document.querySelectorAll(".instructions")[0];
var innerBefore = steps[0].querySelectorAll(".instructions .inner")[0];

var innerNewInstruction = document.createElement("div");
innerNewInstruction.className = "instructions about-card";

var innerTitle = document.createElement("div");
innerTitle.className = "inner inner-title";
innerTitle.innerHTML = `
        <h1>${title}</h1>
        `;
innerNewInstruction.append(innerTitle);

var innerAuthor = document.createElement("div");
innerAuthor.className = "inner inner-author";
innerAuthor.innerHTML = `
        <span>by ${authors}</span>
        `;
innerNewInstruction.append(innerAuthor);

steps[0].insertBefore(innerNewInstruction, innerBeforeIntruction);
