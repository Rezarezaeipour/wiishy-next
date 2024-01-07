import { getGiftIdea } from "@/app/api-client/gifts";
import {useEffect, useState} from "react";

function AIGiftIdea(props:{genderid:number,age:number}) {
    const [xx,setxx] = useState('');
    useEffect(() => {
        (async () => {
            const GiftSuggestion = await getGiftIdea(props.genderid,props.age);
            console.log(GiftSuggestion);
            setxx(GiftSuggestion);
        })()
    }, []);

    return (
        "hi"+{xx}
     );
}

export default AIGiftIdea;

