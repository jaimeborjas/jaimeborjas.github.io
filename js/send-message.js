function enterKey(event) {
	event.preventDefault();
	document.getElementById("message").addEventListener("keyup", (event) => {
		if (event.key === "Enter") {
			document.getElementById("sendmsg").click();
		}
	});
}

function sendMessage() {
	var message = document.getElementById("message").value;
	if (!/^\s*$/.test(message)) {
		var messageDiv = document.createElement("div");
		messageDiv.className = "chat-message pointer-hover";
		messageDiv.innerHTML = "<img class='profile-image' src='img/jpg/yaser.jpg' alt=''><span><p class='message-name'>Me</p><p class='message-content'>" + message + "</p></span>";
		document.getElementById("chat-container").appendChild(messageDiv);
		document.getElementById("message").value = "";
	}
}
