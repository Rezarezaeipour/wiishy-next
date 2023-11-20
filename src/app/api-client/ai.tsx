export  async function chatting() {

  try {
    const prompt = "what is the name of the biggest planet is solar system?";
    const response = await fetch("/api/gptengine", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    console.log(error)
  }

}
