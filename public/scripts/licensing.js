const container = document.createElement("div");

container.innerHTML = "© 2022 Bruh, Ltd. ";

container.className = "licensing";

const link = document.createElement("a");

link.innerHTML = "Learn more";

link.href = "https://gitlab.com/kirbykevinson/bruh-ltd/-/blob/HEAD/LICENSE_LIST.md";

container.appendChild(link);
container.innerHTML += ".";

document.body.appendChild(container);
