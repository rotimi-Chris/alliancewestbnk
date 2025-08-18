document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log("Data being sent:", JSON.stringify(data, null, 2));

    try {
      const response = await fetch(
        "https://bank-api-vqsk.onrender.com/account/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let resultText = await response.text();
      console.log("Raw server r esponse:", resultText);

      let result;
      try {
        result = JSON.parse(resultText);
      } catch(error) {
          result = { message: "Response is not valid JSON", raw: resultText };
          console.log("Failed to parse JSON:", error);
      }

      if (!response.ok) {
        console.error("Server responded with error status:", response.status);
        alert(`Error ${response.status}: ${result.message || "Unknown error"}`);
        return;
      }

      console.log("Parsed JSON:", result);
      alert(`Success: ${result.message || "Account created successfully!"}`);
    } catch (error) {
      console.error("Network/Fetch error:", error);
      alert("Failed to connect to server. See console for details.");
    }
  });
