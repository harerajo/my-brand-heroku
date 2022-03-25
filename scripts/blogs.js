window.addEventListener("load", function () {
	if (!localStorage.getItem("token")) {
		window.location.href = "./login.html";
	}
});

async function viewAllArticles() {
	let url = "https://johhny-brand-staging.herokuapp.com/api";

	let token = localStorage.getItem("token");
	await fetch(url + "/articles", {
		method: "GET",
		headers: {
			"Content-ype": "application/json; charset=UTF-8",
			token,
		},
	})
		.then((response) => response.json())
		.then((res) => {
			res.data?.articles.forEach((item) => {
				const tBody = document.getElementById("t-body");
				let title = document.createElement("td");
				let author = document.createElement("td");
				let content = document.createElement("td");
				let comments = document.createElement("td");
				let actions = document.createElement("td");
				let row = document.createElement("tr");

				let editBtn = document.createElement("span");
				let deleteBtn = document.createElement("span");

				let rowContent = document.createElement("p");
				rowContent.setAttribute("class", "row-content");

				row.setAttribute("class", "collapsible");
				row.setAttribute("id", item._id);
				title.setAttribute("class", "title");
				author.setAttribute("class", "author");
				content.setAttribute("class", "content");
				comments.setAttribute("class", "comments");
				editBtn.setAttribute("class", "edit-btn");
				deleteBtn.setAttribute("class", "delete-btn");
				actions.setAttribute("class", "actions");

				row.setAttribute("onclick", "setArticleId(this)");
				deleteBtn.setAttribute("onclick", "deleteArticle(this)");

				let titlevalue = document.createTextNode(item.title);
				let authorvalue = document.createTextNode(item.author);
				let commentstvalue = document.createTextNode(
					item.comments.length + " comments"
				);
				content.innerHTML =
					"<div class='article-content'>" + item.content + "</div";
				editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
				deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

				title.appendChild(titlevalue);
				author.appendChild(authorvalue);
				comments.appendChild(commentstvalue);

				actions.appendChild(editBtn);
				actions.appendChild(deleteBtn);

				row.appendChild(title);
				row.appendChild(author);
				row.appendChild(content);
				row.appendChild(comments);
				row.appendChild(actions);

				tBody.appendChild(row);
			});
		});
}

async function deleteArticle(article) {
	let id = article.parentNode.parentNode.id;
	let url = "https://johhny-brand-staging.herokuapp.com/api";
	let tbody = document.getElementById("t-body");

	let token = localStorage.getItem("token");
	await fetch(url + "/articles/" + id, {
		method: "DELETE",
		headers: {
			"Content-ype": "application/json; charset=UTF-8",
			token,
		},
	})
		.then((response) => response.json())
		.then((res) => {
			let message = res.message || res.error;
			if (res.status == 200) {
				tbody.removeChild(article.parentNode.parentNode);
			}
			popup(message);
		});
}

async function setArticleId(article) {
	let id = article.id;
	localStorage.setItem("articleId", id);
	window.location.href = "./blog.html";
}

async function viewArticle() {
	let url = "https://johhny-brand-staging.herokuapp.com/api";
	let id = localStorage.getItem("articleId");

	let token = localStorage.getItem("token");
	await fetch(url + "/articles/" + id, {
		method: "GET",
		headers: {
			"Content-ype": "application/json; charset=UTF-8",
			token,
		},
	})
		.then((response) => response.json())
		.then((res) => {
			// popup(res.message);
			if (res.status == 200) {
				document.getElementById("blog-title").innerHTML =
					res.data.article.title;
			}
		});
}

window.location.pathname == "/pages/blogs-dashboard.html" && viewAllArticles();

window.location.pathname == "/pages/blog.html" && viewArticle();
