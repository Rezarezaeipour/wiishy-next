import { getGiftIdea } from "@/app/api-client/gifts";
import {useEffect, useState} from "react";

function AIGiftIdea(props:{genderid:number,age:number}) {
    const [xx,setxx] = useState('');
    useEffect(() => {
        (async () => {
            const GiftSuggestion = await getGiftIdea(props.genderid,props.age);
            alert(JSON.stringify(GiftSuggestion));
            console.log(JSON.stringify(GiftSuggestion));
            setxx(JSON.stringify(GiftSuggestion));
        })()
    }, []);

    return (
        "hi"+{xx}
     );
}

export default AIGiftIdea;

