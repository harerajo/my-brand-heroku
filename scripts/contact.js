async function sendQuery() {
	const name = document.getElementById("sender-name").value;
	const email = document.getElementById("sender-email").value;
	const query = document.getElementById("sender-message").value;


	let url = "http://locahost:4000";
	await fetch(url + "/queries", {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ name, email, query }),
	})

		.then((res) => res.json())
			.then((response) => {
			if (response.status !== 200) {

			}
			console.log(response);
		})
		
	}

	async function viewAllQueries() {


		let url = "https://johhny-brand-staging.herokuapp.com/api";
		await fetch(url + "/queries", {
			method: "GET",
			headers: { "Content-type": "application/json; charset=UTF-8" },

		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status !== 200) {
				}
				console.log(response);
			});
	}



