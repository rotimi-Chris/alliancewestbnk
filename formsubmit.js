document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const password = document.querySelector('input[name="password"]').value;
    const repeatPassword = document.querySelector(
      'input[name="repeat_password"]'
    ).value;

    // ✅ Check if passwords match
    if (password !== repeatPassword) {
      alert("❌ Passwords do not match. Please try again.");
      return;
    }

    const formData = new FormData(this);
    console.log("Data being sent:", [...formData.entries()]);

    try {
      const response = await fetch(
        "https://bank-api-vqsk.onrender.com/account/create/",
        { method: "POST", body: formData }
      );

      let resultText = await response.text();
      console.log("Raw server response:", resultText);

      let result;
      try {
        result = JSON.parse(resultText);
      } catch (error) {
        result = { message: "Response is not valid JSON", raw: resultText };
      }

      if (!response.ok) {
        alert(`Error ${response.status}: ${result.message || "Unknown error"}`);
        return;
      }

      const accountNumber = result?.account?.account_number || "Unknown";
      document.getElementById(
        "accountInfo"
      ).innerText = `Your Account Number: ${accountNumber}\nPlease save it for login and future reference.`;

      // ✅ Show modal (no auto-redirect)
      document.getElementById("successModal").style.display = "flex";

      // ✅ Redirect only when button is clicked
      document.getElementById("goToLogin").onclick = () => {
        window.location.href = "./login.html";
      };
    } catch (error) {
      console.error("Network/Fetch error:", error);
      alert("Failed to connect to server. See console for details.");
    }
  });
