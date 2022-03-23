let url = "https://johhny-brand-staging.herokuapp.com/api";
window.addEventListener("load", function () {
	if (!localStorage.getItem("token")) {
		window.location.href = "./login.html";
	}
});

viewProfile();

const CLOUDINARY_CLOUD_NAME = "dhrfudotz";
const CLOUDINARY_UPLOAD_PRESET = "my-brand";

function popup(message) {
	var x = document.getElementById("popupmessage");
	x.textContent = message;

	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 3000);
}

var myWidget = cloudinary.createUploadWidget(
	{
		cloudName: CLOUDINARY_CLOUD_NAME,
		uploadPreset: CLOUDINARY_UPLOAD_PRESET,
	},
	(error, result) => {
		if (!error && result && result.event === "success") {
			console.log("Done! Here is the image info: ", result.info.url);
			document
				.getElementById("profile-image")
				.setAttribute("src", result.info.url);
			document
				.getElementById("sidebar-profile-image")
				.setAttribute("src", result.info.url);
		}
	}
);

document.getElementById("upload_widget").addEventListener(
	"click",
	function () {
		myWidget.open();
	},
	false
);

async function updateProfile() {
	let url = "https://johhny-brand-staging.herokuapp.com/api";
	const profilePicture = document
		.getElementById("profile-image")
		.getAttribute("src");
	const name = document.forms["user-desc"]["name"].value;
	const profession = document.forms["user-desc"]["profession"].value;
	const skills = document.forms["user-desc"]["skills"].value;
	const experience = document.forms["user-desc"]["experience"].value;
	const physicalAddress = document.forms["user-desc"]["physicalAddress"].value;

	await fetch(url + "/auth/profile", {
		method: "PUT",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			token: localStorage.getItem("token"),
		},
		body: JSON.stringify({
			name,
			profession,
			skills,
			experience,
			physicalAddress,
			profilePicture,
		}),
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 200) {
				error = response.error || response.message;
				document.getElementById("error").innerHTML = error;
			}
			if (response.status == 200) {
				document.getElementById("error").innerHTML = "";
				popup(response.message);
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

async function viewProfile() {
	let url = "https://johhny-brand-staging.herokuapp.com/api";
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
				let {
					name,
					email,
					skills,
					profession,
					physicalAddress,
					experience,
					profilePicture = "/images/user.png",
				} = response.data.users;
				document
					.getElementById("sidebar-profile-image")
					.setAttribute("src", profilePicture);
				document
					.getElementById("profile-image")
					.setAttribute("src", profilePicture);
				document.forms["user-desc"]["name"].value = name || "";
				document.forms["user-desc"]["email"].value = email || "";
				document.forms["user-desc"]["experience"].value = experience || "";
				document.forms["user-desc"]["skills"].value = skills || "";
				document.forms["user-desc"]["profession"].value = profession || "";
				document.forms["user-desc"]["physicalAddress"].value =
					physicalAddress || "";
			}
		})
		.catch((err) => {
			console.log(err);
		});
}
