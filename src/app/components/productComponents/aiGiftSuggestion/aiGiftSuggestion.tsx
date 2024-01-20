import { getGiftIdea } from "@/app/api-client/gifts";
import { useEffect, useState } from "react";

function AIGiftIdea(props: { genderid: number; age: number }) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    (async () => {
      const GiftSuggestion = await getGiftIdea(props.genderid, props.age);
      const GiftSuggestionJson = JSON.parse(GiftSuggestion);
      setResult(GiftSuggestionJson.giftIdeas);
    })();
  }, []);

  return (
    <>
      <ul>
        {result.map((item, index) => {
          return <li className="gift-suggestion-li" key={"gift" + index}> - {item}</li>;
        })}
      </ul>
    </>
  );
}

export default AIGiftIdea;
