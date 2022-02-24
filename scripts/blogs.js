db.collection("queries")
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			renderUsers(doc);
		});
	});

