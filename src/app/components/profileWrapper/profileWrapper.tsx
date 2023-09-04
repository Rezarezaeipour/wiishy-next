import { Button, Image } from "antd-mobile";
import { LocationFill } from "antd-mobile-icons";

function ProfileWrapper() {
    return (
        <>
            <div className="flex flex-col items-center pt-5">
                <Image alt="reza rezaeipour" src="/Reza1.jpg" className="rounded-full w-1/3 " />
                <h1 className="font-bold text-xl mt-3">Reza Rezaeipour</h1>
                <h2 className="mt-1">(He/Him)</h2>
                <div className="flex flex-row mt-1">
                    <LocationFill className="mt-0.5 mr-1" />
                    <p>Berlin, Germany</p>
                </div>
                <div className="flex flex-row gap-4 mt-2 mb-2">
                    <div className="flex flex-col items-center align-middle">
                        <p className="font-bold">234</p>
                        <p>following</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-bold">234</p>
                        <p>followers</p>
                    </div>
                </div>

                <p className="px-4 py-1">
                    A passionate web developer and designer,
                    looking for new opportunities in European
                    country. Has a proven skills in web technologies
                    and libraries like HTML, CSS, JavaScript, JQuery,
                    React.js, Next.js and TypeScript.
                </p>
                <div className="flex flex-row gap-2 mt-2.5">
                    <Button color='default' fill='outline' size="mini">
                        Follow
                    </Button>
                    <Button color='default' fill='outline' size="mini">
                        +
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ProfileWrapper;