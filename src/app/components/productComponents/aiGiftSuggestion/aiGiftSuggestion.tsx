import { getGiftIdea } from "@/app/api-client/gifts";
import { SpinLoading } from "antd-mobile";
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
      {result.length > 0 ? (
        <ul>
          {result.map((item, index) => {
            return (
              <li className="gift-suggestion-li" key={"gift" + index}>
                {" "}
                {item}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="w-full h-full flex flex-row align-middle justify-center">
          <div className="text-center">
            <SpinLoading className="mx-auto mb-2" color="black" style={{ "--size": "24px" }} />
            <p>AI engine is looking for ideas</p>
          </div>
        </div>
      )}
    </>
  );
}

export default AIGiftIdea;
