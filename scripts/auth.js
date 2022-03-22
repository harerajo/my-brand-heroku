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
			if (response.status !== 200) {
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
function loginUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	console.log(email, password);

	let error = null;
	let url = "http://localhost:4000/api";
	await fetch(url + "/auth/login", {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ email, password }),
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 200) {
				error = response.message;
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
  

function saveUserProfile({ name, email }) {
	db.collection("users")
		.doc()
		.set({
			name,
			email,
			created_at: new Date(),
		})
		.then(() => {
			alert("You successfully created account");
			window.location.href = "./profiledash";
		})
		.catch((error) => {
			alert(error?.message || "An error occurred");
		});
}
