function sendQuery() {
	const form = document.forms["contact-form"];
	const { names, email, message } = form;
	db.collection("queries")
		.doc()
		.set({
			names: names.value,
			email: email.value,
			message: message.value,
			created_at: new Date(),
		})
		.then(() => {
			alert("You successfully sent your message");
		})
		.catch((error) => {
			alert(error?.message || "An error occurred");
		});
}

