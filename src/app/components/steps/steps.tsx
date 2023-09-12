import { Image } from "antd-mobile";

function Steps(prop: [Number]) {

    let H = "";
    let P = "";
    switch (prop.step) {
        case 1: {
            H = "Something Special?";
            P = "Are you thinking about";
            break
        }
        case 2: {
            H = "Boring Gifts?";
            P = "Tired of";
            break
        }
        case 3: {
            H = "Gift Ideas?";
            P = "Are you looking for";
            break
        }
        case 4: {
            H = "Your wishlist";
            P = "Let's other know";
            break
        }
        case 5: {
            H = "Get your desire gift";
            P = "Create your wishlist";
            break
        }

    }

    return (
        <>
            <div className="text-center flex flex-col items-center justify-center">
                <Image alt="step1" src={`/${prop.step}.png`}></Image>
                <h2 className="font-normal text-2xl">{P}</h2>
                <h1 className="font-extrabold text-[2rem]">{H}</h1> 
               
            </div>
        </>
    );
}

export default Steps;