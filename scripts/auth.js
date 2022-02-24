/*
 @role register user
*/
function addUser(e) {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const name = document.getElementById("name").value;
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			// alert("User created successfully")
			saveUserProfile({ name, email });
			// window.location.href = "./index.html";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert("Error: " + errorMessage);
		});
}
/*
 @role register user
*/
function loginUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	console.log(email, password);
	auth
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			localStorage.setItem("user", JSON.stringify(user));
			window.location.href = "./dashboard.html";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error?.message;
			alert(errorMessage || "An error occurred");
		});
}

/*
 @role save user profile
*/
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
			window.location.href = "./dashboard.html";
		})
		.catch((error) => {
			alert(error?.message || "An error occurred");
		});
}

/*
 @role get profile
*/
