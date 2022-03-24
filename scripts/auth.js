function popup(message) {
	var x = document.getElementById("popupmessage");
	x.textContent = message;

	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 3000);
}

async function addUser(e) {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const name = document.getElementById("name").value;
	const role = document.getElementById("role").value;

	let error = null;
	let url = "https://johhny-brand-staging.herokuapp.com/api";
	await fetch(url + "/auth/signup", {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ email, name, password, role }),
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 200 && response.status !== 201) {
				error = response.error || response.message;
				document.getElementById("error").innerHTML = error;
			}
			if (response.status == 201) {
				popup(response.message);
				window.location.href = "./login.html";
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

async function loginUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	let error = null;
	let url = "https://johhny-brand-staging.herokuapp.com/api";
	await fetch(url + "/auth/login", {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ email, password }),
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 200) {
				error = response.error || response.message;
				document.getElementById("error").innerHTML = error;
			}
			if (response.status == 200) {
				error = response.error;
				localStorage.setItem("token", response.data.token);
				window.location.href = "./profiledash.html";
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

async function logout() {
	localStorage.removeItem("token");
	window.location.href = "./login.html";
}

function decodeToken() {
	let token = localStorage.getItem("token");
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
}
