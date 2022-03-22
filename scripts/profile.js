let url = "http://localhost:4000/api";

viewProfile();

function debounce(func, wait = 100) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, wait);
	};
}

function sayHi(event) {
	console.log("Hi!", this, event.type);
}

// Start
const debounced = debounce(sayHi, 500);
window.addEventListener("resize", debounced);

async function updateProfile() {
	const name = document.getElementById("name");
	const profession = document.getElementById('profession')
	const skills = document.getElementById('skills');
	const experience = document.getElementById('experience');
	const physicalAddress = document.getElementById('physicalAddress');

	const {name} = document.forms['user-desc'].elements;
console.log(name)

	await fetch(url + "/auth/profile", {
		method: "PUT",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			token: localStorage.getItem("token"),
		},
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 200) {
				error = response.error || response.message;
				document.getElementById("error").innerHTML = error;
			}
			if (response.status == 200) {
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

async function viewProfile() {

	await fetch(url + "/auth/profile", {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			token: localStorage.getItem("token"),
		},
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 200) {
				error = response.error || response.message;
				document.getElementById("error").innerHTML = error;
			}
			if (response.status == 200) {
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

async function allArticles() {
	let token = localStorage.getItem("token");
	await fetch(url + "/articles", {
		method: "GET",
		headers: {
			"Content-ype": "application/json; charset=UTF-8",
			token: token,
		},
	})
		.then((response) => response.json())
		.then((res) => {
			popup(res.message);
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
