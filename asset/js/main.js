const API_KEY = "AIzaSyBddohpGCC54fET4FKs4PueGpW_kEOsnjA"; 
const MODEL = "gemini-2.5-flash"; 

async function kirimPesan() {
  const pesanUser = document.querySelector(".form-control").value.trim();

  if (!pesanUser.length) {
    alert("Tolong masukkan pesan sebelum mengirim.");
    return;
  }

  document.querySelector(".chat-container").innerHTML += `
    <div class="chat-bubble user">${pesanUser}</div>
  `;
  document.querySelector(".form-control").value = "";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: pesanUser }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const botReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya tidak bisa memproses permintaan Anda.";

    document.querySelector(".chat-container").innerHTML += `
      <div class="chat-bubble bot">${botReply}</div>
    `;
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".chat-container").innerHTML += `
      <div class="chat-bubble bot">Terjadi kesalahan saat menghubungi server.</div>
    `;
  }
}

document
  .querySelector(".container-layout .container-input .input-group-text")
  .addEventListener("click", () => kirimPesan());

document
  .querySelector(".form-control")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      kirimPesan();
    }
  });
