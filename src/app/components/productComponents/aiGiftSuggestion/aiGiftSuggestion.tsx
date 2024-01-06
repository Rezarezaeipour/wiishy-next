import { getGiftIdea } from "@/app/api-client/gifts";

async function AIGiftIdea(props:{genderid:number,age:number}) {

    const GiftSuggestion = await getGiftIdea(props.genderid,props.age);
    console.log(GiftSuggestion);
    return (
        "hi"
     );
}

export default AIGiftIdea;

