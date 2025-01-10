
async function generateContent(
  apiKey: string,
): Promise<{ status: boolean; message: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const payload = {
    contents: [
      {
        parts: [{ text: "Explain how AI works" }],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // You can add more handling of the response if needed
      return { status: true, message: "Api Key working" };
    } else {
      console.error(`Error: ${response.statusText}`);
      return { status: false, message: "Api Key not working" };
      // throw new Error("Api Verification Failed");
    }
  } catch (error) {
    console.error("Request failed:", error);
    return { status: true, message: "Network Error" };
    // throw new Error("Api Verification Failed");
  }
}

export default generateContent;
