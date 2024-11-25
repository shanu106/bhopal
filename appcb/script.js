document.getElementById("send-button").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return; // Ignore empty input

    // Display user message
    const chatBox = document.getElementById("chat-box");
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    document.getElementById("user-input").value = "";

    // Send the query to the chatbot API
    fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Display bot response
            const botMessage = document.createElement("div");
            botMessage.className = "message bot-message";
            botMessage.textContent = data.response;
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch((error) => {
            console.error("Error:", error);
            const errorMessage = document.createElement("div");
            errorMessage.className = "message bot-message";
            errorMessage.textContent = "Sorry, something went wrong. Please try again.";
            chatBox.appendChild(errorMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        });
});
