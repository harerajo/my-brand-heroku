localStorage.getItem("token") && viewAllQueries();

function popup(message) {
	var x = document.getElementById("popupmessage");
	x.textContent = message;

	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 3000);
}

async function sendQuery() {
	let url = "https://johhny-brand-staging.herokuapp.com/api";

	const name = document.getElementById("sender-name").value;
	const email = document.getElementById("sender-email").value;
	const query = document.getElementById("sender-message").value;

	await fetch(url + "/queries", {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ name, email, query }),
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 201) {
				document.getElementById("error").innerHTML =
					response.error || response.message;
			}
			if (response.status == 201) {
				popup(response.message);
			}
		});
}

async function viewAllQueries() {
	let url = "https://johhny-brand-staging.herokuapp.com/api";

	let token = localStorage.getItem("token");
	await fetch(url + "/subscription/subscribers", {
		method: "GET",
		headers: {
			"Content-ype": "application/json; charset=UTF-8",
			token: token,
		},
	})
		.then((response) => response.json())
		.then((res) => {
			res.data?.subscribers.forEach((item) => {
				const tBody = document.getElementById("t-body");
				let email = document.createElement("td");
				let name = document.createElement("td");
				let row = document.createElement("tr");
				let rowContent = document.createElement("p");
				rowContent.setAttribute("class", "row-content");

				row.setAttribute("class", "collapsible");

				email.setAttribute("class", "email");
				name.setAttribute("class", "name");

				let emailvalue = document.createTextNode(item.email);
				let namevalue = document.createTextNode(item.name);

				email.appendChild(emailvalue);
				name.appendChild(namevalue);

				row.appendChild(name);
				row.appendChild(email);

				tBody.appendChild(row);
			});
		});
}

async function viewOneQuery(item) {
	let url = "https://johhny-brand-staging.herokuapp.com/api";

	let token = localStorage.getItem("token");
	await fetch(url + "/subscription/subscribers", {
		method: "GET",
		headers: {
			"Content-ype": "application/json; charset=UTF-8",
			token: token,
		},
	})
		.then((response) => response.json())
		.then((res) => {
			res.data?.subscribers.forEach((item) => {
				const tBody = document.getElementById("t-body");
				let email = document.createElement("td");
				let name = document.createElement("td");
				let row = document.createElement("tr");

				item.classList.toggle("active");
				var content = item.nextElementSibling;
				if (content.style.display === "block") {
					content.style.display = "none";
				} else {
					content.style.display = "block";
				}
			});
		});
}
