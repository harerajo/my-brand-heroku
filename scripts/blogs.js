async function viewAllArticles() {


	let url = "https://johhny-brand-staging.herokuapp.com/api";
	await fetch(url + "/articles", {
		method: "GET",
		headers: { "Content-type": "application/json; charset=UTF-8" },
     toke
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.status !== 200) {
			}
			console.log(response);
		});
}
