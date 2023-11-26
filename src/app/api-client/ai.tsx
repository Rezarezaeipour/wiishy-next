import { prompt } from "antd-mobile/es/components/picker/prompt";

export async function chatting(promp: string) {
  try {
    const prompt = [promp];
    const response = await fetch("/api/gptengine", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    // console.log(data);
    return data;
    
  } catch (error) {
     console.error(error);
    // console.log(error);
  }
}
