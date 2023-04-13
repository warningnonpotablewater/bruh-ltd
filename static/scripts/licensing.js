const container = document.createElement("div");

container.innerHTML = "© 2022 Bruh, Ltd. ";

container.className = "licensing";

const link = document.createElement("a");

link.innerHTML = "Learn more";

link.href = "/licensing/";

container.appendChild(link);
container.innerHTML += ".";

document.body.appendChild(container);
