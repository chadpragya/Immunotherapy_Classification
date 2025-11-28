const chat = document.getElementById("chat");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const messageBox = document.getElementById("messageBox");
const sendBtn = document.getElementById("sendBtn");

let sessionId = null;

// sanitize text
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
}

function addBubble(text, who) {
    const div = document.createElement("div");
    div.className = "bubble " + who;
    div.innerHTML = `
    ${escapeHtml(text)}
    <div class="timestamp">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
  `;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// File Upload
uploadBtn.onclick = () => fileInput.click();

fileInput.onchange = async () => {
    const f = fileInput.files[0];
    if (!f) return;

    addBubble("Uploading " + f.name + "...", "user");

    const fd = new FormData();
    fd.append("file", f);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: fd
    });

    const j = await res.json();
    if (!j.success) {
        addBubble("Upload failed: " + j.error, "agent");
        return;
    }

    sessionId = j.session_id;
    addBubble(j.analysis || "Analysis complete.", "agent");
};

// Chat
sendBtn.onclick = sendMessage;
messageBox.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

async function sendMessage() {
    const text = messageBox.value.trim();
    if (!text) return;

    if (!sessionId) {
        addBubble("Please upload a file first.", "agent");
        return;
    }

    addBubble(text, "user");
    messageBox.value = "";

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: text })
    });

    const j = await res.json();
    if (j.error) {
        addBubble("Error: " + j.error, "agent");
        return;
    }

    addBubble(j.reply || "No reply.", "agent");
}