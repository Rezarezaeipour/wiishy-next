import { getGiftIdea } from "@/app/api-client/gifts";
import {useEffect} from "react";

function AIGiftIdea(props:{genderid:number,age:number}) {
   
    useEffect(() => {
        (async () => {
            const GiftSuggestion = await getGiftIdea(props.genderid,props.age);
            console.log(GiftSuggestion)
        })()
    }, []);

    return (
        "hi"
     );
}

export default AIGiftIdea;

