const container = document.createElement("div");

container.innerHTML = "© 2021 Bruh, Ltd. ";

container.style.all = "initial";
container.style.position = "fixed";
container.style.bottom = "0px";
container.style.right = "0px";
container.style.fontSize = "12pt";
container.style.fontFamily = "sans-serif";
container.style.color = "#FFFFFF";
container.style.background = "#0000007F";

const link = document.createElement("a");

link.innerHTML = "Learn more";

link.href = "https://gitlab.com/kirbykevinson/bruh.ltd/-/blob/master/LICENSE_LIST.md";

link.style.textDecoration = "underline";
link.style.color = "#FBAAC0";

container.appendChild(link);
container.innerHTML += ".";

document.body.appendChild(container);
