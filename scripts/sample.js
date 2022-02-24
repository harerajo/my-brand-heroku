const userlist = document.querySelector("#table-contents");

function renderMessage(doc) {
	let li = document.createElement("li");
	// let createdAt = document.createElement("span");
	let names = document.createElement("td");
	let message = document.createElement("td");
	// let  = document.createElement("td");
	li.setAttribute("data-id", doc.id);
	// email.textContent = doc.data().email;
    	names.textContent = doc.data().names;
	message.textContent = doc.data().message;


	li.appendChild(names);
	// li.appendChild(email);
	li.appendChild(message);

	userlist.appendChild(li);
}
db.collection("queries")
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			// renderMessage(doc);
            html =
							"<tr data-id=" +
							doc.id +
							"><td>" +
							doc.data().names +
							"</td><td>" +
							doc.data().message +
							"</td><td><a href='#'><div class='popup'onclick='myFunction()'><i class='fa fa-pencil'><span class='popuptext' id='myPopup'></span></div></a></td> <td><a href='#'><i class='fa fa-trash'></i></a></td></tr>";
						document.getElementById("t-body").innerHTML += html;

		});
	});
