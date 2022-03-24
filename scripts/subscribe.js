localStorage.getItem("token") && allSubscribers();

async function subscribe() {
	const name = document.forms["subscribe-form"]["name"].value;
	const email = document.forms["subscribe-form"]["email"].value;
	let url = "https://johhny-brand-staging.herokuapp.com/api";
	await fetch(url + "/subscription/subscribe", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			token: "12345",
		},
		body: JSON.stringify({ name, email }),
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status == 200) {
				popup(response.message);
			}
			if (response.status !== 200) {
				popup(response.error || response.message);
			}
		});
}

function popup(message) {
	var x = document.getElementById("popupmessage");
	x.textContent = message;

	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 3000);
}

async function allSubscribers() {
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
			res.data.subscribers.forEach((item) => {
				const tBody = document.getElementById("t-body");
				let email = document.createElement("td");
				let name = document.createElement("td");
				let row = document.createElement("tr");

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
