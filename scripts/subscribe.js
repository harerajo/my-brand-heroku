function subscribe() {
	const form = document.forms["subscribe-form"];
	const { names, email, message } = form;
	db.collection("subscribers")
		.doc()
		.set({
			email: email.value,
			created_at: new Date(),
		})
		.then(() => {
			alert("You have subscribed successfully");
		})
		.catch((error) => {
			alert(error?.message || "An error occurred");
		});
}

const userslist = document.querySelector("#subscribers-list");

function renderSubscriber(doc) {
	let li = document.createElement("li");
	// let createdAt = document.createElement("span");
	let Emails = document.createElement("td");
	// let message = document.createElement("td");
	// let  = document.createElement("td");
	li.setAttribute("data-id", doc.id);
	// email.textContent = doc.data().email;
	email.textContent = doc.data().Emails;
	// message.textContent = doc.data().message;

	li.appendChild(Emails);
	// li.appendChild(email);
	// li.appendChild(message);

	userslist.appendChild(li);
}
db.collection("subscribers")
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			// renderMessage(doc);
			html =
				"<tr data-id=" +
				doc.id +
				"><td>" +
				doc.data().email +
				"</td><td>" +
				// doc.data().message +
				"</td><td></td></tr>";
			document.getElementById("t-body").innerHTML += html;
		});
	});
